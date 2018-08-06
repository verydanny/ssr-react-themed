import React from 'react'
import { shallow } from 'enzyme'
import SignInButtonThemed from '../signInButton'

const SignInButton = SignInButtonThemed.WrappedComponent

const theme = {
  Button_Signin: 'themedclass1',
}

const props = {
  theme,
  isLoggedIn: false,
  featureActive: true,
  signIn: jest.fn(),
  signOut: jest.fn(),
}

const signInText = 'Sign In'

const signOutText = 'Sign Out'

describe('SigninButton', () => {
  describe('when user is logged out', () => {
    const wrapper = shallow(<SignInButton {...props} />)
    wrapper.find('button[data-tid="sign_in-sign_out"]').simulate('click')

    it('sets data-tag_item', () => {
      const selection = wrapper.find('button[data-tag_item="sign_in"]')
      expect(selection.length).toBe(1)
    })

    it('displays Sign In text', () => {
      expect(wrapper.text()).toBe(signInText)
    })

    it('calls the signIn handler', () => {
      expect(props.signIn).toBeCalled()
    })
  })

  describe('when user is logged in', () => {
    const wrapper = shallow(<SignInButton {...props} isLoggedIn />)
    wrapper.find('button[data-tid="sign_in-sign_out"]').simulate('click')

    it('displays Sign Out text', () => {
      expect(wrapper.text()).toBe(signOutText)
    })

    it('calls the signOut handler', () => {
      expect(props.signOut).toBeCalled()
    })
  })
})
