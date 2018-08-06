import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Button } from '@rentpath/react-ui-core'
import ButtonRaisedTheme from 'ui/shared/pages/StyleGuide/Buttons.css'

export default class ButtonRaised extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    text: PropTypes.string,
  }
  static defaultProps = {
    text: 'default',
  }

  render() {
    const {
      text,
      theme,
      ...props
    } = this.props
    return (
      <Button className={cn(ButtonRaisedTheme.ButtonRaised, theme)} {...props}>{text}</Button>
    )
  }
}
