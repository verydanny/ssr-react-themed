import { connect } from 'react-redux'
import {
  selectListing,
  openModal,
  renderAd,
} from 'app/store/shared/actions'
import {
  previousPageLink as previousPageLinkSelector,
  nextPageLink as nextPageLinkSelector,
  getPageNumber as pageNumberSelector,
  getCityName,
  locationSlug,
  propertyType,
} from 'app/selectors/criteria'
import {
  getIsLoading as isLoadingSelector,
  viewportListingIds as viewportListingIdsSelector,
  selectedListingId as selectedListingIdSelector,
  getFilteredViewportListings,
  getLoadingOptions,
  getTotal,
} from 'app/selectors/listings'
import {
  getPointsCount,
} from 'app/selectors/map'
import {
  getCurrentView,
} from 'app/selectors/page'
import {
  query as querySelector,
  type as searchType,
  uri as uriSelector,
} from 'app/selectors/router'
import {
  refinements as refinementsSelector,
} from 'app/selectors/refinements'
import { getTitle } from 'app/selectors/meta'
import { pushState } from 'app/store/thunks'
import ListView from './ListView'

const mapStateToProps = state => ({
  loadedAds: state.ads.rendered,
  title: getTitle(state),
  city: getCityName(state),
  count: getPointsCount(state),
  currentView: getCurrentView(state),
  hidden: getCurrentView(state) !== 'list',
  listings: getFilteredViewportListings(state),
  loading: isLoadingSelector(state),
  loadingOptions: getLoadingOptions(state),
  nextPageLink: nextPageLinkSelector(state),
  pageNumber: pageNumberSelector(state),
  previousPageLink: previousPageLinkSelector(state),
  query: querySelector(state),
  selectedListingId: selectedListingIdSelector(state),
  total: getTotal(state),
  viewportListingIds: viewportListingIdsSelector(state),
  refinementCriteria: refinementsSelector(state),
  locationSlug: locationSlug(state),
  propertyType: propertyType(state),
  searchType: searchType(state),
  uri: uriSelector(state),
})

const mapDispatchToProps = {
  selectListing,
  openModal,
  pushState,
  renderAd,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
