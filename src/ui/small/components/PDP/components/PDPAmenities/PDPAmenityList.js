import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'

const PDPAmenityList = ({
  category,
  amenities,
  theme,
}) => (
  <div className={theme.PDPSectionList}>
    <h3 className={theme.PDPSectionList_Category}>{category}</h3>
    <div className={theme.PDPSectionList_List}>
      {amenities.map(a => <div key={a}>{a}</div>)}
    </div>
  </div>
)

PDPAmenityList.propTypes = {
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  theme: PropTypes.object,
}

PDPAmenityList.defaultProps = {
  theme: {},
}

export default themed(/^PDPSectionList/, { pure: true })(PDPAmenityList)
