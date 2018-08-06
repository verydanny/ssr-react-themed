import React from 'react'
import { mount } from 'enzyme'
import { Button } from '@rentpath/react-ui-core'
import PDPSection from '../'

const renderHidable = jest.fn()

const defaultProps = {
  category: 'Test Category',
  description: 'Test description',
  renderHidable,
  theme: {},
}

const factory = props =>
  <PDPSection {...defaultProps} {...props} />

describe('<PDPSection />', () => {
  it('should render', () => {
    const wrapper = mount(factory())

    expect(wrapper.exists()).toBe(true)
  })

  describe('with default state', () => {
    const wrapper = mount(factory())

    it('should call renderHidable with instance expanded state', () => {
      expect(wrapper.props().renderHidable)
        .toHaveBeenCalledWith({ expanded: false })
    })
  })

  describe('with clicked/toggled state', () => {
    const wrapper = mount(factory())
    wrapper.find(Button).simulate('click')

    it('should call renderHidable with expanded true', () => {
      expect(wrapper.props().renderHidable)
        .toHaveBeenCalledWith({ expanded: true })
    })
  })
})
