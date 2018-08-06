import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { FilterPanel } from 'ui/small/components/FilterPanel'

@themed(['Filters'])

export default class FiltersView extends Component {

  static propTypes = {
    hidden: PropTypes.bool,
    previousView: PropTypes.string,
    filterCriteria: PropTypes.object,
    total: PropTypes.number,
    toggleView: PropTypes.func,
    theme: PropTypes.object,
    updateFilterCriteria: PropTypes.func,
    resetFilterCriteria: PropTypes.func,
    filterTotal: PropTypes.number,
    submitUrl: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const {
      hidden,
      previousView,
      toggleView,
      theme,
      updateFilterCriteria,
      resetFilterCriteria,
      total,
      filterTotal,
      filterCriteria,
      submitUrl,
    } = this.props

    return (
      <div
        hidden={hidden}
        data-tid="filters-container"
        className={theme.Filters}
      >
        <FilterPanel
          previousView={previousView}
          toggleView={toggleView}
          updateFilterCriteria={updateFilterCriteria}
          resetFilterCriteria={resetFilterCriteria}
          filterCriteria={filterCriteria}
          total={total}
          filterTotal={filterTotal}
          submitUrl={submitUrl}
        />
      </div>
    )
  }
}
