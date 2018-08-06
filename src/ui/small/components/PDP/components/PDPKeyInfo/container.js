import { connect } from 'react-redux'
import {
  getListing,
  getListingId,
  getPropertyLabel,
  getPriceText,
  getBedText,
  getBathText,
  getUnitAvailability,
  getSqFtRange,
} from 'app/selectors/pdpListing'
import {
  getFavorites,
} from 'app/selectors/user'
import { toggleFavorite } from 'app/store/shared/actions/user'
import PDPKeyInfo from './PDPKeyInfo'

const mapStateToProps = state => ({
  listingId: getListingId(state),
  listing: getListing(state),
  propertyLabel: getPropertyLabel(state),
  priceText: getPriceText(state),
  bedsText: getBedText(state),
  bathText: getBathText(state),
  unitsAvailable: getUnitAvailability(state),
  favorites: getFavorites(state),
  sqFt: getSqFtRange(state),
})

const mapDispatchToProps = {
  toggleFavorite,
}

export default connect(mapStateToProps, mapDispatchToProps)(PDPKeyInfo)
