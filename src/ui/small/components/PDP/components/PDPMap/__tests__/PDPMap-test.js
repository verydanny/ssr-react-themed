import React from 'react'
import { shallow } from 'enzyme'
import PDPMap from '../PDPMap'

const defaultProps = {}

const factory = props =>
  <PDPMap {...defaultProps} {...props} />

describe('<PDPMap />', () => {
  it('should render', () => {
    const wrapper = shallow(factory({
      center: { lat: 42, lng: 42 },
    }))

    expect(wrapper.exists()).toBe(true)
  })
})
