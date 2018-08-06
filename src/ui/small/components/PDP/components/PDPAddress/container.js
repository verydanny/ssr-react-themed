import { connect } from 'react-redux'
import {
  getAddress,
  getCity,
  getState,
  getZipCode,
  getNeighborhood,
} from 'app/selectors/pdpListing'
import PDPAddress from './PDPAddress'

const mapStateToProps = state => ({
  city: getCity(state),
  state: getState(state),
  zipCode: getZipCode(state),
  neighborhood: getNeighborhood(state),
  streetAddress: getAddress(state),
})

export default connect(mapStateToProps)(PDPAddress)
