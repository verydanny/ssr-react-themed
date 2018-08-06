import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import { chevronUp, chevronDown } from 'ui/shared/components/Icon/svgs/global'
import { themed } from 'react-themed'
import autobind from 'autobind-decorator'
import cn from 'classnames'

class PDPSection extends PureComponent {
  static propTypes = {
    category: PropTypes.string.isRequired,
    dataTid: PropTypes.string,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    expanded: PropTypes.bool.isRequired,
    renderHidable: PropTypes.func.isRequired,
    theme: PropTypes.object,
  }

  static defaultProps = {
    dataTid: 'pdpSection',
    expanded: false,
    theme: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: props.expanded,
    }
  }

  get buttonClass() {
    const { expanded } = this.state
    const { theme } = this.props

    return cn(
      theme.PDPSection_Button,
      { [theme['PDPSection_Button-expanded']]: expanded },
    )
  }

  get buttonIcon() {
    const { expanded } = this.state

    return expanded ? 'chevronUp' : 'chevronDown'
  }

  get containerClass() {
    const { expanded } = this.state
    const { theme } = this.props

    return cn(
      theme.PDPSection,
      { [theme['PDPSection-expanded']]: expanded },
    )
  }

  @autobind
  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { expanded } = this.state
    const {
      category,
      description,
      dataTid,
      renderHidable,
      theme,
    } = this.props

    return (
      <section data-tid={dataTid}>
        <div
          role="Button"
          tabIndex={0}
          data-tid={`${dataTid}_Container`}
          className={this.containerClass}
          onClick={this.handleExpandClick}
        >
          <div className={theme.PDPSection_Header}>
            <h2 data-tid={`${dataTid}_Header`}>{category}</h2>
            <Button
              className={this.buttonClass}
              data-tid={`${dataTid}_Button`}
            >
              <Icon
                svgs={{ chevronUp, chevronDown }}
                name={this.buttonIcon}
                className={theme.PDPSection_Collapsible}
              />
            </Button>
          </div>
          <div>
            <span data-tid={`${dataTid}_Description`}>{description}</span>
          </div>
        </div>
        <div className={theme.PDPSection_Hidable}>
          {renderHidable({ expanded })}
        </div>
      </section>
    )
  }
}

export default themed(/^PDPSection/, { pure: true })(PDPSection)
