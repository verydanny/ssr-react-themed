import React, { PureComponent } from 'react'
import themed from 'react-themed-too'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import cn from 'classnames'
import truncateString from 'lib/utils/truncateString'

export const BUTTON_TEXT_EXPAND = 'Read more +'
export const BUTTON_TEXT_COLLAPSE = 'Read less'

@themed(/^ReadMoreText/, { pure: true })
export default class ReadMoreText extends PureComponent {

  static propTypes = {
    count: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    theme: PropTypes.object,
    triggerCount: PropTypes.number,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)
    this.state = { collapsed: true }
  }

  get triggerCount() {
    const { count, triggerCount } = this.props
    return triggerCount || count
  }

  get buttonText() {
    return this.state.collapsed ? BUTTON_TEXT_EXPAND : BUTTON_TEXT_COLLAPSE
  }

  get text() {
    const { count, text } = this.props

    if (this.shouldTruncate() && this.state.collapsed) {
      // Need a span here to support the HTML entity
      return <span>{truncateString(text, count)}&hellip;</span>
    }

    return text
  }

  shouldTruncate() {
    const { text } = this.props
    return (text.length > this.triggerCount)
  }

  @autobind
  handleClick() {
    this.setState(oldState => ({
      collapsed: !oldState.collapsed,
    }))
  }

  render() {
    const { theme } = this.props
    const shouldTruncate = this.shouldTruncate()
    const classNames = cn(
      theme.ReadMoreText,
      shouldTruncate && this.state.collapsed && theme['ReadMoreText-collapsed']
    )

    return (
      <div className={classNames} data-tid="read-more">
        <div className={theme.ReadMoreText_Text} data-tid="read-more-text">
          {this.text}
        </div>

        { shouldTruncate &&
          <div className={theme.ReadMoreText_Controls}>
            <button onClick={this.handleClick}>
              {this.buttonText}
            </button>
          </div>
        }

      </div>
    )
  }
}
