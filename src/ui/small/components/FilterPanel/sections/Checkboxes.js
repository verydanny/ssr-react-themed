import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import autobind from 'autobind-decorator'
import { Collapsible } from '@rentpath/react-ui-core'

class Checkboxes extends Component {

  static propTypes = {
    collapsible: PropTypes.object,
    theme: PropTypes.object,
    hiddenText: PropTypes.any,
    visibleText: PropTypes.any,
    onChange: PropTypes.func,
    criteria: PropTypes.object,
  }

  static defaultProps = {
    hiddenText: '',
    visibleText: '',
    onChange: () => {},
    collapsible: {},
    criteria: {},
  }

  @autobind
  handleChange(e) {
    const { name, checked } = e.target

    if (name) this.props.onChange(name, checked)
  }

  listRenderer(item, i) {
    const { name, label } = item
    const { theme, criteria } = this.props
    const checked = !!criteria[name]

    return (
      <label htmlFor={name} key={i} className={theme.Checkboxes_Label}>
        <input
          type="checkbox"
          name={name}
          id={name} // NOTE: using an id here lets you click the label in addition to the input
          checked={checked}
          onChange={this.handleChange}
        />
        <span className={theme['Text-md-semilight']}>
          {label}
        </span>
      </label>
    )
  }

  showRows(title, showableItems) {
    if (!showableItems) return null
    return (
      <div>
        { title && <h4>{title}</h4> }
        <div>
          { showableItems && showableItems.map((item, i) => this.listRenderer(item, i)) }
        </div>
      </div>
    )
  }

  render() {
    return (
      <Collapsible
        showableItems={this.showRows(
          this.props.collapsible.title,
          this.props.collapsible.showableItems,
        )}
        nonshowableItems={this.showRows('', this.props.collapsible.nonshowableItems)}
        hiddenText={this.props.hiddenText}
        visibleText={this.props.visibleText}
        visible={false}
        hideButton={false}
        align="bottom"
      />
    )
  }
}

export default themed('*')(Checkboxes)
