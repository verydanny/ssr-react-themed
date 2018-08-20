import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import LazyLoad from 'react-lazyload'
import SocialLink from './SocialLink'
import linkConfig from './config'

@themed(/^FooterSocial/, { pure: true })

export default class FooterSocial extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    config: PropTypes.array,
  }

  static defaultProps = {
    theme: {},
    config: linkConfig,
  }

  render() {
    const { theme, config } = this.props

    return (
      <div className={theme.FooterSocial}>
        <LazyLoad
          height={30}
          offset={400}
          once
        >
          <ul>
            {
              config.map((link, index) => (
                <li key={`social-link-${index}`}>
                  <SocialLink
                    iconAlt={link.alt}
                    icon={link.icon}
                    tag={link.tag}
                    href={link.href}
                  />
                </li>
              ))
            }
          </ul>
        </LazyLoad>
      </div>
    )
  }
}
