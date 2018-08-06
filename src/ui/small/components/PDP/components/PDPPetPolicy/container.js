import { connect } from 'react-redux'
import { getMappedPetPolicies } from 'app/selectors/pdpListing'
import PDPPetPolicy from './PDPPetPolicy'

const mapStateToProps = state => ({
  policies: getMappedPetPolicies(state),
})

export default connect(mapStateToProps, {})(PDPPetPolicy)
