import { connect } from 'react-redux'
import { getRadius, getMetaLat, getMetaLng } from 'app/selectors/meta'

import GeoCircle from './components/GeoCircle'

const mapStateToProps = state => ({
  lat: getMetaLat(state),
  lng: getMetaLng(state),
  radius: getRadius(state),
})

export default connect(mapStateToProps, {})(GeoCircle)
