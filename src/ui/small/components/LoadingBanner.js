import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import Spinner from 'ui/shared/components/Spinner'

@themed(/^LoadingBanner/, { pure: true })
export default class LoadingBanner extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme } = this.props

    return (
      <div data-tid="loading-banner" className={theme.LoadingBanner}>
        <Spinner className={theme.LoadingBanner_Spinner} />
        <span className={theme.LoadingBanner_Text}>Loading properties...</span>
      </div>
    )
  }
}
