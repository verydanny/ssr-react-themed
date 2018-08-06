import React from 'react'
import { mount } from 'enzyme'
import SortFilter from '../SortFilter'

describe('Sort Filter', () => {
  it('displays buttonPrefix and buttonText', () => {
    const props = {
      buttonPrefix: 'MyPrefix',
      buttonText: 'MyText',
    }
    const wrapper = mount(
      <SortFilter {...props} />
    )
    expect(wrapper.text()).toContain('MyPrefixMyText')
  })
  it('displays only buttonPrefix', () => {
    const props = {
      buttonPrefix: 'onlyPrefix',
    }
    const wrapper = mount(
      <SortFilter {...props} />
    )
    expect(wrapper.text()).toContain('onlyPrefix')
  })
  it('displays only buttonText', () => {
    const props = {
      buttonText: 'onlyText',
    }
    const wrapper = mount(
      <SortFilter {...props} />
    )
    expect(wrapper.text()).toContain('onlyText')
  })
  it('does not display a dropdown unless clicked upon', () => {
    const props = {
      buttonText: 'onlyText',
      buttonPrefix: 'onlyPrefix',
      options: [1, 2, 3],
    }
    const wrapper = mount(
      <SortFilter {...props} />
    )
    expect(wrapper.find('[data-tid="dropdown-body"]')).toHaveLength(0)
  })
  it('displays a dropdown', () => {
    const wrapper = mount(
      <SortFilter />
    )
    expect(wrapper.find('[data-tid="dropdown-body"] div')).toHaveLength(0)
    wrapper.find('button').simulate('click')
    expect(wrapper.find('[data-tid="dropdown-body"] div')).not.toHaveLength(0)
  })
  it('dropdown has options', () => {
    const wrapper = mount(
      <SortFilter />
    )
    expect(wrapper.find('[data-tid="dropdown-body"]')).toHaveLength(0)
    wrapper.find('button').simulate('click')
    expect(wrapper.find('div[data-tid="dropdown-body"]')).toHaveLength(1)
    expect(wrapper.find('[data-tag_selection="best_match"]').text()).toContain('Best Match')
    expect(wrapper.find('[data-tag_selection="price_lowest_first"]').text()).toContain('Price (Low to High)')
    expect(wrapper.find('[data-tag_selection="price_highest_first"]').text()).toContain('Price (High to Low)')
    expect(wrapper.find('[data-tag_selection="rating_high_to_low"]').text()).toContain('Ratings (High to Low)')
  })
  it('onChange function called upon option selection', () => {
    const props = {
      onChange: jest.fn(),
    }
    const wrapper = mount(
      <SortFilter {...props} />
    )
    expect(wrapper.find('[data-tid="dropdown-body"]')).toHaveLength(0)
    wrapper.find('button').simulate('click')
    wrapper.find('[data-tag_selection="best_match"]').simulate('click')
    expect(props.onChange).toBeCalled()
  })
})
