import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import throttle from 'lodash/throttle'
import { LIST_SKELETON, NEXT_PAGE, PREV_PAGE } from 'app/store/types'
import { forceCheck } from 'react-lazyload'
import isElementInViewport from 'lib/utils/isElementInViewport'
import Footer from 'ui/shared/components/Footer'
import Pagination from 'ui/large/components/Pagination'
import BreadCrumbs from 'ui/shared/components/BreadCrumbs'
import pick from 'lodash/fp/pick'
import {
  LEAD_MODAL_PROPS,
} from 'ui/large/components/LeadModal/const'
import {
  LEAD_MODAL_ID,
  MORE_FILTERS_MODAL_ID,
} from 'ui/shared/config/modal-const'
import autobind from 'autobind-decorator'
import Filters from 'ui/large/components/Filters'
import SeoContent from 'ui/large/components/SeoContent'
import { DfpAdSlot } from 'ui/shared/components/DfpAdSlot'
import { LARGE_SRP_FOOTER_AD_KEY } from 'config/dfpAds'

import isEqual from 'lodash/isEqual'
import Cards from './ListingCard/Cards'
import LoadingCards from './ListingCard/LoadingCards'
import ZeroResultsCard from './ListingCard/ZeroResultsCard'
import ListHeader from './ListHeader'

@themed('*')
export default class ListView extends Component {

  static propTypes = {
    theme: PropTypes.object,
    listings: PropTypes.array,
    mapZoomOutOnEmpty: PropTypes.func,
    openModal: PropTypes.func,
    total: PropTypes.number,
    selectedListingId: PropTypes.string,
    selectedListingIsClicked: PropTypes.bool,
    selectedListingShouldScroll: PropTypes.bool,
    selectListingFromMapPin: PropTypes.func,
    clearListingData: PropTypes.func,
    clearListingScroll: PropTypes.func,
    loading: PropTypes.any,
    loadingOptions: PropTypes.object,
    favorites: PropTypes.object,
    toggleFavorite: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)
    this.handleScrollEvent = throttle(this.handleScrollEvent, 250)
  }

  componentDidMount() {
    this.scrollToSelectedListingIfNeeded()
  }

  componentWillReceiveProps(props) {
    if (!isEqual(props.listings, this.props.listings) ||
      (!this.props.loading && props.loading &&
        (props.loadingOptions.source === NEXT_PAGE || props.loadingOptions.source === PREV_PAGE))
    ) {
      this.scrollToTop()
    }
  }

  componentDidUpdate() {
    this.scrollToSelectedListingIfNeeded()
  }

  scrollToSelectedListingIfNeeded() {
    const {
      clearListingScroll,
      selectedListingShouldScroll,
    } = this.props

    if (selectedListingShouldScroll && clearListingScroll) {
      this.scrollToSelectedListing()
      clearListingScroll()
    }
  }

  scrollToSelectedListing() {
    // Find the active card in the list (it will be marked with an attribute)
    const card = this.listDiv.querySelector('[data-active-card]')

    if (card && !isElementInViewport(card)) {
      card.scrollIntoView()
    }
  }

  handleScrollEvent() {
    // Scroll events on elements with overflow:auto do not bubble up;
    // therefore the lazy loader will not know when content scrolls into view.
    // To ensure that content within the list can be lazy loaded, we
    // must manually tell the lazy loader to check if content is visible,
    // whenever the user scrolls the list.
    forceCheck()
  }

  @autobind
  handleCardMouseEnter(event, listingId) {
    const { selectListingFromMapPin } = this.props

    if (selectListingFromMapPin && listingId) {
      // Select a pin on the map, override any pin that was already clicked
      selectListingFromMapPin(listingId, {
        clicked: true,
        trackClick: false,
      })
    }
  }

  @autobind
  handleCardMouseLeave() {
    const { clearListingData } = this.props

    if (clearListingData) {
      // Clear the selected pin on the map
      clearListingData()
    }
  }

  @autobind
  showLeadModal(listing) {
    const { openModal } = this.props
    const listingProps = pick(LEAD_MODAL_PROPS)(listing)

    if (openModal) openModal(LEAD_MODAL_ID, listingProps)
  }

  scrollToTop() {
    this.cardsContainer.scrollTop = 0
  }

  @autobind
  showMoreFiltersModal() {
    const { openModal } = this.props

    if (openModal) openModal(MORE_FILTERS_MODAL_ID)
  }

  renderListContent() {
    const {
      loading,
      total,
      loadingOptions,
      mapZoomOutOnEmpty,
      selectedListingId,
      selectedListingIsClicked,
      listings,
      favorites,
      toggleFavorite,
    } = this.props

    if (!loading && total === 0) {
      return (
        <ZeroResultsCard
          onClickZoomOut={mapZoomOutOnEmpty}
          onClickOpenModal={this.showMoreFiltersModal}
        />
      )
    }

    let cards

    if (loading &&
      loadingOptions &&
      loadingOptions.skeleton !== LIST_SKELETON) {
      cards = LoadingCards({ listings })
    } else {
      cards = Cards({
        listings,
        selectedListingId,
        selectedListingIsClicked,
        favorites,
        toggleFavorite,
        openModal: this.showLeadModal,
        onCardMouseEnter: this.handleCardMouseEnter,
        onCardMouseLeave: this.handleCardMouseLeave,
      })
    }
    return (
      <div>
        <ListHeader
          total={total}
          loading={loading}
          loadingOptions={loadingOptions}
        />
        <div data-tag_section="property_listings">
          {cards}
        </div>
        <Pagination />
        <SeoContent />
      </div>
    )
  }

  render() {
    const {
      theme,
    } = this.props

    return (
      <div
        className={theme.ListView}
        ref={list => { this.listDiv = list }}
        onScroll={this.handleScrollEvent}
      >
        <BreadCrumbs />
        <Filters
          onOpen={this.onOpen}
          theme={theme}
          openModal={this.showMoreFiltersModal}
        />
        <div
          className={theme.List_Content}
          data-tid="list-view"
          ref={div => { this.cardsContainer = div }}
        >
          {this.renderListContent()}
          <div className={theme.List_Footer}>
            <Footer />
            <DfpAdSlot
              adKey={LARGE_SRP_FOOTER_AD_KEY}
              tid="srp-footer-ad"
            />
          </div>
        </div>
      </div>
    )
  }
}
