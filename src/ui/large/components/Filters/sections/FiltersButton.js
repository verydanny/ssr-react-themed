import React, { PureComponent } from 'react'
import themed from 'react-themed-too'
import cn from 'classnames'
import { Button } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'
import { Icon } from 'ui/shared/components/Icon'
import { chevronDown } from 'ui/shared/components/Icon/svgs/global'

@themed('*', { pure: true })

export default class FiltersButton extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    theme: PropTypes.object,
    buttonText: PropTypes.string,
    buttonPrefix: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    themed: {},
    buttonText: '',
    buttonPrefix: '',
  }

  render() {
    const { theme, className, visible, buttonText, buttonPrefix, ...props } = this.props

    return (
      <Button
        className={theme[`Filters_Button-${visible ? 'expand' : 'collapse'}`]}
        {...props}
      >
        <span className={theme.FiltersButton_ButtonPrefix}>
          {buttonPrefix}
        </span>
        <span className={theme.FiltersButton_ButtonText}>
          {buttonText}
        </span>
        <Icon svgs={{ chevronDown }} className={cn(theme.Filters_ChevronDown, className)} />
      </Button>
    )
  }
}
