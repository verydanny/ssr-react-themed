import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import SortFilter from './sections/SortFilter'
import PropertyCount from './sections/PropertyCount'

@themed('*')
export default class ListHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    total: PropTypes.number,
    currentSort: PropTypes.object,
    onSortChange: PropTypes.func,
    loading: PropTypes.any,
    loadingOptions: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const {
      theme,
      total,
      loading,
      loadingOptions,
      currentSort,
      onSortChange,
    } = this.props

    return (
      <div className={theme.ListHeader} >
        <PropertyCount
          total={total}
          loading={loading}
          loadingOptions={loadingOptions}
        />
        <SortFilter
          onChange={onSortChange}
          buttonText={currentSort.label}
        />
      </div>
    )
  }
}
