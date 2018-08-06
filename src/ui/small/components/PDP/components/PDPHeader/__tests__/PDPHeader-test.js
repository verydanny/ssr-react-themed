import React from 'react'
import { mount } from 'enzyme'
import PDPHeader from '../PDPHeader'

describe('Click on adjust filters', () => {
  const props = {
    theme: {},
    pushState() {},
  }

  it('renders header with rentlogo and back button', () => {
    const wrapper = mount(
      <PDPHeader {...props} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
