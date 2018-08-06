import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { Icon } from 'ui/shared/components/Icon'
import { checkInCircle } from 'ui/shared/components/Icon/svgs/global'
import cn from 'classnames'

const validatedField = Component => {
  const ValidatedField = ({ theme, validation, validationMessage, className, ...props }) => (
    <div className={cn(theme.ValidatedField, className)}>
      <Component
        theme={theme} {...props}
        variant={validation}
      />
      {validation === 'valid' && <Icon svgs={{ checkInCircle }} className={theme.ValidatedField_CheckMarkIcon} />}
      {validationMessage && <div className={theme.ValidatedField_Message}>{validationMessage}</div>}
    </div>
  )

  ValidatedField.propTypes = {
    theme: PropTypes.object,
    validation: PropTypes.oneOf(['valid', 'invalid']),
    validationMessage: PropTypes.string,
    className: PropTypes.string,
  }

  ValidatedField.defaultProps = {
    className: null,
  }

  return themed(/^ValidatedField/)(ValidatedField)
}

export default validatedField
