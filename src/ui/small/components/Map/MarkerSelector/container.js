import { connect } from 'react-redux'
import { withMarkerEvents } from 'ui/shared/components/Markers'
import { selectListingFromMapPin } from 'app/store/shared/actions'
import BaseMarkerSelector from './MarkerSelector'

const mapDispatchToProps = {
  selectListing: selectListingFromMapPin,
}

const MarkerSelector = withMarkerEvents(BaseMarkerSelector)
export default connect(null, mapDispatchToProps)(MarkerSelector)
