import React, { PureComponent } from 'react'
import { themed } from 'react-themed-too'
import PropTypes from 'prop-types'
import { Text } from '@rentpath/react-ui-core'

@themed(/^ZoomInBanner/, { pure: true })

export default class ZoomInBanner extends PureComponent {

  static propTypes = {
    theme: PropTypes.object,
    text: PropTypes.any,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme, text } = this.props

    return (
      <div className={theme.ZoomInBanner_Container}>
        <Text className={theme.ZoomInBanner_Text}>
          {text}
        </Text>
      </div>
    )
  }
}
