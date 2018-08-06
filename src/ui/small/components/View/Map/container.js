import { connect } from 'react-redux'
import {
  searchByBoundingBox,
  selectListing,
  selectListingFromMapPin,
  openModal,
  gotoNextPage,
  gotoPreviousPage,
  mapInitComplete,
  mapZoomChanged,
} from 'app/store/shared/actions'
import { selectPinAndTrack as selectPin, pushState } from 'app/store/thunks'
import {
  nextPageLink as nextPageLinkSelector,
  previousPageLink as previousPageLinkSelector,
  getCenter as getCenterSelector,
  getPageNumber as pageNumberSelector,
} from 'app/selectors/criteria'
import {
  getFilteredViewportListings,
  getPoints,
  selectedListingId as selectedListingIdSelector,
  getIsLoading as isLoadingSelector,
  getLoadingOptions,
  getTotal,
} from 'app/selectors/listings'
import {
  getPointsCount,
  getViewportZoom as getZoomSelector,
  getCurrentMapZoom as getCurrentMapZoomSelector,
  isBelowMinZoom as isBelowMinZoomSelector,
} from 'app/selectors/map'
import {
  getCurrentView,
} from 'app/selectors/page'
import {
  query as querySelector,
} from 'app/selectors/router'
import {
  getGeoShape as geoShapeSelector,
} from 'app/selectors/shape'
import MapView from './MapView'

const mapStateToProps = state => ({
  center: getCenterSelector(state),
  count: getPointsCount(state),
  currentView: getCurrentView(state),
  geoShape: geoShapeSelector(state),
  hidden: getCurrentView(state) !== 'map',
  loading: isLoadingSelector(state),
  loadingOptions: getLoadingOptions(state),
  nextPageLink: nextPageLinkSelector(state),
  pageNumber: pageNumberSelector(state),
  points: getPoints(state),
  previousPageLink: previousPageLinkSelector(state),
  query: querySelector(state),
  selectedListingId: selectedListingIdSelector(state),
  total: getTotal(state),
  viewportListings: getFilteredViewportListings(state),
  zoom: getZoomSelector(state),
  belowMinZoom: isBelowMinZoomSelector(state),
  currentMapZoom: getCurrentMapZoomSelector(state),
})

const mapDispatchToProps = {
  openModal,
  pushState,
  searchByBoundingBox,
  selectListingFromMapPin,
  selectListing,
  selectPin,
  gotoNextPage,
  gotoPreviousPage,
  mapInitComplete,
  mapZoomChanged,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
