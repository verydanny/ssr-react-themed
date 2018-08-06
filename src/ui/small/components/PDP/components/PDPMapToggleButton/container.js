import { connect } from 'react-redux'
import { setToMapView, setToStreetView } from 'app/store/small/actions/map'
import PDPMapToggleButton from './PDPMapToggleButton'

const mapDispatchToProps = dispatch => ({
  onClickStreetView: (onFail, onSuccess) => dispatch(setToStreetView(onFail, onSuccess)),
  onClickMapView: () => dispatch(setToMapView()),
})

export default connect(null, mapDispatchToProps)(PDPMapToggleButton)
