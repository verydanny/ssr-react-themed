import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed'
import classnames from 'classnames'
import { Icon } from 'ui/shared/components/Icon'
import add from 'ui/shared/components/Icon/svgs/add.svg'
import subtract from 'ui/shared/components/Icon/svgs/subtract.svg'

class CounterIcon extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    theme: PropTypes.object,
  }

  static defaultProps = {
    name: 'add',
  }

  render() {
    const {
      disabled,
      className,
      theme,
      name,
    } = this.props

    return (
      <Icon
        svgs={{ add, subtract }}
        className={
          classnames(
            theme.Counter_ButtonIcon,
            disabled && theme['Counter_ButtonIcon-disabled'],
            className
          )
        }
        name={name}
        fill="white"
      />
    )
  }
}

export default themed(/^Counter/)(CounterIcon)
