import React, { Component } from 'react'
import cn from 'classnames'
import { themed } from 'react-themed'
import PropTypes from 'prop-types'
import { Icon } from 'ui/shared/components/Icon'
import { chevronDown } from 'ui/shared/components/Icon/svgs/global'

@themed('*')
export default class MoreFilters extends Component {
  static propTypes = {
    theme: PropTypes.object,
    openModal: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  openMoreFiltersModal = () => {
    const { openModal } = this.props

    if (openModal) openModal()
  }

  render() {
    const { theme } = this.props
    const label = 'More filters'
    return (
      <div
        className={cn(
          theme['Filters_ModalContainer-morefilters'],
          theme.Filters_Text,
          theme.Filters_TextLabel
        )}
        data-tag_item="filters"
        data-tag_section="more_filters"
        role="presentation"
        onClick={this.openMoreFiltersModal}
        data-tid="more-filters"
      >
        <div className={theme['Filters_Text-morefilters']}>
          { label }
        </div>
        <Icon svgs={{ chevronDown }} className={cn(theme.Filters_ChevronDown, theme['Filters_ChevronDown-morefilters'])} />
      </div>
    )
  }
}
