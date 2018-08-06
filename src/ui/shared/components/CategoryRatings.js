import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'

const CategoryRatings = ({ theme, categories }) => {
  if (categories && categories.length) {
    return (
      <div className={theme.CategoryRating}>
        {
          categories.map((categoryRating, i) => (
            <div key={`${categoryRating.category}-${i}`} className={theme.CategoryRating_Container}>
              <div className={theme.CategoryRating_Title}>{categoryRating.category}</div>
              <div className={theme.CategoryRating_Value}>{categoryRating.avgRating}</div>
            </div>
          ))
        }
      </div>
    )
  }
  return null
}

CategoryRatings.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      avgRating: PropTypes.number.isRequired,
    })
  ).isRequired,
  theme: PropTypes.object,
}

CategoryRatings.defaultProps = {
  theme: {},
}

export default themed(/^(CategoryRating)/, { pure: true })(CategoryRatings)
