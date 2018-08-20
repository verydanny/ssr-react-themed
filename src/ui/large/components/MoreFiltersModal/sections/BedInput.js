import React, { PureComponent } from 'react'
import { themed } from 'react-themed-too'
import autobind from 'autobind-decorator'
import { RadioGroup } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import { getTagItem } from '../config'
// TODO: we are currently using the bedFilterLarge config file,
// but this needs to be refactored later, there should only
// be a single config in refinements for this data.

@themed('*', { pure: true })
export default class BedInput extends PureComponent {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired,
    theme: PropTypes.object,
    filterItems: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  getRadioGroupFields() {
    const { filterItems } = this.props
    return map(field => ({
      label: field.label,
      name: field.name,
      checked: field.active,
      // RadioGroup expects to get a string value only
      value: field.name,
      'data-tag_selection': getTagItem(field.group, field.name),
      'data-tag_item': 'bedrooms',
    }))(filterItems)
  }

  @autobind
  handleChange(event) {
    const { onChange } = this.props

    onChange(get('target.value')(event))
  }

  @autobind
  handleUnselect() {
    const { onUnselect } = this.props

    if (onUnselect) onUnselect()
  }

  render() {
    const { theme, filterItems } = this.props

    const valueString = (filterItems || 0).toString()

    return (
      <div className={theme.BedInput}>
        <RadioGroup
          data-tid="bed-buttons"
          className={theme.MoreFiltersModal_RowButtons}
          name="bedinput"
          fields={this.getRadioGroupFields()}
          hideInputElement
          allowUnselect
          orientation="horizontal"
          onChange={this.handleChange}
          onUnselect={this.handleUnselect}
          value={valueString}
        />
      </div>
    )
  }
}
