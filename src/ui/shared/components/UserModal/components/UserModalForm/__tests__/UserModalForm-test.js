import React from 'react'
import { mount } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import UserModalForm from '../UserModalForm'

const theme = keyMirror(['RegisterModal_FirstName'])

const fields = [
  {
    name: 'firstName',
    type: 'text',
    modal: 'register',
    placeholder: 'First Name',
    'data-tag_item': 'firstName',
    autoComplete: 'given-name',
    className: theme.RegisterModal_FirstName,
  },
]

const fieldMap = {}

const props = {
  theme,
  onSubmit: jest.fn(),
  displayName: 'RegisterModal',
  fields,
  fieldMap,
}

describe('UserModalForm', () => {
  describe('User modal form renders properly', () => {
    const wrapper = mount(<UserModalForm {...props} />)

    it('matches snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
