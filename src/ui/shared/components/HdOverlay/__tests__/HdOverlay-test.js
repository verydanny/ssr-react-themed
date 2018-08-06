import React from 'react'
import { shallow } from 'enzyme'
import HdOverlay from '../HdOverlay'

describe('HdOverlay', () => {
  it('renders', () => {
    const wrapper = shallow(<HdOverlay />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
