import React from 'react'
import { mount } from 'enzyme'
import EmptyListingCard from '../components/EmptyListingCard'

describe('Click on adjust filters', () => {
  const props = {
    toggleView: jest.fn(),
    viewType: 'map',
  }

  it('On Click', () => {
    const wrapper = mount(<EmptyListingCard {...props} />)
    wrapper.find('Text').simulate('click')
    expect(props.toggleView).toBeCalled()
  })
})
