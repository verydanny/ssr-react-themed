import { connect } from 'react-redux'
import { getAmenities } from 'app/selectors/pdpListing'
import PDPAmenities from './PDPAmenities'

const mapStateToProps = state => ({
  amenities: getAmenities(state),
})

export default connect(mapStateToProps, {})(PDPAmenities)
