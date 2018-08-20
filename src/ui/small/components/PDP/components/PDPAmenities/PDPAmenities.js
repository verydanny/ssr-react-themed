import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import cn from 'classnames'

import PDPSection from '../PDPSection'
import PDPAmenityList from './PDPAmenityList'

export const getAmenitiesLength = amenities => {
  if (!amenities) { return 0 }
  const categories = Object.keys(amenities)

  return categories.reduce((acc, category) => {
    const catArray = amenities[category] || []
    return acc + catArray.length
  }, 0)
}

const PDPAmenities = ({ amenities, theme }) => {
  const renderMappedAmenities = ({ expanded }) => {
    const categories = Object.keys(amenities)
    const listTheme = cn(
      theme.PDPAmenities,
      { [theme['PDPAmenities-expanded']]: expanded }
    )

    return (
      <div
        className={listTheme}
        data-tid="pdpAmenityList"
      >
        {categories.map((category, index) => (
          <PDPAmenityList
            key={`${amenities.category}-${index}`}
            amenities={amenities[category]}
            category={category}
            theme={theme}
          />
        ))}
      </div>
    )
  }
  renderMappedAmenities.propTypes = { expanded: PropTypes.bool }

  const amenitiesLength = getAmenitiesLength(amenities)

  return (
    <PDPSection
      category="Amenities"
      dataTid="pdpAmenities"
      description={`See all ${amenitiesLength} amenities for this unit`}
      renderHidable={renderMappedAmenities}
      theme={theme}
    />
  )
}

PDPAmenities.propTypes = {
  amenities: PropTypes.object,
  theme: PropTypes.object,
}

PDPAmenities.defaultProps = {
  amenities: {},
  theme: {},
}

export default themed(/^PDPAmenities/, { pure: true })(PDPAmenities)
