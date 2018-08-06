import React, { PureComponent } from 'react'
import { themed } from 'react-themed'
import { ToggleButton } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'
import map from 'lodash/fp/map'
import { getTagItem } from '../config'

@themed('*', { pure: true })
export default class ToggleButtons extends PureComponent {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    theme: PropTypes.object,
    items: PropTypes.object,
    onUnselect: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  /**
   * Generate a unique click handler for a particular button.
   * The click handler will call the main onChange callback to pass
   * both the name of the button and the new value.
   * @param  {String} name The name of the button that was clicked.
   * @return {Function} Function that will call the onChange handler,
   * passing the name as well as the value.
   */
  getClickHandler(group, name) {
    const handlerForName = val => {
      const { onChange, onUnselect } = this.props

      if (onChange && val) {
        onChange(group, name)
      } else if (onUnselect) {
        onUnselect(group, name)
      }
    }

    return handlerForName
  }

  renderToggleButton(field) {
    const value = field.active

    return (
      <ToggleButton
        key={field.name}
        value={value}
        onClick={this.getClickHandler(field.group, field.name)}
        data-tid={field.name}
        data-tag_item={getTagItem(field.group, field.name)}
      >
        {field.label}
      </ToggleButton>
    )
  }

  render() {
    const { items, theme } = this.props

    return (
      <div className={theme.MoreFiltersModal_RowButtons} data-tid="toggle-buttons">
        {map(field => this.renderToggleButton(field))(items)}
      </div>
    )
  }
}
