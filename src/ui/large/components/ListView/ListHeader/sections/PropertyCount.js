import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LIST_SKELETON } from 'app/store/types'
import { themed } from 'react-themed'
import { Text } from '@rentpath/react-ui-core'

@themed('*')
export default class PropertyCount extends Component {

  static propTypes = {
    theme: PropTypes.object,
    total: PropTypes.number,
    loading: PropTypes.any,
    loadingOptions: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  get propertyCount() {
    const { total, loading, loadingOptions } = this.props

    if (total === 1) {
      return '1 Property'
    } else if (loading &&
    loadingOptions &&
    loadingOptions.skeleton !== LIST_SKELETON) {
      return 'Loading Properties...'
    }
    return `${total} Properties`
  }

  render() {
    const { theme } = this.props

    return (
      <Text className={theme.List_PropertyCount_Text} data-tid="property-count">
        {this.propertyCount}
      </Text>
    )
  }
}
