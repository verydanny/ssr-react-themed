import { connect } from 'react-redux'
import { isCountryUS } from 'app/selectors/geoIp'
import RegisterModal from './RegisterModal'

/**
 * TODO
 * Wire up actions
 */
const mapStateToProps = state => ({
  isCountryUs: isCountryUS(state),
})

export default connect(mapStateToProps, {})(RegisterModal)
