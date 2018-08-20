import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import themed from 'react-themed-too'
import { Icon } from 'ui/shared/components/Icon'
import { chevronUp, chevronDown } from 'ui/shared/components/Icon/svgs/global'
import { RentBlue } from 'ui/shared/themes/colors'

@themed(/^CollapsibleSection/)

export default class CollapsibleSection extends Component {
  static propTypes = {
    header: PropTypes.string,
    headerTagItem: PropTypes.string,
    isOpen: PropTypes.bool,
    testId: PropTypes.string,
    theme: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    headerTagItem: 'header',
    isOpen: false,
    testId: 'collapsible-section',
    theme: {},
  }

  constructor(props) {
    super(props)
    this.state = { isOpen: props.isOpen }
  }

  @autobind
  toggleVisibility() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const {
      header,
      headerTagItem,
      testId,
      theme,
      children,
    } = this.props
    const { isOpen } = this.state
    const state = isOpen ? 'open' : 'closed'
    const chevronDirection = isOpen ? 'Up' : 'Down'

    return (
      <div
        className={theme.CollapsibleSection}
        data-tid={testId}
      >
        <h2
          className={theme.CollapsibleSection_Header}
          data-tag_item={headerTagItem}
        >
          <button className={theme.CollapsibleSection_Button} onClick={this.toggleVisibility}>
            <Icon
              svgs={{ chevronUp, chevronDown }}
              name={`chevron${chevronDirection}`}
              className={theme[`CollapsibleSection_Chevron${chevronDirection}`]}
              fill={RentBlue}
            />
            {header}
          </button>
        </h2>
        <div className={theme[`CollapsibleSection-${state}`]}>
          {children}
        </div>
      </div>
    )
  }
}
