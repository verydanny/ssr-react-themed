import { connect } from 'react-redux'
import {
  mapInitComplete,
  searchByBoundingBox,
  mapZoomChanged,
} from 'app/store/shared/actions'
import {
  getCenter as getCenterSelector,
} from 'app/selectors/criteria'
import {
  getPoints,
  selectedListingId as selectedListingIdSelector,
  getTotal as getTotalSelector,
} from 'app/selectors/listings'
import {
  getPointsCount as getPointsCountSelector,
  getViewportZoom as getZoomSelector,
  getCurrentMapZoom as getCurrentMapZoomSelector,
  isBelowMinZoom as isBelowMinZoomSelector,
} from 'app/selectors/map'
import {
  getGeoShape as geoShapeSelector,
} from 'app/selectors/shape'
import MapView from './MapView'

const mapStateToProps = state => ({
  center: getCenterSelector(state),
  geoShape: geoShapeSelector(state),
  points: getPoints(state),
  selectedListingId: selectedListingIdSelector(state),
  zoom: getZoomSelector(state),
  belowMinZoom: isBelowMinZoomSelector(state),
  currentMapZoom: getCurrentMapZoomSelector(state),
  count: getPointsCountSelector(state),
  total: getTotalSelector(state),
})

const mapDispatchToProps = {
  searchByBoundingBox,
  mapInitComplete,
  mapZoomChanged,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
