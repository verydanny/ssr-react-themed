import React from 'react'
import { shallow } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import OauthButtonsThemed from '../OauthButtons'

const OauthButtons = OauthButtonsThemed.WrappedComponent

const theme = keyMirror([
  'Oauth_Container',
  'Oauth_Facebook',
  'Oauth_Googleplus',
  'Oauth_SocialMediaIcons',
  'Oauth_FacebookButton',
  'Oauth_GoogleButton',
])

const props = {
  theme,
}

describe('OauthButtons', () => {
  describe('Oauth button render properly', () => {
    const wrapper = shallow(<OauthButtons {...props} />)

    it('Oauth buttons output matches the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
