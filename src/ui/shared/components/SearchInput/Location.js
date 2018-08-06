import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Location extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  displayName({ displayName, highlightStart, highlightEnd }) {
    if (highlightStart >= 0) {
      return (
        <span>
          {displayName.slice(0, highlightStart)}
          <b>{displayName.slice(highlightStart, highlightEnd)}</b>
          {displayName.slice(highlightEnd)}
        </span>
      )
    }
    return <span>{displayName}</span>
  }

  render() {
    const {
      location,
      ...props
    } = this.props

    return (
      <div data-tid="search-location-suggestion" {...props}>
        {this.displayName(location)}
      </div>
    )
  }
}
