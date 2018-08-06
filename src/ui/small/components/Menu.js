import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import cn from 'classnames'
import autobind from 'autobind-decorator'

@themed('*')
export default class Menu extends Component {
  static propTypes = {
    theme: PropTypes.object,
    display: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
    display: false,
  }

  componentDidUpdate() {
    const { display, theme } = this.props
    document.body.classList[display ? 'add' : 'remove'](theme.Body_NoScroll)
  }

  @autobind
  handleClick() {
    const { toggleMenu } = this.props

    if (toggleMenu) toggleMenu()
  }

  render() {
    const { theme, display, className } = this.props

    return (
      <div
        onClick={this.handleClick}
        className={cn(
          { [theme.menuTransformBase]: true },
          { [theme.hideTransform]: !display },
          { [theme.showTransform]: display },
          className,
        )}
        data-tid="mobile-menu"
        role="presentation"
      >
        <div className={theme.Menu}>
          <a
            className={theme.Menu_Item}
            href="/"
            data-tid="home-link"
            data-tag_item="home"
          >
            Home
          </a>
          <a
            className={theme.Menu_Item}
            href="/account/myrent/"
            data-tag_item="my_rent"
          >
            My Rent
          </a>
          <a
            className={theme.Menu_Item}
            href="/moving-center/"
            data-tag_item="moving_center"
          >
            Moving Center
          </a>
          <a
            className={theme.Menu_Item}
            href="/manage"
            data-tag_item="list_a_property"
          >
            List a property
          </a>
          <a className={theme.Menu_Item} href="/blog/" data-tag_item="blog">
            Blog
          </a>
        </div>
      </div>
    )
  }
}
