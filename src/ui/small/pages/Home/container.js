import { connect } from 'react-redux'
import { activeFeatures as activeFeaturesSelector } from 'app/selectors/experiments'
import {
  getHeadline,
  getSubHeadline,
  getSearchbarHeadline,
} from 'app/selectors/meta'
import Home from './Home'

const mapStateToProps = state => ({
  activeFeatures: activeFeaturesSelector(state),
  headline: getHeadline(state),
  subHeadline: getSubHeadline(state),
  searchbarHeadline: getSearchbarHeadline(state),
})

export default connect(mapStateToProps, {})(Home)
