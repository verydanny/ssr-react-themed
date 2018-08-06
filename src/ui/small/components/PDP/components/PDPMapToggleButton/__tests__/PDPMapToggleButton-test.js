import React from 'react'
import { mount } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import PDPMapToggleButton from '../PDPMapToggleButton'

const defaultProps = {
  onClickMapView: jest.fn(),
  onClickStreetView: jest.fn(),
}

const factory = props =>
  <PDPMapToggleButton {...defaultProps} {...props} />

describe('<PDPMapToggleButton />', () => {
  const theme = keyMirror([
    'PDPMapToggleButton',
    'PDPMapToggleButton-active',
  ])

  const props = {
    theme,
  }
  describe('Street View Button', () => {
    it('calls onClickStreetView() when clicked', () => {
      const wrapper = mount(
        factory(props)
      )
      const button = wrapper.find('button').at(1)
      button.simulate('click')
      expect(defaultProps.onClickStreetView).toHaveBeenCalled()
    })

    it('updates to active class when clicked', () => {
      const wrapper = mount(
        factory(props)
      )
      const button = wrapper.find('button').at(1)
      expect(button.render().hasClass('PDPMapToggleButton-active')).toBe(false)
      button.simulate('click')
      expect(button.render().hasClass('PDPMapToggleButton-active')).toBe(true)
    })
  })

  describe('Map View Button', () => {
    it('calls onClickMapView() when clicked', () => {
      const wrapper = mount(
        factory(props)
      )
      const button = wrapper.find('button').first()
      button.simulate('click')
      expect(defaultProps.onClickMapView).toHaveBeenCalled()
    })

    it('updates to active class when clicked', () => {
      const wrapper = mount(
        factory(props)
      )
      const mapButton = wrapper.find('button').first()
      const streetButton = wrapper.find('button').at(1)

      expect(mapButton.render().hasClass('PDPMapToggleButton-active')).toBe(true)

      streetButton.simulate('click')
      expect(mapButton.render().hasClass('PDPMapToggleButton-active')).toBe(false)

      mapButton.simulate('click')
      expect(mapButton.render().hasClass('PDPMapToggleButton-active')).toBe(true)
    })
  })
})
