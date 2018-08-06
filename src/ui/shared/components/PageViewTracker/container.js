import { connect } from 'react-redux'
import { criteria as getCriteria } from 'app/selectors/criteria'
import {
  route as getRoute,
  location as getLocation,
} from 'app/selectors/router'
import { getTaggingPageName } from 'app/selectors/tagging'
import { getListingIdsArray } from 'app/selectors/listings'
import PageViewTracker from './PageViewTracker'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  taggingPageName: getTaggingPageName(state),
  criteria: getCriteria(state),
  location: getLocation(state),
  route: getRoute(state),
  listings: getListingIdsArray(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageViewTracker)
