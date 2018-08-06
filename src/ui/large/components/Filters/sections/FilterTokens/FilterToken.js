import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { getFormattedPriceNum } from 'app/selectors/filters'

@themed('*')
export default class FilterToken extends Component {
  static propTypes = {
    filter: PropTypes.object,
    theme: PropTypes.object,
    onRemove: PropTypes.func.isRequired,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const {
      theme,
      onRemove,
      filter,
    } = this.props

    let label = filter.label

    if (filter.name === 'maxPrice') {
      label = `${getFormattedPriceNum(filter.value)} Max`
    }

    if (filter.name === 'minPrice') {
      label = `${getFormattedPriceNum(filter.value)} Min`
    }

    return (
      <li
        data-tag_section="filter_token"
        data-tag_item="filter_token"
        data-tid={`token-${filter.name}`}
        className={theme.Filters_FilterToken}
      >
        <span className={theme.Filters_FilterTokenName}>
          {label}
        </span>
        <button
          onClick={() => onRemove(filter)}
          className={theme.Filters_FilterTokenRemove}
        >
          X
        </button>
      </li>
    )
  }
}
