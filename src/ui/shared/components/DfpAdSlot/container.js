import { connect } from 'react-redux'
import {
  locationSlug as locationSlugSelector,
} from 'app/selectors/criteria'
import DfpAdSlot from './components/DfpAdSlot'

const mapStateToProps = state => ({
  locationSlug: locationSlugSelector(state),
  displayName: state.meta.displayName,
  searchType: state.meta.searchType,
  lat: state.meta.lat,
  lng: state.meta.lng,
  city: state.meta.city,
  state: state.meta.state,
  zip: state.meta.zip,
  hood: state.meta.hood,
  listingCount: state.meta.listingCount,
  targetCode: state.meta.targetCode,
})

export default connect(mapStateToProps, {})(DfpAdSlot)
