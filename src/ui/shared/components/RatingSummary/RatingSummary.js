import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { Icon } from 'ui/shared/components/Icon'
import star from 'ui/shared/components/Icon/svgs/star.svg'
import RatingSummaryItem from './RatingSummaryItem'

const RatingSummary = ({ total, values, theme }) => {
  if (!total || !values) return null

  return (
    <div className={theme.RatingSummary}>
      {
        values.map((value, i) => (
          <RatingSummaryItem
            key={i}
            prefixLabel={
              <div className={theme.RatingSummary_Prefix}>
                {value.name}
                <Icon svgs={{ star }} className={theme.RatingSummary_Star} />
              </div>
            }
            label={value.label}
            ratingCount={value.count}
            totalRatings={total}
          />
        ))
      }
    </div>
  )
}

RatingSummary.propTypes = {
  total: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  theme: PropTypes.object,
}

RatingSummary.defaultProps = {
  theme: {},
}

export default themed(/^(RatingSummary)/, { pure: true })(RatingSummary)
