import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import map from 'lodash/fp/map'
import FilterToken from './FilterToken'
import ToggleTokenCollapse from './ToggleTokenCollapseButton'

@themed('*')
export default class FilterTokens extends Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    theme: PropTypes.object,
    disableFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
    activeTokenLength: PropTypes.number,
    isShowingAllTokens: PropTypes.bool,
    toggleShowTokens: PropTypes.func.isRequired,
    isFiltersModalOpen: PropTypes.bool,
  }

  static defaultProps = {
    theme: {},
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.isFiltersModalOpen
  }

  render() {
    const {
      activeFilters,
      activeTokenLength,
      clearFilters,
      disableFilter,
      isShowingAllTokens,
      toggleShowTokens,
      theme,
    } = this.props
    return (
      <ul
        data-tag_section="filter_tokens"
        data-tag_item="filter_tokens"
        data-tid="filter-tokens"
        className={theme.Filters_FilterTokens}
      >
        {map(filter => (
          <FilterToken
            filter={filter}
            key={filter.name}
            onRemove={() => disableFilter(filter.group, filter.name, true)}
          />
        ))(activeFilters)}
        <ToggleTokenCollapse
          onSelect={toggleShowTokens}
          activeTokenLength={activeTokenLength}
          isShowingAllTokens={isShowingAllTokens}
        />
        {activeTokenLength > 0 && (
          <li>
            <button
              onClick={() => clearFilters(true)}
              className={theme.Filters_FilterTokenClear}
              data-tid="clear"
            >
              Clear All
            </button>
          </li>
        )}
      </ul>
    )
  }
}
