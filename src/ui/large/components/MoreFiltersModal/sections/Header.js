import React, { PureComponent } from 'react'
import { themed } from 'react-themed'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import numberWithCommas from 'lib/utils/numberWithCommas'

@themed('*', { pure: true })
export default class Header extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func,
    theme: PropTypes.object,
    filterTotal: PropTypes.number,
    total: PropTypes.number,
  }

  static defaultProps = {
    theme: {},
  }

  @autobind
  getPropertyCount() {
    const { filterTotal, total } = this.props
    let count = (filterTotal !== null) ? filterTotal : total
    let propertyCount = '0 Properties Found'

    if (count > 1) {
      count = numberWithCommas(count)
      propertyCount = `${count} Properties Found`
    } else if (count === 1) {
      propertyCount = '1 Property Found'
    }

    return propertyCount
  }

  render() {
    const {
      onClose,
      theme,
    } = this.props

    const propertyCount = this.getPropertyCount()

    return (
      <div className={theme.MoreFiltersModal_Header}>
        <h2
          className={theme.MoreFiltersModal_PropertyCount}
          data-tid="more-filters-props-count"
        >
          {propertyCount}
        </h2>
        <div
          role="button"
          tabIndex={0}
          className={theme.MoreFiltersModal_CloseButton}
          onClick={onClose}
          data-tid="more-filters-close"
          data-tag_item="close"
        >
          Close
        </div>
      </div>
    )
  }
}
