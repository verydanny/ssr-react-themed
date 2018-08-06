import { connect } from 'react-redux'
import { getHomeNearbyAreas } from 'app/selectors/meta'
import NearbyAreas from './components/NearbyAreas'

const mapStateToProps = state => ({
  content: getHomeNearbyAreas(state),
})

export default connect(mapStateToProps, {})(NearbyAreas)
