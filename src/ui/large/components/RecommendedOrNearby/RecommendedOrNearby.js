import React, { Component } from 'react'
import PropTypes from 'prop-types'
// TODO: should cards be moved outside of ListView
import Cards from 'ui/large/components/ListView/ListingCard/Cards'
import { themed } from 'react-themed-too'
import { LEAD_MODAL_ID } from 'ui/shared/config/modal-const'

@themed(/^RecommendedOrNearby/)
class RecommendedOrNearby extends Component {

  static propTypes = {
    cityName: PropTypes.string,
    listings: PropTypes.array,
    openModal: PropTypes.func,
    theme: PropTypes.object,
    favorites: PropTypes.object,
    toggleFavorite: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
    favorites: {},
  }

  showLeadModal = listing => {
    const { openModal } = this.props

    if (openModal) openModal(listing, LEAD_MODAL_ID)
  }

  render() {
    const {
      cityName,
      favorites,
      toggleFavorite,
      listings,
      theme,
    } = this.props

    const cards = Cards({
      listings,
      favorites,
      toggleFavorite,
      openModal: this.showLeadModal,
    })

    if (cards && cards.length) {
      return (
        <div
          className={theme.RecommendedOrNearby}
          data-tag_section="thank_you_page"
        >
          {
            cityName &&
              <div
                className={theme.RecommendedOrNearby_Caption}
                data-tid="recommended-caption"
              >
                Similar properties around {cityName}
              </div>
          }
          <div className={theme.RecommendedOrNearby_Cards}>
            {cards}
          </div>
        </div>
      )
    }

    return null
  }
}

export default RecommendedOrNearby
