import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import cn from 'classnames'
import PDPReviewGallery from 'ui/small/components/PDP/components/PDPReviewGallery'
import RatingSummary from 'ui/shared/components/RatingSummary'
import CategoryRatings from 'ui/shared/components/CategoryRatings'
import AggregateRating from 'ui/shared/components/AggregateRating'
import PDPSection from '../PDPSection'
import PDPRatingSection from './PDPRatingSection'

const PDPRatings = ({ theme, categoryRatings, ratingSummary, avgOverallRating }) => {
  const { numRatings, values } = ratingSummary

  const renderRatings = ({ expanded }) => {
    const ratingsTheme = cn(
      theme.PDPRatings,
      { [theme['PDPRatings-expanded']]: expanded }
    )

    return (
      <div className={ratingsTheme}>
        {
          numRatings > 0 && values.length > 0 &&
            <PDPRatingSection
              title={'Property Ratings'}
              subtitle={'Ratings data provided by Kingsley Associates'}
              dataTid="pdpRatingSummary"
              content={
                <RatingSummary
                  total={numRatings}
                  values={values}
                />
              }
            />
        }

        {
          categoryRatings.length > 0 &&
            <PDPRatingSection
              title={'Ratings & Trends'}
              subtitle={'Ratings out of 5 stars'}
              dataTid="pdpRatingTrends"
              content={
                <CategoryRatings categories={categoryRatings} />
              }
            />
        }
        <PDPReviewGallery />
      </div>
    )
  }
  renderRatings.propTypes = { expanded: PropTypes.bool }

  return (
    <PDPSection
      category="Ratings & Reviews"
      description={
        <div className={theme.PDPRatings_Description}>
          {
            avgOverallRating &&
              <AggregateRating
                className={theme.PDPRatings_Stars}
                listing={{ numRatings, avgOverallRating }}
                label={`(${numRatings})`}
              />
          }
          What people are saying.
        </div>
      }
      renderHidable={renderRatings}
      theme={theme}
      dataTid="pdpReviews"
    />
  )
}

PDPRatings.propTypes = {
  avgOverallRating: PropTypes.number,
  categoryRatings: PropTypes.arrayOf(
    PropTypes.shape({
      avgRating: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
  ratingSummary: PropTypes.shape({
    numRatings: PropTypes.number.isRequired,
    values: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ),
  }),
  theme: PropTypes.object,
}

PDPRatings.defaultProps = {
  theme: {},
}

export default themed(/^PDPRatings/, { pure: true })(PDPRatings)
