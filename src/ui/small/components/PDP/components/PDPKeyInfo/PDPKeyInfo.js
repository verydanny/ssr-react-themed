import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import AggregateRating from 'ui/shared/components/AggregateRating'
import FavoriteIcon from 'ui/shared/components/FavoriteIcon'

const PDPKeyInfo = ({
  listingId,
  listing,
  priceText,
  theme,
  propertyLabel,
  bedsText,
  bathText,
  sqFt,
  unitsAvailable,
  favorites,
  toggleFavorite,
}) => (
  <div className={theme.PDPKeyInfo} data-tid="pdpKeyInfo">
    <div className={theme.PDPKeyInfo_Price} data-tid="pdpKeyInfo_price">
      {priceText}
      <AggregateRating
        data-tid="pdpKeyInfo_rating"
        listing={listing}
        label={`(${listing.numRatings})`}
      />
    </div>
    <h1 className={theme.PDPKeyInfo_PropertyLabel}>
      {propertyLabel}
    </h1>
    <ul className={theme.PDPKeyInfo_PropertyDetails}>
      <li data-tid="pdpKeyInfo_bedText">{bedsText}</li>
      <li data-tid="pdpKeyInfo_bathText">{bathText}</li>
      {sqFt && <li data-tid="pdpKeyInfo_sqFt">{sqFt} sqft</li>}
      <li className={theme.PDPKeyInfo_AvailabilityLabel} data-tid="pdpKeyInfo_unitsAvailable">
        {unitsAvailable}
      </li>
    </ul>
    <FavoriteIcon
      isFavorite={favorites[listingId]}
      onClick={() => { toggleFavorite(listingId) }}
    />
  </div>
)

PDPKeyInfo.propTypes = {
  theme: PropTypes.object,
  listing: PropTypes.object,
  propertyLabel: PropTypes.string,
  unitsAvailable: PropTypes.string,
  bathText: PropTypes.string,
  bedsText: PropTypes.string,
  sqFt: PropTypes.string,
  priceText: PropTypes.string,
  toggleFavorite: PropTypes.func,
  favorites: PropTypes.object,
  listingId: PropTypes.string,
}

PDPKeyInfo.defaultProps = {
  theme: {},
}

export default themed(/^PDPKeyInfo/, { pure: true })(PDPKeyInfo)
