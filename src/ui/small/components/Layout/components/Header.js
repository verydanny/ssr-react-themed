import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import Menu from 'ui/small/components/Menu'
import autobind from 'autobind-decorator'
import { container as SearchInput } from 'ui/shared/components/SearchInput'
import { Icon } from 'ui/shared/components/Icon'
import rentComLogo from 'ui/shared/components/Icon/svgs/rentComLogo.svg'
import { chevronUp, chevronDown } from 'ui/shared/components/Icon/svgs/global'
import { RentBlue } from 'ui/shared/themes/colors'

@themed(/^Header/)
export default class Header extends Component {
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
  closeOutMenu() {
    this.setState({ displayMenu: false })
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
      <div className={theme.Header} data-tag_section="header">
        <div
          className={theme.Header_Menu}
          data-tag_item="open_close_menu"
          data-tag_section="menu"
        >
          <div
            role="presentation"
            onClick={this.toggleMenu}
            className={theme.Header_MenuWrapper}
          >
            <Icon
              svgs={{ rentComLogo }}
              className={theme.Header_MenuLogo}
              data-tid="rent-logo"
            />
            <Icon
              svgs={{ chevronUp, chevronDown }}
              className={theme.Header_MenuChevron}
              name={this.state.displayMenu ? 'chevronUp' : 'chevronDown'}
              fill={RentBlue}
            />
          </div>
        </div>

        <SearchInput onFocus={this.closeOutMenu} />

        <Menu display={this.state.displayMenu} toggleMenu={this.toggleMenu} />
      </div>
    )
  }
}
