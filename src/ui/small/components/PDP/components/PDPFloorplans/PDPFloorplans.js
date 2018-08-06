import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import cn from 'classnames'
import PDPSection from '../PDPSection'

const PDPFloorplans = ({
  theme,
  totalFloorplans,
  unitsAvailable,
}) => {
  const renderFloorplans = ({ expanded }) => {
    const listTheme = cn(
      theme.PDPFloorplans,
      { [theme['PDPFloorplans-expanded']]: expanded }
    )
    return ( // Return list and comparison placholder that will be built in a future story
      <div
        className={listTheme}
        data-tid="pdpFloorplansList"
      >
        <div>
            Floorplans<br /><br />
            Floorplans<br /><br />
            Floorplans<br /><br />
            Floorplans<br /><br />
            Floorplans<br /><br />
            Floorplans<br /><br />
        </div>
      </div>
    )
  }

  renderFloorplans.propTypes = { expanded: PropTypes.bool }

  return (
    <PDPSection
      category="Floorplans"
      dataTid="pdpFloorplans"
      description={`${totalFloorplans} floorplans and ${unitsAvailable} units available.`}
      expanded
      renderHidable={renderFloorplans}
      theme={theme}
    />
  )
}

PDPFloorplans.propTypes = {
  theme: PropTypes.object,
  totalFloorplans: PropTypes.number.isRequired,
  unitsAvailable: PropTypes.number.isRequired,
}

PDPFloorplans.defaultProps = {
  theme: {},
}

export default themed(/^PDPFloorplans/, { pure: true })(PDPFloorplans)
