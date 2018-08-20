import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import autobind from 'autobind-decorator'
import { Dropdown } from '@rentpath/react-ui-core'
import MenuWrapper from 'ui/large/components/Filters/sections/MenuWrapper'
import FiltersButton from 'ui/large/components/Filters/sections/FiltersButton'
import { sortOptions } from 'config/refinements/sort'

@themed('*')
export default class SortFilter extends Component {
  static propTypes = {
    buttonPrefix: PropTypes.string,
    buttonText: PropTypes.string,
    theme: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    buttonPrefix: 'Sort by: ',
    buttonText: 'Best Match',
    theme: {},
  }

  get options() {
    const { theme, buttonText } = this.props
    const listItems = sortOptions.map(option => (
      <span
        className={(option.label === buttonText) ? theme['SortFilter-selected'] : ''}
        data-tag_item={option.item}
        data-tag_section={option.section}
        data-tag_selection={option.selection}
        key={option.value} value={option.value}
      >
        {option.label}
      </span>
    )
    )
    return listItems
  }

  @autobind
  handleOptionChange(options) {
    sortOptions.map(option => {
      if (option.label === options.props.children) {
        this.props.onChange(option.value)
      }
      return option.value
    })
  }

  render() {
    const {
      theme,
      buttonText,
      buttonPrefix,
    } = this.props

    return (
      <Dropdown
        anchorField={props => (
          <FiltersButton
            {...props}
            buttonPrefix={buttonPrefix}
            buttonText={buttonText}
            className={theme.SortFilters_ChevronDown}
          />
        )}
        className={theme.SortFilters_Text}
        data-tid="sort-filter"
        data-tag_item="sort_dropdown"
      >
        <MenuWrapper
          options={this.options}
          className={theme.SortFilters_Dropdown}
          setButtonText={this.handleOptionChange}
        />
      </Dropdown>
    )
  }
}
