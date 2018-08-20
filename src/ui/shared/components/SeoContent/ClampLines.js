import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import autobind from 'autobind-decorator'
import themed from 'react-themed-too'

@themed(/^ClampLines/)

export default class ClampLines extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    lineCount: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    lessLinkText: PropTypes.string,
    moreLinkText: PropTypes.string,
    theme: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    isOpen: false,
    lessLinkText: 'Less',
    moreLinkText: 'More',
    theme: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.isOpen,
      showLink: false,
    }
  }

  componentDidMount() {
    this.setShowLink()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.setState({ showLink: false })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.setShowLink()
    }
  }

  setShowLink() {
    if (!this.containerRef) return

    const {
      lineHeight,
      lineCount,
    } = this.props

    const maxHeight = lineHeight * lineCount

    if (this.containerRef.offsetHeight > maxHeight) {
      this.setState({ showLink: true })
    }
  }

  get styleHeight() {
    const {
      lineHeight,
      lineCount,
    } = this.props
    const {
      showLink,
      isOpen,
    } = this.state

    if (!showLink || isOpen) return null

    return {
      height: `${(lineHeight * lineCount)}px`,
      overflow: 'hidden',
    }
  }

  @autobind
  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  renderLink() {
    const {
      lessLinkText,
      moreLinkText,
      theme,
    } = this.props
    const { isOpen } = this.state

    const text = isOpen ? lessLinkText : moreLinkText
    const buttonClass = isOpen ? 'less' : 'more'

    return (
      <button
        key="clampLines-button"
        className={cn(theme.ClampLines_Button, theme[`ClampLines_Button-${buttonClass}`])}
        onClick={this.toggleOpen}
      >
        {text}
      </button>
    )
  }

  render() {
    const {
      children,
      theme,
    } = this.props
    const { showLink } = this.state

    return [
      <div
        className={theme.ClampLines}
        style={this.styleHeight}
        key="clampLines-container"
        ref={ref => { this.containerRef = ref }}
      >
        {children}
      </div>,
      showLink ? this.renderLink() : null,
    ]
  }
}
