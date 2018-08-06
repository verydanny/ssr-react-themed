import React from 'react'
import themed from 'react-themed'
import PropTypes from 'prop-types'
import { Icon } from 'ui/shared/components/Icon'
import { close } from 'ui/shared/components/Icon/svgs/global'

const ToolTip = ({ theme, onClick, children }) => (

  <React.Fragment>
    <div
      role="button"
      tabIndex={0}
      className={theme.ToolTip_Overlay}
      onClick={onClick}
    />
    <div className={theme.ToolTip}>
      <div
        role="button"
        tabIndex={0}
        className={theme.ToolTip_Body}
        onClick={onClick}
      >
        <div
          role="button"
          tabIndex={0}
          className={theme.ToolTip_CloseButton}
          onClick={onClick}
        >
          <Icon svgs={{ close }} />
        </div>
        {children}
      </div>
    </div>
  </React.Fragment>
)

ToolTip.propTypes = {
  theme: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

ToolTip.defaultProps = {
  theme: {},
}

export default themed(/^ToolTip/)(ToolTip)
