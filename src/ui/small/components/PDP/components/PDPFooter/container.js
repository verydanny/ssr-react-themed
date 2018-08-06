import { connect } from 'react-redux'
import pick from 'lodash/fp/pick'
import {
  getListing,
  getPhoneConditionally,
  getPhoneFormatted,
  getPriceTextOnlyPrice,
} from 'app/selectors/pdpListing'
import { openModal } from 'app/store/shared/actions/modal'
import {
  LEAD_MODAL_ID,
} from 'ui/shared/config/modal-const'
import {
  LEAD_MODAL_PROPS,
} from 'ui/small/components/LeadModal/const'
import PDPFooter from './PDPFooter'

const mapStateToProps = state => ({
  listing: getListing(state),
  phoneFormatted: getPhoneFormatted(state),
  phoneTel: getPhoneConditionally(state),
  price: getPriceTextOnlyPrice(state), // priceTextSelector(getListing(state))
})

const mapDispatchToProps = dispatch => ({
  openLeadFormModal: listing => {
    dispatch(openModal(LEAD_MODAL_ID, pick(LEAD_MODAL_PROPS)(listing)))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PDPFooter)
