import { connect } from 'react-redux'
import {
  makeUnitAvailTextSelector,
  makePriceTextSelector,
  makeBedTextSelector,
  makeBathTextSelector,
  makeGetListing,
} from 'app/selectors/listingInfo'
import {
  getIsMapView,
  getIsListView,
} from 'app/selectors/page'
import { getIsDesktop } from 'app/selectors/request'

const makeMapStateToProps = (initialState, initialProps) => {
  const isMapView = getIsMapView(initialState)
  const isListView = getIsListView(initialState)
  const priceTextSelector = makePriceTextSelector()
  const bedTextSelector = makeBedTextSelector()
  const bathTextSelector = makeBathTextSelector()
  const isMobileMapView = isMapView && !getIsDesktop(initialState)
  const unitAvailTextSelector =
    makeUnitAvailTextSelector(isMobileMapView)
  const getListing = makeGetListing(initialProps.listingId)

  return (state, props) => {
    const listing = props.listing || getListing(state)
    return {
      ...listing,
      isMapView,
      isListView,
      priceText: priceTextSelector(listing),
      beds: bedTextSelector(listing),
      baths: bathTextSelector(listing),
      unitAvailText: unitAvailTextSelector(listing),
    }
  }
}

export default connect(makeMapStateToProps, {})
