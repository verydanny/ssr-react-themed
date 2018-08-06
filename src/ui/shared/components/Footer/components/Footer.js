import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import FooterLogo from './FooterLogo'
import FooterLinks from './FooterLinks'
import FooterSocial from './FooterSocial'
import FooterCopyright from './FooterCopyright'
import FooterEqualHousing from './FooterEqualHousing'
import FooterApps from './FooterApps'

@themed(/^Footer/, { pure: true })

export default class Footer extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    withAccordionLinks: PropTypes.bool,
  }

  static defaultProps = {
    theme: {},
    withAccordionLinks: false,
  }

  render() {
    const { theme, withAccordionLinks } = this.props

    return (
      <footer className={theme.Footer} data-tag_section="footer">
        <div className={theme.Footer_Content}>
          <FooterLogo />
          <FooterLinks isAccordion={withAccordionLinks} />
          <FooterSocial />
          <FooterApps />
        </div>
        <div className={theme.Footer_Closing}>
          <div className={theme.Footer_ClosingContent}>
            <FooterCopyright />
            <FooterEqualHousing />
          </div>
        </div>
      </footer>
    )
  }
}
