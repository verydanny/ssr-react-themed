import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import Slider from 'react-image-gallery'
import { forceCheck } from 'react-lazyload'
import { PAGE_SIZE, PIN_LIMIT } from 'app/graphql/small/queries'
import { Icon } from 'ui/shared/components/Icon'
import chevronUpDrawer from 'ui/shared/components/Icon/svgs/chevronUpDrawer.svg'
import SortFilter from 'ui/small/components/SortFilter/SortFilter'
import findObj from 'lodash/find'
import pick from 'lodash/fp/pick'
import pipe from 'lodash/fp/pipe'
import compact from 'lodash/compact'
import {
  LEAD_MODAL_ID,
  LEAD_MODAL_PROPS,
} from 'ui/small/components/LeadModal/const'
import { ALTERNATE_SPINNER } from 'app/store/types'
import EmptyListingCard from './EmptyListingCard'
import PaginateResultsCard from './PaginateResultsCard'
import Cards from './Cards'
import withFilterCards from './withFilterCards'
import withAds from './withAds'
import PaginateResultsButton from './PaginateResultsButton'
import { InlinePriceFilterCard, InlineBedroomFilterCard, InlineBathroomFilterCard } from './FilterCards'

@themed('*')
export default class Listings extends Component {

  static propTypes = {
    loadedAds: PropTypes.array,
    listings: PropTypes.array,
    viewType: PropTypes.string,
    gotoNextPage: PropTypes.func,
    gotoPreviousPage: PropTypes.func,
    theme: PropTypes.object,
    selectListing: PropTypes.func.isRequired,
    selectedListingId: PropTypes.string,
    listHubId: PropTypes.string,
    total: PropTypes.number,
    pageNumber: PropTypes.number,
    toggleView: PropTypes.func,
    loading: PropTypes.bool,
    loadingOptions: PropTypes.object,
    drawerHidden: PropTypes.bool,
    handleCardDrawer: PropTypes.func,
    pushState: PropTypes.func,
    previousPageLink: PropTypes.string,
    nextPageLink: PropTypes.string,
    openModal: PropTypes.func,
    refinementCriteria: PropTypes.object,
    renderAd: PropTypes.func,
    locationSlug: PropTypes.string,
    searchType: PropTypes.string,
    propertyType: PropTypes.string,
    query: PropTypes.object,
    favorites: PropTypes.object,
    toggleFavorite: PropTypes.func,
    isReactPDP: PropTypes.bool,
    addViewToCriteria: PropTypes.func,
    criteria: PropTypes.object,
    isPriceFilterActive: PropTypes.bool,
    isBedroomFilterActive: PropTypes.bool,
    isBathroomFilterActive: PropTypes.bool,
    isInlineFilterCardsEnabled: PropTypes.bool,
  }

  static defaultProps = {
    listings: [],
    theme: {},
    drawerHidden: true,
    handleCardDrawer: () => {},
    refinementCriteria: {},
    favorites: {},
    isInlineFilterCardsEnabled: true,
  }

  componentDidMount() {
    const { listings, selectedListingId } = this.props

    if (window.localStorage && this.props.viewType === 'map') {
      const listingId = window.localStorage.getItem('uriListingId')

      if (listingId) {
        window.localStorage.setItem('uriListingId', '')
        this.props.selectListing(listingId)
        return
      }
    }

    if (!selectedListingId) {
      this.selectFirstListing(listings)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listings, selectedListingId } = nextProps

    if (!selectedListingId) {
      this.selectFirstListing(listings)
    }

    // If user starts in ocean and drags to LA
    if (selectedListingId) {
      const foundListing = findObj(listings, listing => listing.listingId === selectedListingId)

      if (foundListing) {
        this.slideToIndex(this.selectedListingIndex(listings, selectedListingId))
      }
    }
  }

  @autobind
  onPrevCardClick() {
    if (this.gallery && this.gallery.getCurrentIndex() !== 0) {
      this.slideToIndex(0)
    }
  }

  @autobind
  onNextCardClick() {
    if (this.gallery) {
      const nextCardsIndex = this.props.listings.length + this.startIndex

      if (this.gallery.getCurrentIndex() !== nextCardsIndex) {
        this.slideToIndex(nextCardsIndex)
      }
    }
  }

  get isMap() {
    return this.props.viewType === 'map'
  }

  get isList() {
    return this.props.viewType === 'list'
  }

  get offset() {
    return this.props.pageNumber > 1 ? 1 : 0
  }

  get paginationComponent() {
    return this.isMap ? PaginateResultsCard : PaginateResultsButton
  }

