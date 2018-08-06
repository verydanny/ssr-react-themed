import React from 'react'
import PropTypes from 'prop-types'
import { RatingBar } from '@rentpath/react-ui-core'
import { themed } from 'react-themed'

const RatingSummaryItem = ({
  ratingCount,
  totalRatings,
  prefixLabel,
  label,
  theme,
  ...props
}) => (
  <div className={theme.RatingSummary_Item}>
    {prefixLabel}
    <RatingBar
      score={ratingCount}
      maxScore={totalRatings}
      label={label || ratingCount.toString()}
      {...props}
    />
  </div>
)

RatingSummaryItem.propTypes = {
  ratingCount: PropTypes.number.isRequired,
  totalRatings: PropTypes.number.isRequired,
  prefixLabel: PropTypes.node,
  label: PropTypes.string,
  theme: PropTypes.object,
}

RatingSummaryItem.defaultProps = {
  theme: {},
}

export default themed(/^(RatingSummary)/, { pure: true })(RatingSummaryItem)
