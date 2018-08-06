import { propertyType as propertyTypeSelector } from 'app/selectors/criteria'
import {
  getCurrentSearch,
  getFilteredAutocomplete,
} from 'app/selectors/searchInput'
import { refinementSlug as refinementSlugSelector } from 'app/selectors/refinements'
import { connect } from 'react-redux'
import pipe from 'lodash/fp/pipe'
import { withCookies } from 'react-cookie'
import { goToSearchLocation, updateSearch, clearSearch } from 'app/store/shared/actions'
import {
  query as querySelector,
} from 'app/selectors/router'
import { getDefaultSearch } from 'app/selectors/defaultSearch'
import SearchInput from './SearchInput'

const mapStateToProps = state => ({
  propertyType: propertyTypeSelector(state),
  queryParams: querySelector(state),
  refinementSlug: refinementSlugSelector(state),
  currentSearch: getCurrentSearch(state),
  suggestedLocations: getFilteredAutocomplete(state),
  defaultSearch: getDefaultSearch(state),
})

const mapDispatchToProps = {
  selectLocation: goToSearchLocation,
  updateSearch,
  clearSearch,
}

const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default pipe(withRedux, withCookies)(SearchInput)