  get prevCard() {
    const {
      previousPageLink,
    } = this.props

    const PrevComponent = this.paginationComponent
    const listingCountOnPrevPage = PAGE_SIZE

    return (
      <div
        key={0}
        onClick={this.onPrevCardClick} role="presentation"
      >
        <PrevComponent
          link={previousPageLink}
          count={listingCountOnPrevPage}
          data-tag_item="previous"
        />
      </div>
    )
  }

  get nextCard() {
    const {
      listings,
      nextPageLink,
    } = this.props

    const listingCountOnNextPage = this.remainingListings < PAGE_SIZE
      ? this.remainingListings : PAGE_SIZE
    const key = listings.length + 1
    const NextComponent = this.paginationComponent

    return (
      <div
        key={key}
        role="presentation"
      >
        <NextComponent
          link={nextPageLink}
          more
          count={listingCountOnNextPage}
          data-tag_item="load_more_button"
          onClick={this.onNextCardClick}
        />
      </div>
    )
  }

  get sliderSettings() {
    return {
      className: 'center',
      centerMode: true,
      infinite: false,
      centerPadding: '1%',
      speed: 500,
      slidesToShow: 1,
      swipeToSlide: true,
      initialSlide: this.offset,
      arrows: false,
      swipe: true,
      draggable: false,
      variableWidth: true, // variableWidth setting required for fix width slides
      focusOnSelect: true,
    }
  }

  get startIndex() {
    return this.props.pageNumber > 1 ? 1 : 0
  }

  get remainingListings() {
    const { total, pageNumber } = this.props
    return total - (pageNumber * PAGE_SIZE)
  }

  get priceFilterCard() {
    if (this.props.isPriceFilterActive) return null
    return (
      <InlinePriceFilterCard
        key="price-filter-card"
      />
    )
  }

  get bathroomFilterCard() {
    if (this.props.isBathroomFilterActive) return null
    return (
      <InlineBathroomFilterCard
        key="bathroom-filter-card"
      />
    )
  }

  get bedroomFilterCard() {
    if (this.props.isBedroomFilterActive) return null
    return (
      <InlineBedroomFilterCard
        key="bedroom-filter-card"
      />
    )
  }

  get filterCards() {
    return compact([this.priceFilterCard, this.bedroomFilterCard, this.bathroomFilterCard])
  }

  get showInlineFilterCards() {
    const { pageNumber, isInlineFilterCardsEnabled } = this.props
    return pageNumber === 1 && isInlineFilterCardsEnabled
  }

  @autobind
  setNextPageUrl() {
    const { nextPageLink, pushState } = this.props

    pushState(nextPageLink)
  }

  @autobind
  selectedListingIndex(listings, selectedListingId) {
    if (!selectedListingId) return this.startIndex

    const index = listings.findIndex(listing => listing.listingId === selectedListingId)

    if (index < 0) return this.startIndex
    return index + this.startIndex
  }

  @autobind
  selectFirstListing(listings) {
    const allowSelect = this.props.selectListing &&
      listings &&
      listings.length

    if (allowSelect) {
      const id = listings[0].listingId
      this.props.selectListing(id)
    }
  }

  @autobind
  handleCardDrawerClick() {
    this.props.handleCardDrawer(!this.props.drawerHidden)
  }

  @autobind
  slideToIndex(index) {
    if (this.gallery) this.gallery.slideToIndex(index)
  }

  @autobind
  slideTagging(newIndex) {
    const priorIndex = this.selectedListingIndex(this.props.listings, this.props.selectedListingId)

    // TODO: workaround for card-tap-slide
    if (priorIndex === newIndex) return null

    return {
      page: 'srp_map',
      item: priorIndex < newIndex ? 'next' : 'previous',
    }
  }

  @autobind
  selectListingFromGallery(index) {
    const { listings, selectListing, gotoNextPage, gotoPreviousPage } = this.props
    const listingsStartIndex = this.startIndex
    const nextCardsIndex = listings.length + listingsStartIndex
    const eventTagging = this.slideTagging(index)

    if (eventTagging && window.eventTracker) {
      window.eventTracker.track('swipe', eventTagging)
    }

    if (index < listingsStartIndex) {
      gotoPreviousPage()
    } else if (index === nextCardsIndex) {
      if (!this.isMap || (this.props.pageNumber * PAGE_SIZE < PIN_LIMIT)) {
        gotoNextPage()
      }
    } else if (listings && listings.length) {
      const listing = listings[index - listingsStartIndex]

      if (listing) selectListing(listing.listingId)
    }
    forceCheck()
  }

