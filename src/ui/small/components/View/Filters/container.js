import { connect } from 'react-redux'
import {
  updateFilterCriteriaWithChanges,
  resetFilterCriteria,
} from 'app/store/thunks/filterForm'
import {
  getCurrentView,
} from 'app/selectors/page'
import {
  getTotal,
} from 'app/selectors/listings'
import {
  filterTotal,
  filterCriteria,
  formSubmitUrl,
} from 'app/selectors/filterForm'
import FiltersView from './FiltersView'

const mapStateToProps = state => ({
  hidden: getCurrentView(state) !== 'filters',
  previousView: state.page.previousView,
  total: getTotal(state),
  filterTotal: filterTotal(state),
  filterCriteria: filterCriteria(state),
  submitUrl: formSubmitUrl(state),
})

const mapDispatchToProps = ({
  updateFilterCriteria: updateFilterCriteriaWithChanges,
  resetFilterCriteria,
})

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView)
