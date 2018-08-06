import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { RatingBar } from '@rentpath/react-ui-core'

const roundedRating = rating => {
  if (!rating) return rating
  return Math.round(rating * 2.0) / 2.0
}

const Ratings = ({
  theme,
  listing,
  label,
  ...props
}) => {
  if (!listing.numRatings) return null

  const avgRating = roundedRating(listing.avgOverallRating)
  const effectiveLabel = label || `${listing.numRatings}`

  return (
    <RatingBar
      className={theme.AggregateRating}
      data-tid="rating"
      score={avgRating}
      label={effectiveLabel}
      {...props}
    />
  )
}

Ratings.propTypes = {
  theme: PropTypes.object,
  listing: PropTypes.shape({
    avgOverallRating: PropTypes.number,
    numRatings: PropTypes.number,
  }).isRequired,
  label: PropTypes.string,
}

Ratings.defaultProps = {
  theme: {},
}

export default themed(/^(AggregateRating)/, { pure: true })(Ratings)
