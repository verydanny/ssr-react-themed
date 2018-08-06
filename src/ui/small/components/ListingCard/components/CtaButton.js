import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import cn from 'classnames'

const CtaButton = ({
  contactType,
  link,
  tags,
  onClick,
  variation,
  theme,
  children,
  nodeType: NodeType,
  ...others
}) => (
  <NodeType
    className={cn(
      theme.CtaButton,
      theme[`CtaButton-${contactType}`],
      variation && theme[`CtaButton-${contactType}-${variation}`],
    )}
    href={link}
    onClick={onClick}
    {...tags}
    {...others}
  >
    {children}
  </NodeType>
)

CtaButton.propTypes = {
  contactType: PropTypes.string.isRequired,
  link: PropTypes.string,
  tags: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  variation: PropTypes.string,
  theme: PropTypes.object,
  children: PropTypes.any,
  nodeType: PropTypes.string,
}

CtaButton.defaultProps = {
  theme: {},
  nodeType: 'button',
}

export default themed(/^CtaButton/)(CtaButton)
