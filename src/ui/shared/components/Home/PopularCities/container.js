import { connect } from 'react-redux'
import { getHomePopularCities } from 'app/selectors/meta'
import PopularCities from './components/PopularCities'

const mapStateToProps = state => ({
  content: getHomePopularCities(state),
})

export default connect(mapStateToProps, {})(PopularCities)
