import React, { Component } from 'react'
import ListView from 'ui/large/components/ListView'
import MapView from 'ui/large/components/MapView'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'

@themed('*')
export default class HybridMap extends Component {

  static propTypes = {
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme } = this.props
    return (
      <div className={theme.HybridMap}>
        <ListView />
        <MapView />
      </div>
    )
  }
}
