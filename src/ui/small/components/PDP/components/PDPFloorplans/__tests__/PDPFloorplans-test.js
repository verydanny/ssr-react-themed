import React from 'react'
import { shallow, mount } from 'enzyme'
import PDPFloorplans from '../PDPFloorplans'

const defaultProps = {}

const standardProps = {
  totalFloorplans: 10,
  unitsAvailable: 50,
}

const descriptionText = '10 floorplans and 50 units available.'

const factory = props =>
  <PDPFloorplans.WrappedComponent {...defaultProps} {...props} />

describe('<PDPFloorplans />', () => {
  it('should render', () => {
    const wrapper = shallow(factory(standardProps))

    expect(wrapper.exists()).toBe(true)
  })

  it('description should render correctly with totals', () => {
    const wrapper = mount(factory(standardProps))
    const description = wrapper.find('span[data-tid="pdpFloorplans_Description"]')
    expect(description.text()).toEqual(descriptionText)
  })

  it('render should match snapshot', () => {
    const wrapper = shallow(factory(standardProps))
    expect(wrapper.html()).toMatchSnapshot()
  })
})
