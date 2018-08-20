import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import { Icon } from 'ui/shared/components/Icon'
import rentComLogo from 'ui/shared/components/Icon/svgs/rentComLogo.svg'
import { MENU_LINKS } from 'ui/large/components/Header/const'
import withUserData from 'ui/large/components/Header/withUserData'
import HeaderBadge from './components/HeaderBadge'

const HOME_MENU_LINKS = MENU_LINKS.filter(item => item.name !== 'Search')

@themed(/^Header|HomeHeader/)
class HomeHeader extends PureComponent {
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
      <header className={theme.HomeHeader} data-tag_section="header">
        <div className={theme.HomeHeader_Content}>
          <a className={theme.Header_rentComLogoLink} href="/">
            <Icon svgs={{ rentComLogo }} className={theme.Header_rentComLogo} data-tid="rent-logo" />
          </a>
          <div>
            {HOME_MENU_LINKS.map((menu, index) => (
              <a
                key={`menu-${index}`}
                className={theme.Header_Menulink}
                href={menu.link}
                data-tag_item={menu.tag}
              >
                {menu.name}
                {menu.hasBadge && !!numFavorites ? (
                  <HeaderBadge numFavorites={numFavorites} />
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

export default withUserData(HomeHeader)
