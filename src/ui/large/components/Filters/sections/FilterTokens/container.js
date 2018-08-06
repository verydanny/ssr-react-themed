import { connect } from 'react-redux'
import {
  disableFilter,
  clearFilters,
  toggleShowTokens,
} from 'app/store/large/actions/filters'
import {
  getShowAllFilterTokens,
  getFilterTokenFilters,
  getActiveTokenLength,
  getIsFiltersModalOpen,
} from 'app/selectors/filters'
import FilterTokens from './FilterTokens'

const mapStateToProps = state => ({
  activeFilters: getFilterTokenFilters(state),
  isShowingAllTokens: getShowAllFilterTokens(state),
  activeTokenLength: getActiveTokenLength(state),
  isFiltersModalOpen: getIsFiltersModalOpen(state),
})

const mapDispatchToProps = {
  clearFilters,
  disableFilter,
  toggleShowTokens,
}

const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default withRedux(FilterTokens)
