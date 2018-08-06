import { connect } from 'react-redux'
import {
  selectListing,
  updateViews,
} from 'app/store/shared/actions'
import {
  viewportListingIds as viewportListingIdsSelector,
  getListingIdsArray,
  getFilteredViewportListings,
} from 'app/selectors/listings'
import {
  getCurrentView,
  getPreviousView,
  getLoadedViews,
} from 'app/selectors/page'
import { pushState } from 'app/store/thunks'
import ActiveView from './ActiveView'

const mapStateToProps = state =>
  ({
    currentView: getCurrentView(state),
    previousView: getPreviousView(state),
    loadedViews: getLoadedViews(state),
    viewportListingIds: viewportListingIdsSelector(state),
    filteredViewportListings: getFilteredViewportListings(state),
    listingIdsArray: getListingIdsArray(state),
  })

const mapDispatchToProps = {
  updateViews,
  pushState,
  selectListing,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveView)
