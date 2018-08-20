import React, { PureComponent } from 'react'
import { themed } from 'react-themed-too'
import autobind from 'autobind-decorator'
import { RadioGroup } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import { getTagItem } from '../config'

@themed('*', { pure: true })
export default class PetInput extends PureComponent {

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
      value: field.name,
      'data-tag_item': getTagItem(field.group, field.name),
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
      <div className={theme.PetInput}>
        <RadioGroup
          data-tid="pet-buttons"
          className={theme.MoreFiltersModal_RowButtons}
          name="petinput"
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
