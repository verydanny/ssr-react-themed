import { connect } from 'react-redux'
import {
  query as querySelector,
} from 'app/selectors/router'
import LinkList from './LinkList'

const mapStateToProps = state => ({
  resultsDisplayMode: querySelector(state)['display-mode'],
})

export default connect(mapStateToProps, {})(LinkList)
