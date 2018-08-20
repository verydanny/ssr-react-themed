import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import autobind from 'autobind-decorator'
import cn from 'classnames'
import omit from 'lodash/omit'
import bedOptions from 'config/refinements/bedFilterLarge'
import { Dropdown } from '@rentpath/react-ui-core'
import MenuWrapper from './MenuWrapper'
import FiltersButton from './FiltersButton'

@themed('*')
export default class BedFilter extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    theme: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    buttonText: 'Beds',
    theme: {},
  }

  @autobind
  handleOptionChange(options) {
    bedOptions.map(option => {
      if (option.label === options.props.children) {
        this.props.onChange(option.value)
      }
      return option.value
    })
  }

  @autobind
  handleOptionSelection() {
    const { theme, buttonText } = this.props
    const listItems = bedOptions.map(option => (
      <span
        className={
          option.label === buttonText ?
            theme['Filters_DropdownOption-selected'] : ''
        }
        data-tag_selection={option.selection}
      >
        {option.label}
      </span>
    ))
    return listItems
  }

  render() {
    const {
      theme,
      buttonText,
    } = this.props

    return (
      <div
        data-tag_item="filters_bedrooms"
        data-tag_section="quick_filters"
        className={theme.Filters_DropdownWrapper}
      >
        <Dropdown
          anchorField={props => (
            <FiltersButton
              buttonText={buttonText}
              {...omit(props, 'className')}
            />
          )}
          className={cn(theme['Filters_DropdownContainer-beds'], theme.Filters_Text)}
        >
          <MenuWrapper
            options={this.handleOptionSelection()}
            className={cn(theme.Filters_Dropdown, theme['Filters_Dropdown-beds'])}
            setButtonText={this.handleOptionChange}
          />
        </Dropdown>
      </div>
    )
  }
}
