import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from 'ui/small/components/ListingCard'
import { themed } from 'react-themed'
import { LEAD_MODAL_ID } from 'ui/small/components/LeadModal'

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
      listings,
      favorites,
      toggleFavorite,
      theme,
    } = this.props

    const cards = Cards({
      listings,
      favorites,
      toggleFavorite,
      viewType: 'list',
      theme,
      onEmailClick: this.showLeadModal,
    })

    if (cards && cards.length) {
      return (
        <div
          className={theme.RecommendedOrNearby}
          data-tag_section="thank_you_page"
        >
          {
            cityName &&
              <span className={theme.RecommendedOrNearby_Caption}>
                Similar properties around {cityName}
              </span>
          }
          {cards}
        </div>
      )
    }

    return null
  }
}

export default RecommendedOrNearby
