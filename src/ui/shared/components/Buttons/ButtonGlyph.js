import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Button } from '@rentpath/react-ui-core'
import Icon from 'ui/shared/components/Icon/Icon'
import buttonTheme from 'ui/shared/themes/Button.css'

export default class ButtonGlyph extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    theme: PropTypes.object,
    text: PropTypes.string,
    styles: PropTypes.string,
    styleText: PropTypes.string,
  }

  render() {
    const {
      name,
      text,
      theme,
      styles,
      styleText,
      ...props
    } = this.props
    return (
      <Button className={cn(buttonTheme.ButtonGlyph, theme)} {...props}>
        <Icon name={name} className={styles} />
        <span className={styleText}>{text}</span>
      </Button>
    )
  }
}
