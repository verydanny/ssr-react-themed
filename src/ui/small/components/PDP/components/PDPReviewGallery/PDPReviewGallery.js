import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import ContentGallery from 'ui/shared/components/ContentGallery'
import PDPReview from 'ui/small/components/PDP/components/PDPReview'

const props1 = {
  rating: 3.5,
  date: 'July 5th, 2018',
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
  author: 'David T.',
  authorDescription: 'Certified Resident',
}
const props2 = {
  rating: 1,
  date: 'July 5th, 2018',
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
  author: 'David T.',
  authorDescription: 'Certified Resident',
}
const props3 = {
  rating: 4.5,
  date: 'July 5th, 2018',
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
  author: 'David T.',
  authorDescription: 'Certified Resident',
}
const props4 = {
  rating: 3,
  date: 'July 5th, 2018',
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
  author: 'David T.',
  authorDescription: 'Certified Resident',
}
const props5 = {
  rating: 2,
  date: 'July 5th, 2018',
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
  author: 'David T.',
  authorDescription: 'Certified Resident',
}

const PDPReviewGallery = ({
  theme,
}) => (
  <div className={theme.PDPReviewGallery}>
    <ContentGallery>
      <PDPReview {...props1} />
      <PDPReview {...props2} />
      <PDPReview {...props3} />
      <PDPReview {...props4} />
      <PDPReview {...props5} />
    </ContentGallery>
    <button
      className={theme.PDPReviewGallery_SeeAllButton}
    >
        See All (X) Reviews
    </button>
    <button
      className={theme.PDPReviewGallery_WriteButton}
    >
        Write a Review
    </button>
  </div>
)

PDPReviewGallery.propTypes = {
  theme: PropTypes.object,
}

PDPReviewGallery.defaultProps = {
  theme: {},
}

export default themed(/^PDPReviewGallery/, { pure: true })(PDPReviewGallery)
