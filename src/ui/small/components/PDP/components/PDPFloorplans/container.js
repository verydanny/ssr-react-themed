import { connect } from 'react-redux'
import { getTotalFloorplans, getUnitsAvailable } from 'app/selectors/pdpListing'
import PDPFloorplans from './PDPFloorplans'

const mapStateToProps = state => ({
  totalFloorplans: getTotalFloorplans(state),
  unitsAvailable: getUnitsAvailable(state),
})

export default connect(mapStateToProps, {})(PDPFloorplans)
