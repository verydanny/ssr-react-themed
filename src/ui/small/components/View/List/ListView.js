import React, { PureComponent } from 'react'
import BreadCrumbs from 'ui/shared/components/BreadCrumbs'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import throttle from 'lodash/throttle'
import { forceCheck } from 'react-lazyload'
import { SMALL_LIST_VIEW_AD_KEY } from 'config/dfpAds'
import Footer from 'ui/shared/components/Footer'
import { Listings, AD_POSITION } from 'ui/small/components/ListingCard'
import SeoContent from 'ui/small/components/SeoContent'

@themed('List', { pure: true })

export default class ListView extends PureComponent {
  static propTypes = {
    loadedAds: PropTypes.array,
    title: PropTypes.string,
    city: PropTypes.string,
    count: PropTypes.number,
    currentView: PropTypes.string,
    hidden: PropTypes.bool,
    listings: PropTypes.array,
    loading: PropTypes.bool,
    loadingOptions: PropTypes.object,
    nextPageLink: PropTypes.string,
    openModal: PropTypes.func,
    pageNumber: PropTypes.number,
    pathname: PropTypes.string,
    previousPageLink: PropTypes.string,
    pushState: PropTypes.func,
    query: PropTypes.object,
    selectedListingId: PropTypes.string,
    selectListing: PropTypes.func,
    toggleView: PropTypes.func,
    total: PropTypes.number,
    locationSlug: PropTypes.string,
    searchType: PropTypes.string,
    propertyType: PropTypes.string,
    refinementCriteria: PropTypes.object,
    renderAd: PropTypes.func,
    theme: PropTypes.object,
    uri: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
  }

  componentDidMount() {
    this.lazyCheck()

    const { selectedListingId } = this.props

    if (selectedListingId) this.scrollToListing(selectedListingId, true)

    // Ensure lazyCheck doesn't get called too often
    this.lazyCheck = throttle(this.lazyCheck, 500, { leading: false })

    // Call lazyCheck whenever the list is scrolled, so the lazy loader
    // can determine if any new cards are visible and load images
    this.listContainerElement.addEventListener('scroll', this.lazyCheck, true)
  }

  componentDidUpdate(prevProps) {
    const {
      selectedListingId,
      currentView,
      uri,
    } = this.props

    if (currentView === 'list') {
      this.lazyCheck()

      const switchFromMapToList = selectedListingId && prevProps.currentView === 'map'

      if (switchFromMapToList) {
        this.scrollToListing(selectedListingId)
      } else if (prevProps.uri !== uri) {
        this.listContainerElement.scrollTop = 0
      }
      if (typeof window !== 'undefined' && window.localStorage) {
        const listingId = window.localStorage.getItem('uriListingId')

        if (listingId) {
          window.localStorage.setItem('uriListingId', '')
          this.props.selectListing(listingId)
          this.scrollToListing(listingId)
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.listContainerElement) {
      this.listContainerElement.removeEventListener('scroll', this.lazyCheck, true)
    }
  }

  @autobind
  lazyCheck() {
    forceCheck()
    this.selectListingClosestToTop()
  }

  scrollToListing(listingId, scrollImmediately) {
    const id = `list-${listingId}`
    const node = document.getElementById(id)
    const nodeSort = document.getElementById('sortDropDown')
    const allowScroll = this.lastScrolledId !== id

    if (!node) {
      // reset scroll to top if property card no longer exists
      if (this.listContainerElement) this.listContainerElement.scrollTop = 0
      return
    }

    if (allowScroll) {
      if (scrollImmediately && nodeSort) {
        nodeSort.scrollIntoView()
        this.lastScrolledId = id
      } else {
        setTimeout(() => {
          node.scrollIntoView()
          this.lastScrolledId = id
          if (this.listContainerElement) this.listContainerElement.scrollTop -= 100
        }, 100)
      }
    }
  }

  selectListingClosestToTop() {
    const {
      currentView,
      listings,
      selectListing,
      selectedListingId,
    } = this.props

    if (currentView !== 'list') {
      return
    }

    const htmlId = listings && listings.length ? `list-${listings[0].listingId}` : null

    if (htmlId && this.listContainerElement) {
      const listingCell = document.getElementById(htmlId)

      const positionFromTop = this.listContainerElement ? this.listContainerElement.scrollTop : 0

      const heightOfCell = this.absoluteHeight(listingCell)

      const advertisement = document.getElementById(SMALL_LIST_VIEW_AD_KEY)

      const index = positionFromTop > 0 && heightOfCell > 0
        ? Math.round(positionFromTop / heightOfCell)
        : 0

      let indexWithAdAdjustment

      if (advertisement && index >= AD_POSITION + 1) {
        const heightOfAd = advertisement.offsetHeight
        indexWithAdAdjustment = Math.round((positionFromTop - heightOfAd) / heightOfCell)
      }

      const listing = listings[indexWithAdAdjustment || index]

      const allowSelect = listing && listing.listingId &&
        (selectedListingId !== listing.listingId && selectListing)

      if (allowSelect) {
        selectListing(listing.listingId)
      }
    }
  }

  absoluteHeight(el) {
    if (el) {
      const styles = window.getComputedStyle(el)
      const margin = parseFloat(styles.marginTop) +
        parseFloat(styles.marginBottom)
      return Math.ceil(el.offsetHeight + margin)
    }
    return 0
  }

  render() {
    const {
      city,
      count,
      currentView,
      hidden,
      listings,
      loading,
      loadingOptions,
      nextPageLink,
      openModal,
      pageNumber,
      pathname,
      previousPageLink,
      pushState,
      query,
      selectedListingId,
      selectListing,
      toggleView,
      total,
      locationSlug,
      searchType,
      propertyType,
      refinementCriteria,
      loadedAds,
      renderAd,
      theme,
      title,
    } = this.props

    return (
      <div
        id="ListViewContainer"
        ref={div => { this.listContainerElement = div }}
        hidden={hidden}
        className={theme.List}
        data-tid="list-view"
      >
        <meta
          itemProp="name"
          content={title}
        />
        <BreadCrumbs />
        <Listings
          loadedAds={loadedAds}
          city={city}
          count={count}
          currentView={currentView}
          listings={listings}
          loading={loading}
          loadingOptions={loadingOptions}
          nextPageLink={nextPageLink}
          openModal={openModal}
          pageNumber={pageNumber}
          pathname={pathname}
          previousPageLink={previousPageLink}
          pushState={pushState}
          query={query}
          selectedListingId={selectedListingId}
          selectListing={selectListing}
          toggleView={toggleView}
          total={total}
          viewType="list"
          locationSlug={locationSlug}
          searchType={searchType}
          propertyType={propertyType}
          refinementCriteria={refinementCriteria}
          renderAd={renderAd}
          withPaginationCards
        />
        <SeoContent />
        <Footer withAccordionLinks />
      </div>
    )
  }
}
