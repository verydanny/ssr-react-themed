import { connect } from 'react-redux'
import {
  getLocalInfoBody,
  getIsCollegeSearchPath,
} from 'app/selectors/meta'
import {
  propertyTypeText as propertyTypeSelector,
  getCityName,
  getZip,
} from 'app/selectors/criteria'
import {
 shouldDisplayLocalInfo,
} from 'app/selectors/seo'
import {
  getApartmentLinks,
  getPopularNearbyCityLinks,
  getNearbyCollegesLinks,
  getPropertyTypesLinks as propertyTypeLinks,
  getNearbyHoodLinks,
  getNearbyMilitaryBasesLinks,
} from 'app/selectors/seoPriorityLinks'
import SeoContent from './SeoContent'

const mapStateToProps = state => ({
  localInfoBody: getLocalInfoBody(state),
  propertyType: propertyTypeSelector(state),
  neighborhoods: getNearbyHoodLinks(state),
  colleges: getNearbyCollegesLinks(state),
  militaryBases: getNearbyMilitaryBasesLinks(state),
  apartmentLinks: getApartmentLinks(state).links,
  propertyTypeLinks: propertyTypeLinks(state),
  cityLinks: getPopularNearbyCityLinks(state),
  locationName: getZip(state) || getCityName(state),
  shouldDisplayLocalInfo: shouldDisplayLocalInfo(state),
  shouldDisplayNearbyColleges: !getIsCollegeSearchPath(state),
})

export default connect(mapStateToProps, {})(SeoContent)