  @autobind
  addPaginationCards(cards) {
    const prepend = this.props.pageNumber > 1 ? [this.prevCard] : []

    const allowAddNextCard = this.remainingListings > 0 &&
                             (!this.isMap || (this.props.pageNumber * PAGE_SIZE < PIN_LIMIT))

    const append = allowAddNextCard ? [this.nextCard] : []

    return prepend.concat(cards, append)
  }

  @autobind
  showLeadModal(listing) {
    const { openModal } = this.props
    const listingProps = pick(LEAD_MODAL_PROPS)(listing)

    if (openModal) openModal(LEAD_MODAL_ID, listingProps)
  }

  @autobind
  renderCards() {
    const {
      listings,
      favorites,
      toggleFavorite,
      loadedAds,
      renderAd,
      theme,
      selectListing,
      selectedListingId,
      listHubId,
      viewType,
      pushState,
      isReactPDP,
      addViewToCriteria,
      criteria,
    } = this.props

    const isListView = this.isList

    // Create an array of cards
    const cards = Cards({
      loadedAds,
      listings,
      favorites,
      toggleFavorite,
      onEmailClick: this.showLeadModal,
      selectListing,
      selectedListingId,
      listHubId,
      theme,
      viewType,
      isListView,
      pushState,
      isReactPDP,
      addViewToCriteria,
      criteria,
    })

    const shouldShowAds = this.isList
    const enhanceListings = pipe(
      withFilterCards(this.showInlineFilterCards, this.filterCards),
      withAds(shouldShowAds, renderAd)
    )
    const enhancedListings = enhanceListings(cards)

    return this.addPaginationCards(enhancedListings)
  }

  renderItem(card) {
    return card
  }

  render() {
    const {
      listings,
      viewType,
      theme,
      toggleView,
      loading,
      loadingOptions,
      drawerHidden,
      selectedListingId,
      total,
      pushState,
      refinementCriteria,
      locationSlug,
      query,
      searchType,
      propertyType,
    } = this.props

    const drawerHiddenClass = drawerHidden ? '-drawerHidden' : ''
    const drawerIcon = drawerHidden ? '' : '-flip'
    const drawerTagging = drawerHidden ? 'show_all' : 'hide'
    const showEmptyCard = listings.length === 0 && !loading && viewType === 'list'

    if (showEmptyCard) {
      return (
        <div
          data-tid="listings-container"
          className={theme[`ListingsContainer-${viewType}${drawerHiddenClass}`]}
        >
          <EmptyListingCard toggleView={toggleView} viewType={viewType} />
        </div>
      )
    }

    if (this.isMap && loading && loadingOptions && loadingOptions.spinner === ALTERNATE_SPINNER) {
      const LoadingComponent = this.paginationComponent
      return (
        <div
          data-tid="listings-container"
          className={theme[`ListingsContainer-${viewType}${drawerHiddenClass}`]}
        >
          <LoadingComponent
            data-tag_item="previous"
            loading
          />
        </div>
      )
    } else if ((loading && loadingOptions && loadingOptions.spinner !== ALTERNATE_SPINNER) ||
        listings.length === 0) {
      return null
    }

    const cards = this.renderCards()

    return (
      <div
        key="listings"
        data-tid="listings-container"
        className={theme[`ListingsContainer-${viewType}${drawerHiddenClass}`]}
      >
        {this.isMap ?
          <div data-tag_section="map_listing" data-tid="map-listings">
            <Icon
              svgs={{ chevronUpDrawer }}
              data-tid="drawer-toggle-button"
              data-tag_item={drawerTagging}
              className={theme[`ListingsDrawerButton${drawerIcon}`]}
              onClick={this.handleCardDrawerClick}
            />
            <Slider
              items={cards}
              renderItem={this.renderItem}
              ref={gallery => { this.gallery = gallery }}
              onSlide={this.selectListingFromGallery}
              showNav={false}
              showThumbnails={false}
              showPlayButton={false}
              showFullscreenButton={false}
              infinite={false}
              startIndex={this.selectedListingIndex(listings, selectedListingId)}
              swipeThreshold={10}
              preventDefaultTouchmoveEvent
            />
          </div>
          : <div data-tag_section="property_listings">
            <div className={theme.PropertyListCount}>
              <span className={theme.PropertyListCount_Home} data-tid="property-count">{total} { total === 1 ? ' Property Found' : ' Properties Found' }</span>
              <div className={theme.PropertyFilter_SortBy}>
                <SortFilter
                  className={theme.PropertyFilter_RemoveDefaultStyle}
                  theme={theme}
                  pushState={pushState}
                  refinementCriteria={refinementCriteria}
                  locationSlug={locationSlug}
                  query={query}
                  searchType={searchType}
                  propertyType={propertyType}
                />
              </div>
            </div>
            {cards}
          </div>
        }
      </div>
    )
  }
}
