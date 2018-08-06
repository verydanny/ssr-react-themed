import React from 'react'
import { mount } from 'enzyme'
import BedFilter from '../BedFilter'

describe('BedFilter', () => {
  it('displays "Any" when no value is provided', () => {
    const wrapper = mount(<BedFilter />)
    expect(wrapper.text()).toContain('Any')
  })

  it('displays "Studio" when a 0 value is provided', () => {
    const wrapper = mount(<BedFilter value={0} />)
    expect(wrapper.text()).toContain('Studio')
  })

  it('displays the value when a value 1+ is provided', () => {
    const wrapper = mount(<BedFilter value={2} />)
    expect(wrapper.text()).toContain('2')
  })
})
