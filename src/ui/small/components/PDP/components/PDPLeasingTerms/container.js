import { connect } from 'react-redux'
import { getSpecialTermsText } from 'app/selectors/pdpListing'
import PDPLeasingTerms from './PDPLeasingTerms'

const mapStateToProps = state => ({
  terms: getSpecialTermsText(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PDPLeasingTerms)

