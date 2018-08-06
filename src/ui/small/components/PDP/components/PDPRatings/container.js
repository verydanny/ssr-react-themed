import { connect } from 'react-redux'
import {
  getAvgOverallRating,
  getCategoryRatings,
  getRatingSummary,
} from 'app/selectors/pdpListing'
import PDPRatings from './PDPRatings'

const mapStateToProps = state => ({
  categoryRatings: getCategoryRatings(state),
  ratingSummary: getRatingSummary(state),
  avgOverallRating: getAvgOverallRating(state),
})

export default connect(mapStateToProps, {})(PDPRatings)
