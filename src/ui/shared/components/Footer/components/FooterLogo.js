import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { Icon } from 'ui/shared/components/Icon'
import rentComLogo from 'ui/shared/components/Icon/svgs/rentComLogo.svg'

@themed(/^FooterLogo/, { pure: true })

export default class FooterLogo extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme } = this.props

    return (
      <div
        className={theme.FooterLogo}
        data-tid="rent-logo-footer"
      >
        <a href="/">
          <Icon
            svgs={{ rentComLogo }}
            alt="rent.com"
            data-tag_item="rent_logo"
          />
        </a>
      </div>
    )
  }
}
