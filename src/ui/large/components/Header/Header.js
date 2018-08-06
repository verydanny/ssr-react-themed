import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed'
import { Icon } from 'ui/shared/components/Icon'
import rentComLogo from 'ui/shared/components/Icon/svgs/rentComLogo.svg'
import { MENU_LINKS } from 'ui/large/components/Header/const'
import withUserData from 'ui/large/components/Header/withUserData'
import HeaderBadge from './components/HeaderBadge'

@themed(/^Header/)
class Header extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    favorites: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme, favorites } = this.props
    const numFavorites = Object.keys(favorites).length

    return (
      <header className={theme.Header}>
        <div className={theme.Header_Menu}>
          <div className={theme.Header_Menulinks} data-tag_section="header">
            <a className={theme.Header_rentComLogoLink} href="/">
              <Icon svgs={{ rentComLogo }} className={theme.Header_rentComLogo} data-tid="rent-logo" />
            </a>
            {MENU_LINKS.map((menu, index) => (
              <a
                key={`menu-${index}`}
                className={theme.Header_Menulink}
                href={menu.link}
                data-tag_item={menu.tag}
              >
                {menu.name}
                {menu.hasBadge && !!numFavorites ? (
                  <HeaderBadge
                    numFavorites={numFavorites}
                  />
                ) : null}
              </a>
            ))}
          </div>
          {/*
          // TODO: restore Sign In logic when stories are ready
          <div className={theme.Button_Signin} data-tag_item="sign_in">
            Sign In
          </div>
            */}
        </div>
      </header>
    )
  }
}

export default withUserData(Header)
