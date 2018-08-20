import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { COPYRIGHT } from 'app/const'

@themed(/^FooterCopyright/, { pure: true })

export default class FooterCopyright extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme } = this.props

    return (
      <div className={theme.FooterCopyright} data-tid="rentpath-copyright-text">
        {`${COPYRIGHT} `}
        <a href="/company/legal/termsofservice/" data-tag_item="terms_of_service_bottom">Terms of Service</a>
        {' and '}
        <a href="/company/privacy-full/" data-tag_item="privacy_policy_bottom">Privacy Policy</a>.
      </div>
    )
  }
}
