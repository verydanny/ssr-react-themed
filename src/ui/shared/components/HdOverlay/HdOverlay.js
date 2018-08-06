import React from 'react'
import themed from 'react-themed'
import PropTypes from 'prop-types'

const HdOverlay = ({ theme }) => (
  <div
    data-tid="3dTour"
    className={theme.HdOverlay}
  >
    <span>3D</span> Tour
  </div>
)

HdOverlay.propTypes = {
  theme: PropTypes.object,
}

HdOverlay.defaultProps = {
  theme: {},
}

export default themed(/^HdOverlay/)(HdOverlay)
