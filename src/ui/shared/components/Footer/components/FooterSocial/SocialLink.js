import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { Icon } from 'ui/shared/components/Icon'
import { facebook, twitter, pinterest, youtube, instagram } from 'ui/shared/components/Icon/svgs/social'

@themed(/^SocialLink/, { pure: true })

export default class SocialLink extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    href: PropTypes.string.isRequired,
    tag: PropTypes.string,
    icon: PropTypes.node.isRequired,
    iconAlt: PropTypes.string.isRequired,
  }

  static defaultProps = {
    theme: {},
    tag: '',
  }

  render() {
    const {
      theme,
      href,
      tag,
      icon,
      iconAlt,
    } = this.props

    return (
      <a
        className={theme.SocialLink}
        href={href}
        title={iconAlt}
        data-tag_item={tag}
        target="_blank"
        rel="external noopener noreferrer"
      >
        <Icon
          svgs={{ facebook, twitter, pinterest, youtube, instagram }}
          name={icon}
          className={theme.SocialLink_Icon}
        />
      </a>
    )
  }
}
