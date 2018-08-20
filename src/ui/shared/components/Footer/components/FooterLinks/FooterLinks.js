import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import linkConfig from './config'
import FooterLinksSection from './FooterLinksSection'

@themed(/^FooterLinks/, { pure: true })

export default class FooterLinks extends PureComponent {
  static propTypes = {
    config: PropTypes.array,
    isAccordion: PropTypes.bool,
    theme: PropTypes.object,
  }

  static defaultProps = {
    config: linkConfig,
    isAccordion: false,
    theme: {},
  }

  render() {
    const {
      config,
      isAccordion,
      theme,
    } = this.props

    return (
      <div className={theme.FooterLinks}>
        {config.map((section, index) => (
          <FooterLinksSection
            key={`footer-link-section-${index}`}
            heading={section.heading}
            testId={section.testId}
            links={section.links}
            isAccordion={isAccordion}
          />
        ))}
      </div>
    )
  }
}
