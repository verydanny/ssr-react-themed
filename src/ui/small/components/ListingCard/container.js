import { connect } from 'react-redux'
import {
  activeFeatures,
  isReactPDP,
} from 'app/selectors/experiments'
import { getListHubId } from 'app/selectors/listings'
import { getFavorites } from 'app/selectors/user'
import { toggleFavorite } from 'app/store/shared/actions/user'
import {
  criteria as getCriteria,
  isPriceFilterActive,
  isBedroomFilterActive,
  isBathroomFilterActive,
} from 'app/selectors/criteria'

import {
  addViewToCriteria,
  pushState,
} from 'app/store/thunks'

import {
  getIsListView,
} from 'app/selectors/page'

import Listings from './components/Listings'

const mapStateToProps = state => ({
  isListView: getIsListView(state),
  listHubId: getListHubId(state),
  features: activeFeatures(state),
  favorites: getFavorites(state),
  isReactPDP: isReactPDP(state),
  criteria: getCriteria(state),
  isPriceFilterActive: isPriceFilterActive(state),
  isBedroomFilterActive: isBedroomFilterActive(state),
  isBathroomFilterActive: isBathroomFilterActive(state),
  isInlineFilterCardsEnabled: activeFeatures(state).includes('IFC_v1_Inline_Filter_Cards'),
})

const mapDispatchToProps = {
  pushState,
  toggleFavorite,
  addViewToCriteria,
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings)
