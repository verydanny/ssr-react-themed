import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import cn from 'classnames'

@themed(/^LoadingCard/, { pure: true })

export default class EmptyListingCard extends PureComponent {

  static propTypes = {
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const {
      theme,
    } = this.props

    return (
      <div
        className={cn(theme.LoadingCard)}
      >
        <div className={theme.LoadingCard_Gallery} />
        <div className={theme.LoadingCard_Price} />
        <div className={theme.LoadingCard_Property} />
        <div className={theme.LoadingCard_BedBath} />
        <div className={theme.LoadingCard_Units} />
        <div className={theme.LoadingCard_Updated} />
        <div className={theme.LoadingCard_Separator} />
        <div className={theme.LoadingCard_ContactProperty} />
        <div className={theme.LoadingCard_Phone} />
      </div>
    )
  }
}
