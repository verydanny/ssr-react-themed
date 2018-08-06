import { connect } from 'react-redux'
import {
  openModal,
  selectListingFromMapPin,
} from 'app/store/shared/actions'
import {
  selectedListingId as selectedListingIdSelector,
  getComputedPinData,
  getSelectedListingOptions,
} from 'app/selectors/listings'
import { clearListingData } from 'app/store/large/actions'
import PinPopUp from './PinPopUp'

const mapStateToProps = state => ({
  selectedListingId: selectedListingIdSelector(state),
  selectedListing: getComputedPinData(state),
  selectedListingOptions: getSelectedListingOptions(state),
})

const mapDispatchToProps = {
  openModal,
  selectListingFromMapPin,
  clearListingData,
}

export default connect(mapStateToProps, mapDispatchToProps)(PinPopUp)
