import { connect } from 'react-redux'
import { locationSlug, propertyType } from 'app/selectors/criteria'
import { openModal, updateFilterCriteria } from 'app/store/shared/actions'
import {
  updateFilterValue,
  enableFilter,
  disableFilter,
  clearFilters,
  restoreFilters,
  applyFilters,
  disableAllFilters,
} from 'app/store/large/actions/filters'
import { applyQuickFilters } from 'app/store/large/actions'
import { refinements as refinementsSelector } from 'app/selectors/refinements'
import {
  query as querySelector,
  type as searchType,
} from 'app/selectors/router'
import { getTotal } from 'app/selectors/listings'
import { buildFilterLink, getFiltersFromState, getFilterTotal } from 'app/selectors/filters'
import MoreFiltersModal from './MoreFiltersModal'

const mapStateToProps = state => ({
  filterTotal: getFilterTotal(state),
  locationSlug: locationSlug(state),
  propertyType: propertyType(state),
  query: querySelector(state),
  refinementCriteria: refinementsSelector(state),
  searchType: searchType(state),
  total: getTotal(state),
  filterLink: buildFilterLink(state),
  filters: getFiltersFromState(state),
})

const mapDispatchToProps = {
  openModal,
  updateFilterCriteria,
  applyQuickFilters,
  updateFilterValue,
  enableFilter,
  disableFilter,
  restoreFilters,
  clearFilters,
  applyFilters,
  disableAllFilters,
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreFiltersModal)
