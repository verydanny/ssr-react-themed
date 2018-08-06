import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'

const PDPRatingSection = ({ title, subtitle, content, dataTid, theme }) => (
  <div
    className={theme.PDPRatings_Section}
    data-tid={dataTid}
  >
    <div className={theme.PDPRatings_SectionTitle}>
      <h3>{title}</h3>
      {
        subtitle &&
          <p> {subtitle} </p>
      }
    </div>
    {content}
  </div>
)

PDPRatingSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.node.isRequired,
  theme: PropTypes.object,
  dataTid: PropTypes.string,
}

PDPRatingSection.defaultProps = {
  theme: {},
}

export default themed(/^PDPRatings/, { pure: true })(PDPRatingSection)
