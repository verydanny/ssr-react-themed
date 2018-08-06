import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { FILTER_TOKEN_CLOSED_NUM } from 'app/selectors/filters'

@themed('*')
export default class ToggleFilters extends Component {
  static propTypes = {
    theme: PropTypes.object,
    activeTokenLength: PropTypes.number,
    isShowingAllTokens: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const {
      theme,
      onSelect,
      activeTokenLength,
      isShowingAllTokens,
    } = this.props

    if (activeTokenLength <= FILTER_TOKEN_CLOSED_NUM) {
      return null
    }

    const label = isShowingAllTokens ?
      'Less' :
      `+${activeTokenLength - FILTER_TOKEN_CLOSED_NUM} more`

    return (
      <li>
        <button
          onClick={onSelect}
          className={theme.Filters_FilterTokenViewMore}
          data-tid="toggle"
        >
          {label}
        </button>
      </li>
    )
  }
}
