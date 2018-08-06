import { connect } from 'react-redux'
import { getHeadingText } from 'app/selectors/seo'
import {
  getState,
  getCity,
  getHood,
  getZip,
  propertyType as getPropertyType,
} from 'app/selectors/criteria'
import {
  getLegacyStateLanderUrl,
  getHoodLanderUrl,
} from 'app/selectors/url'
import {
  getIsLoading as isLoadingSelector,
  getLoadingOptions,
} from 'app/selectors/listings'
import {
  getTitle as getMetaTitle,
} from 'app/selectors/meta'
import {
  isSearchResultsPage,
} from 'app/selectors/router'
import BreadCrumbs from './BreadCrumbs'

const mapStateToProps = state => ({
  loading: isLoadingSelector(state),
  loadingOptions: getLoadingOptions(state),
  city: getCity(state),
  headingText: getHeadingText(state),
  hood: getHood(state),
  hoodLanderUrl: getHoodLanderUrl(state),
  legacyStateLanderUrl: getLegacyStateLanderUrl(state),
  singlePropertyType: !!getPropertyType(state),
  state: getState(state),
  zip: getZip(state),
  title: getMetaTitle(state),
  isSearchResultsPage: isSearchResultsPage(state),
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreadCrumbs)
