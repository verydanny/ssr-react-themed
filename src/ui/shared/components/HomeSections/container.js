import { connect } from 'react-redux'
import { getHomeSections } from 'app/selectors/meta'
import {
  getSearchTerm,
  getPetFriendlyLink,
  getStudioApartmentsLink,
  getOneBedApartmentsLink,
  getTwoBedApartmentsLink,
  getThreeBedApartmentsLink,
  getCheapApartmentsLink,
} from 'app/selectors/defaultSearch'
import HomeSections from './components/HomeSections'

const mapStateToProps = state => ({
  sections: getHomeSections(state),
  searchTerm: getSearchTerm(state),
  petFriendlyLink: getPetFriendlyLink(state),
  studioLink: getStudioApartmentsLink(state),
  oneBedLink: getOneBedApartmentsLink(state),
  twoBedLink: getTwoBedApartmentsLink(state),
  threeBedLink: getThreeBedApartmentsLink(state),
  cheapLink: getCheapApartmentsLink(state),
})

export default connect(mapStateToProps, {})(HomeSections)
