import { connect } from 'react-redux'
import { pushState } from 'app/store/thunks'
import PaginateResultsButton from './PaginateResultsButton'

const mapDispatchToProps = {
  pushState,
}

export default connect(null, mapDispatchToProps)(PaginateResultsButton)
