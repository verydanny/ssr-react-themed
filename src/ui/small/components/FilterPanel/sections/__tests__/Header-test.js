import React from 'react'
import { mount } from 'enzyme'
import { Text } from '@rentpath/react-ui-core'
import ThemedHeader from '../Header'

const Header = ThemedHeader.WrappedComponent

describe('Header', () => {
  it('toggles the view when you click on the Text', () => {
    const onCancel = jest.fn()
    const wrapper = mount(<Header onCancel={onCancel} />)
    wrapper.find(Text).simulate('click')
    expect(onCancel).toBeCalled()
  })
})

