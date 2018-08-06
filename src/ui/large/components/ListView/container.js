import { connect } from 'react-redux'
import {
  selectListing,
  selectListingFromMapPin,
  openModal,
} from 'app/store/shared/actions'
import {
  clearListingData,
  clearListingScroll,
  mapZoomOutOnEmpty,
} from 'app/store/large/actions'
import { toggleFavorite } from 'app/store/shared/actions/user'
import {
  previousPageLink as previousPageLinkSelector,
  nextPageLink as nextPageLinkSelector,
  getPageNumber as pageNumberSelector,
  getCityName,
} from 'app/selectors/criteria'
import {
  getIsLoading as isLoadingSelector,
  selectedListingId as selectedListingIdSelector,
  getSelectedListingOptions,
  getFilteredViewportListings,
  getLoadingOptions,
  getListingScroll,
  getTotal,
} from 'app/selectors/listings'
import {
  getPointsCount,
} from 'app/selectors/map'
import {
  getPageStartIndex,
  getPageEndIndex,
} from 'app/selectors/page'
import {
  query as querySelector,
} from 'app/selectors/router'
import {
  getFavorites,
} from 'app/selectors/user'
import ListView from './ListView'

const mapStateToProps = state => ({
  city: getCityName(state),
  count: getPointsCount(state),
  endIndex: getPageEndIndex(state),
  listings: getFilteredViewportListings(state),
  loading: isLoadingSelector(state),
  loadingOptions: getLoadingOptions(state),
  nextPageLink: nextPageLinkSelector(state),
  pageNumber: pageNumberSelector(state),
  previousPageLink: previousPageLinkSelector(state),
  query: querySelector(state),
  selectedListingId: selectedListingIdSelector(state),
  selectedListingIsClicked: getSelectedListingOptions(state).clicked,
  selectedListingShouldScroll: getListingScroll(state),
  startIndex: getPageStartIndex(state),
  total: getTotal(state),
  favorites: getFavorites(state),
})

const mapDispatchToProps = {
  clearListingData,
  clearListingScroll,
  mapZoomOutOnEmpty,
  openModal,
  selectListing,
  selectListingFromMapPin,
  toggleFavorite,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
