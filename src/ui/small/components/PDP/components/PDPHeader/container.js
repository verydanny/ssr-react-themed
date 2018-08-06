import { connect } from 'react-redux'
import pushState from 'app/store/thunks/pushState'
import {
  locationSlug as getLocationSlug,
  propertyType as getPropertyType,
  getSearchType,
  getViewType,
} from 'app/selectors/criteria'
import {
  refinementSlug,
} from 'app/selectors/refinements'
import PDPHeader from './PDPHeader'

const mapStateToProps = state => ({
  locationSlug: getLocationSlug(state),
  propertyType: getPropertyType(state),
  refinementSlug: refinementSlug(state),
  searchType: getSearchType(state),
  viewType: getViewType(state),
  // queryParams,
  // shouldClearBBox,
  // shouldClearPage,
})

const mapDispatchToProps = {
  pushState,
}

export default connect(mapStateToProps, mapDispatchToProps)(PDPHeader)
