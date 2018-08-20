import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'

@themed(/^FooterApps/, { pure: true })

export default class FooterApps extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme } = this.props

    return (
      <div data-tid="footer-app-links" className={theme.FooterApps}>
        {'Download the Rent.com app for '}
        <a
          href="https://play.google.com/store/apps/details?id=com.rent&referrer=ts%3D96e725f6-e305-11e4-9781-00163cabc4e4"
          target="_blank"
          rel="external noopener noreferrer"
          data-tag_item="android_download_button"
        >Android</a>
        {' and '}
        <a
          href="https://itunes.apple.com/us/app/rent.com-apartments-home-rentals/id388038507?mt=8"
          target="_blank"
          rel="external noopener noreferrer"
          data-tag_item="ios_download_button"
        >iOS</a>.
      </div>
    )
  }
}
