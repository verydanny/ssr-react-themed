import React from 'react'
import themed from 'react-themed'
import PropTypes from 'prop-types'

const SignInButton = props => {
  const {
    theme,
    featureActive,
    isLoggedIn,
    signOut,
    signIn,
  } = props

  const handleClick = () => {
    if (isLoggedIn) signOut()
    signIn()
  }

  return !featureActive
    ? null
    : (
      <button
        className={theme.Header_Signin}
        data-tag_item="sign_in"
        data-tid="sign_in-sign_out"
        onClick={handleClick}
      >
        {isLoggedIn ? 'Sign Out' : 'Sign In'}
      </button>
    )
}

SignInButton.propTypes = {
  theme: PropTypes.object.isRequired,
  featureActive: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
}

SignInButton.defaultProps = {
  theme: {},
  featureActive: false,
  isLoggedIn: false,
  signIn: () => {}, // Remove when wired up
  signOut: () => {}, // Remove when wired up
}

export default themed(/^Header/)(SignInButton)
