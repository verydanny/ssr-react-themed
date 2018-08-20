import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import Menu from 'ui/small/components/Menu'
import { Icon } from 'ui/shared/components/Icon'
import rentComLogo from 'ui/shared/components/Icon/svgs/rentComLogo.svg'
import menu from 'ui/shared/components/Icon/svgs/menu.svg'

@themed(/^HomeHeader/)
class HomeHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      displayMenu: false,
    }
  }

  @autobind
  toggleMenu() {
    this.setState({
      displayMenu: !this.state.displayMenu,
    })
  }

  render() {
    const { theme } = this.props

    return (
      <div className={theme.HomeHeader} data-tag_section="header">
        <Icon
          svgs={{ rentComLogo }}
          className={theme.HomeHeader_Logo}
          data-tid="rent-logo"
        />
        <Icon
          svgs={{ menu }}
          className={theme.HomeHeader_Hamburger}
          data-tid="menu"
          onClick={this.toggleMenu}
          data-tag_item="open_close_menu"
          data-tag_section="menu"
        />
        <Menu
          className={theme.HomeHeader_MenuTransform}
          display={this.state.displayMenu}
          toggleMenu={this.toggleMenu}
        />
      </div>
    )
  }
}

export default HomeHeader
