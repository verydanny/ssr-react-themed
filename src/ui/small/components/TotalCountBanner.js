import React, { PureComponent } from 'react'
import autobind from 'autobind-decorator'
import { themed } from 'react-themed'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { Icon } from 'ui/shared/components/Icon'
import { filters } from 'ui/shared/components/Icon/svgs/global'
import { Text } from '@rentpath/react-ui-core'

@themed('*', { pure: true })

export default class TotalCountBanner extends PureComponent {

  static propTypes = {
    viewingCount: PropTypes.number.isRequired,
    totalProperties: PropTypes.number.isRequired,
    toggleView: PropTypes.func,
    theme: PropTypes.object,
  }

  static defaultProps = {
    totalProperties: 0,
    viewingCount: 0,
    theme: {},
  }

  @autobind
  handleClick() {
    const { toggleView } = this.props

    if (toggleView) toggleView('filters')
  }

  render() {
    const {
      viewingCount,
      totalProperties,
      theme,
    } = this.props

    return (
      <div className={cn(theme.bannerPosition, theme.listingViewInfo)}>
        <span className={theme.text}>
          Showing {viewingCount} of {totalProperties} properties
        </span>
        <br />
        <div>
          <Text className={theme.filterText} onClick={this.handleClick}>
            Adjust your filters
            <Icon
              svgs={{ filters }}
              className={theme.filterIcon}
              fill={theme.RentBlue}
              width={20}
              height={20}
            />
          </Text>
        </div>
      </div>
    )
  }
}
