import React from 'react'
import { shallow, mount } from 'enzyme'
import SqftInput from '../SqftInput'

describe('Sqft ', () => {
  const props = {
    value: 0,
  }
  it('Sqft Min Value check', () => {
    const wrapper = shallow(<SqftInput {...props} />)
    expect(wrapper.html()).toContain('aria-valuemin="0"')
  })
  it('Sqft Min disc check', () => {
    const wrapper = mount(<SqftInput {...props} />)
    expect(wrapper.text()).toContain('Any')
  })
  it('Sqft Value check', () => {
    const wrapper = shallow(<SqftInput {...props} value={10} />)
    expect(wrapper.html()).toContain('aria-valuenow="10"')
  })
  it('Sqft Max Value check', () => {
    const wrapper = shallow(<SqftInput {...props} />)
    expect(wrapper.html()).toContain('aria-valuemax="1600"')
  })
})
