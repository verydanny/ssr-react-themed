import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { Icon } from 'ui/shared/components/Icon'
import equalOpportunity from 'ui/shared/components/Icon/svgs/equalOpportunity.svg'

@themed(/^FooterEqualHousing/, { pure: true })

export default class FooterEqualHousing extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme } = this.props

    return (
      <a
        href="/company/legal/equal/"
        data-tag_item="equal_housing"
        title="Equal Housing Opportunity"
        className={theme.FooterEqualHousing}
      >
        <Icon svgs={{ equalOpportunity }} className={theme.FooterEqualHousing_Icon} />
      </a>
    )
  }
}
