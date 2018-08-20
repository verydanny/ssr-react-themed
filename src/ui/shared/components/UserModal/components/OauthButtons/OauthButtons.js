import React from 'react'
import themed from 'react-themed-too'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Icon } from 'ui/shared/components/Icon'
import facebookOauth from 'ui/shared/components/Icon/svgs/facebookOauth.svg'
import googleOauth from 'ui/shared/components/Icon/svgs/googleOauth.svg'
import LazyLoad from 'react-lazyload'

/**
 * TODO
 * Wire up OAUTH links to route to zutron url
 * Refactor buttons to stack on smaller screens
 * for mobile
 * Handle redirects back to rent
 */
const OauthButtons = ({ theme }) => (
  <div className={theme.Oauth_Container}>
    <a
      className={cn(theme.Oauth_FacebookButton, theme.Oauth_ButtonRaised,
        theme.Oauth_SocialMediaIcons)}
      href="#"
    >
      <LazyLoad height={50} once>
        <Icon svgs={{ facebookOauth }} className={theme.Oauth_Facebook} />
      </LazyLoad>
      <p>
        Sign in with Facebook
      </p>
    </a>
    <a
      className={cn(theme.Oauth_GoogleButton, theme.Oauth_ButtonRaised,
        theme.Oauth_SocialMediaIcons)}
      href="#"
    >
      <LazyLoad height={50} once>
        <Icon svgs={{ googleOauth }} className={cn(theme.Oauth_Googleplus)} />
      </LazyLoad>
      <p>
        Sign in with Google
      </p>
    </a>
  </div>
)

OauthButtons.propTypes = {
  theme: PropTypes.object,
}

OauthButtons.defaultProps = {
  theme: {},
}

export default themed(/^Oauth/, { pure: true })(OauthButtons)
