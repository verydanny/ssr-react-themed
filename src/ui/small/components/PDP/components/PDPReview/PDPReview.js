import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { RatingBar } from '@rentpath/react-ui-core'
import ReadMoreText from 'ui/shared/components/ReadMoreText'

const PDPReview = ({
  theme,
  rating,
  date,
  text,
  author,
  authorDescription,
}) => (
  <div className={theme.PDPReview}>
    <div className={theme.PDPReview_Rating}>
      <RatingBar score={rating} />
    </div>
    <div className={theme.PDPReview_Date}>{date}</div>
    <div className={theme.PDPReview_Text}>
      <ReadMoreText
        text={text}
        count={145}
        triggerCount={175}
      />
    </div>
    <span className={theme.PDPReview_Author}>{author}</span>
    {authorDescription
      &&
      <span className={theme.PDPReview_AuthorDescription}>{authorDescription}</span>}
  </div>
)

PDPReview.propTypes = {
  theme: PropTypes.object,
  rating: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorDescription: PropTypes.string,
}

PDPReview.defaultProps = {
  theme: {},
}

export default themed(/^PDPReview/, { pure: true })(PDPReview)
