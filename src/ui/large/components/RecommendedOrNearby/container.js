import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRecommendedOrNearby } from 'app/selectors/listings'
import { getCityName } from 'app/selectors/criteria'
import { getFavorites } from 'app/selectors/user'
import { toggleFavorite } from 'app/store/shared/actions/user'
import {
  LEAD_MODAL_PROPS,
} from 'ui/large/components/LeadModal/const'
import pick from 'lodash/fp/pick'
import {
  openModal,
  closeAllModals,
} from 'app/store/shared/actions'
import RecommendedOrNearby from './RecommendedOrNearby'

const mapStateToProps = state => ({
  listings: getRecommendedOrNearby(state),
  cityName: getCityName(state),
  favorites: getFavorites(state),
})

const mapDispatchToProps = dispatch => ({
  // TODO: something like this might better be handled by global epic
  openModal: (listing, modalId) => {
    dispatch(closeAllModals())

    const modalProps = pick(LEAD_MODAL_PROPS)(listing)

    dispatch(openModal(modalId, modalProps))
  },
  toggleFavorite: bindActionCreators(toggleFavorite, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedOrNearby)
