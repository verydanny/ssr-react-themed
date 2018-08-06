import { connect } from 'react-redux'
import {
  getLocalInfoBody,
  getIsCollegeSearchPath,
} from 'app/selectors/meta'
import {
 shouldDisplayLocalInfo,
} from 'app/selectors/seo'
import {
  propertyTypeText as propertyTypeSelector,
  getCityName,
  getZip,
} from 'app/selectors/criteria'
import {
  getApartmentLinks,
  getPopularNearbyCityLinks,
  getNearbyCollegesLinks,
  getPropertyTypesLinks as propertyTypeLinks,
  getNearbyHoodLinks,
  getNearbyMilitaryBasesLinks,
} from 'app/selectors/seoPriorityLinks'
import {
  renderAd,
} from 'app/store/shared/actions'
import SeoContent from './SeoContent'

const mapStateToProps = state => ({
  localInfoBody: getLocalInfoBody(state),
  propertyType: propertyTypeSelector(state),
  neighborhoods: getNearbyHoodLinks(state),
  colleges: getNearbyCollegesLinks(state),
  militaryBases: getNearbyMilitaryBasesLinks(state),
  apartmentLinks: getApartmentLinks(state),
  propertyTypeLinks: propertyTypeLinks(state),
  cityLinks: getPopularNearbyCityLinks(state),
  locationName: getZip(state) || getCityName(state),
  shouldDisplayLocalInfo: shouldDisplayLocalInfo(state),
  shouldDisplayNearbyColleges: !getIsCollegeSearchPath(state),
})

const mapDispatchToProps = {
  renderAd,
}

export default connect(mapStateToProps, mapDispatchToProps)(SeoContent)
