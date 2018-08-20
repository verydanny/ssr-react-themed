import React, { PureComponent } from 'react'
import { themed } from 'react-themed-too'
import cns from 'classnames'
import PropTypes from 'prop-types'

@themed(/^Icon/, { pure: true })
class Icon extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    theme: PropTypes.object,
    svgs: PropTypes.object.isRequired,
  }

  static defaultProps = {
    theme: {},
    svgs: {},
  }

  render() {
    const {
      name,
      className,
      theme,
      svgs,
      ...props
    } = this.props

    const svgKeys = Object.keys(svgs)
    const singleIcon = svgKeys.length === 1
    const svgName = singleIcon ? svgKeys[0] : name
    const Svg = svgs[svgName]

    if (!Svg) return null

    return (
      <span className={cns(className, theme.Icon)} {...props}>
        <Svg {...props} />
      </span>
    )
  }
}

export default Icon
