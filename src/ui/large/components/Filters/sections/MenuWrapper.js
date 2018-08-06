import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from '@rentpath/react-ui-core'

const MenuWrapper = props => {
  const handleSelection = value => {
    props.setButtonText(value)
    props.onSelect()
  }

  const { setButtonText, ...safeProps } = props

  return (
    <Menu
      onItemSelect={handleSelection}
      {...safeProps}
    />
  )
}

MenuWrapper.propTypes = {
  onSelect: PropTypes.func,
  setButtonText: PropTypes.func,
}

export default MenuWrapper
