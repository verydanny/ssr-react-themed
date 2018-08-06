import { connect } from 'react-redux'
import {
  locationSlug,
  propertyType,
} from 'app/selectors/criteria'
import {
  refinements as refinementsSelector,
} from 'app/selectors/refinements'
import {
  query as querySelector,
  type as searchType,
} from 'app/selectors/router'
import {
  enableFilter,
  disableFilter,
  updateFilterValue,
  clearFilters,
} from 'app/store/large/actions/filters'
import {
  getFilters,
  getBedQuickFilterText,
  getPriceQuickFilterText,
  getIsFiltersModalOpen,
  getActiveFiltersFromState,
} from 'app/selectors/filters'
import Filters from './Filters'

const mapStateToProps = state => ({
  queryParams: querySelector(state),
  locationSlug: locationSlug(state),
  propertyType: propertyType(state),
  query: querySelector(state),
  refinementCriteria: refinementsSelector(state),
  searchType: searchType(state),
  filters: getFilters(state),
  activeFilters: getActiveFiltersFromState(state),
  bedButtonText: getBedQuickFilterText(state),
  priceButtonText: getPriceQuickFilterText(state),
  isFiltersModalOpen: getIsFiltersModalOpen(state),
})

const mapDispatchToProps = {
  enableFilter,
  disableFilter,
  updateFilterValue,
  clearFilters,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
