import { connect } from 'react-redux'
import { updateFilterCriteriaWithChanges } from 'app/store/thunks/filterForm'
import { pushState } from 'app/store/thunks'
import { formSubmitUrl } from 'app/selectors/filterForm'
import InlinePriceFilterCard from './InlinePriceFilterCard'

const mapStateToProps = state => ({
  submitUrl: formSubmitUrl(state),
})

const mapDispatchToProps = ({
  updateFilterCriteriaWithChanges,
  pushState,
})

export default connect(mapStateToProps, mapDispatchToProps)(InlinePriceFilterCard)
