import { connect } from 'react-redux'
import {
  filterCount as filterCountSelector,
} from 'app/selectors/refinements'
import {
  getLoadedViews,
} from 'app/selectors/page'
import ToggleBar from './ToggleBar'

const mapStateToProps = state => ({
  filterCount: filterCountSelector(state),
  loadedViewKeys: Object.keys(getLoadedViews(state)),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBar)
