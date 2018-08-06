import { connect } from 'react-redux'
import {
  submitLead,
  submitLeadSuccess,
  submitLeadFailure,
} from 'app/store/shared/actions'
import { withCookies } from 'react-cookie'
import pipe from 'lodash/fp/pipe'
import { lead as leadDataSelector } from 'app/selectors/lead'
import { getListHubId } from 'app/selectors/listings'
import { isCountryUS } from 'app/selectors/geoIp'

import LeadModal from './LeadModal'

const mapDispatchToProps = {
  submitLead,
  submitLeadSuccess,
  submitLeadFailure,
}

const mapStateToProps = state => ({
  isCountryUS: isCountryUS(state),
  listHubId: getListHubId(state),
  ...leadDataSelector(state),
})

export default pipe(withCookies, connect(mapStateToProps, mapDispatchToProps))(LeadModal)
