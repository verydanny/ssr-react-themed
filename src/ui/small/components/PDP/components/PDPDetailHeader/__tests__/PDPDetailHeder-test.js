import React from 'react'
import { mount } from 'enzyme'
import PDPDetailHeader from '../PDPDetailHeader'

describe('<PDPDetailHeader/>', () => {
  const props = {
    theme: {},
    title: '$1,375+ Malino',
    subtitle: 'Floorplan A4',
    onClick: jest.fn(),
  }

  it('renders a title, subtitle, and back button', () => {
    const wrapper = mount(
      <PDPDetailHeader {...props} />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('renders a title without a subtitle', () => {
    const wrapper = mount(
      <PDPDetailHeader theme={{}} title={'A Detail Header Title'} />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('trims title and subtitle with max characters', () => {
    const wrapper = mount(
      <PDPDetailHeader
        {...props}
        title={'This is a super long name of an address on the detail header'}
        subtitle={'841 Southeast Memorial Day Drive SE, Atlanta, GA'}
        titleMax={30}
        subtitleMax={35}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('calls onClick() when clicked', () => {
    const wrapper = mount(
      <PDPDetailHeader {...props} />
    )
    const button = wrapper.find('button')
    button.simulate('click')
    expect(props.onClick).toHaveBeenCalled()
  })
})
