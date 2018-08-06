import { connect } from 'react-redux'
import {
  getListingLocation,
} from 'app/selectors/pdpListing'
import PDPMap from './PDPMap'

const mapStateToProps = state => ({
  center: getListingLocation(state),
})

export default connect(mapStateToProps, {})(PDPMap)
