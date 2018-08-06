import PropTypes from 'prop-types'
import React, { Component } from 'react'
import themed from 'react-themed'
import cn from 'classnames'

@themed(/^Dfp/)

export default class DfpContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  static childContextTypes = {
    dfp: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = { ready: false }
  }

  getChildContext() {
    return {
      dfp: {
        setDisplayReady: () => this.setState({ ready: true }),
      },
    }
  }

  render() {
    const { theme } = this.props

    return (
      <div
        data-ads-supported={this.state.ready}
        className={cn({
          [theme.Dfp]: true,
          [theme['Dfp-ready']]: this.state.ready,
        })}
      >
        {this.props.children}
      </div>
    )
  }
}
