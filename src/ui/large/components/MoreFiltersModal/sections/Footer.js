import React, { PureComponent } from 'react'
import { themed } from 'react-themed-too'
import autobind from 'autobind-decorator'
import { Link } from '@rentpath/react-redux-router'
import PropTypes from 'prop-types'
import numberWithCommas from 'lib/utils/numberWithCommas'

@themed('*', { pure: true })
export default class Footer extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    theme: PropTypes.object,
    filterTotal: PropTypes.number,
    submitUrl: PropTypes.string,
    total: PropTypes.number,
    restoreFilters: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  }

  static defaultProps = {
    theme: {},
    submitUrl: '',
  }

  @autobind
  getShowPropertyButton() {
    const { filterTotal, total } = this.props

    let count = (filterTotal !== null) ? filterTotal : total
    let propertyCount = 'Show 0 Properties'

    if (count > 1) {
      count = numberWithCommas(count)
      propertyCount = `Show ${count} Properties`
    } else if (count === 1) {
      propertyCount = 'Show 1 Property'
    }

    return propertyCount
  }

  @autobind
  handleSubmit(e) {
    const {
      submitUrl,
      onClose,
    } = this.props

    if (!submitUrl) {
      e.preventDefault()
    }

    if (onClose) {
      onClose()
    }
  }

  @autobind
  handleCancel() {
    const {
      onClose,
      restoreFilters,
    } = this.props
    restoreFilters()
    onClose()
  }

  render() {
    const {
      submitUrl,
      theme,
      clearFilters,
    } = this.props

    const showPropertyButton = this.getShowPropertyButton()

    return (
      <div className={theme.MoreFiltersModal_Footer}>
        <button
          className={theme.MoreFiltersModal_ResetAll}
          onClick={clearFilters}
        >
          <span
            data-tid="more-filters-reset-all"
            data-tag_item="reset_all"
          >
            Reset All
          </span>
        </button>
        <div className={theme.MoreFiltersModal_FooterButtons}>
          <button
            className={theme.MoreFiltersModal_Cancel}
            onClick={this.handleCancel}
          >
            <span
              data-tid="more-filters-cancel"
              data-tag_item="close"
            >
              Cancel
            </span>
          </button>
          <Link
            className={theme.MoreFiltersModal_ShowProps}
            onClick={this.handleSubmit}
            to={submitUrl}
            data-tid="more-filters-submit-link"
          >
            <span
              data-tid="more-filters-show-props"
              data-tag_item="show_properties_button"
            >
              {showPropertyButton}
            </span>
          </Link>
        </div>
      </div>
    )
  }
}
