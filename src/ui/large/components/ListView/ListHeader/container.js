import { connect } from 'react-redux'
import { locationSlug, propertyType } from 'app/selectors/criteria'
import { refinements as refinementsSelector } from 'app/selectors/refinements'
import {
  query as querySelector,
  type as searchType,
} from 'app/selectors/router'
import { enableFilter, disableFilter } from 'app/store/large/actions/filters'
import { getCurrentSortData } from 'app/selectors/filters'
import ListHeader from './ListHeader'

const mapStateToProps = state => ({
  locationSlug: locationSlug(state),
  propertyType: propertyType(state),
  query: querySelector(state),
  refinementCriteria: refinementsSelector(state),
  searchType: searchType(state),
  currentSort: getCurrentSortData(state),
})

const mapDispatchToProps = dispatch => ({
  onSortChange: value => {
    if (value === '') {
      dispatch(disableFilter('sort', null, true))
    } else {
      dispatch(enableFilter('sort', value, true))
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader)
