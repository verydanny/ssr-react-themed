import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { Text } from '@rentpath/react-ui-core'
import cn from 'classnames'

@themed('*')

export default class EmptyListingCard extends Component {

  static propTypes = {
    viewType: PropTypes.string,
    theme: PropTypes.object,
    toggleView: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  @autobind
  handleClick() {
    const { toggleView } = this.props

    if (toggleView) toggleView('filters')
  }

  render() {
    const {
      viewType,
      theme,
    } = this.props

    return (
      <div className={cn(theme[`ListingCard-${viewType}`], theme.EmptyCard)}>
        <div className={theme.EmptyCardLine1}>
          Sorry!
        </div>
        <div className={theme.EmptyCardLine2}>
          {"We don't have any properties in this area."}
        </div>
        <Text
          className={theme.EmptyCardfilterLink}
          onClick={this.handleClick}
        >
          Try adjusting your filters
        </Text>
      </div>
    )
  }
}
