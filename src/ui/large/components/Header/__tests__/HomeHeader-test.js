import React from 'react'
import { mount } from 'enzyme'

import HomeHeaderWrapped from '../HomeHeader'

const HomeHeader = HomeHeaderWrapped.WrappedComponent

describe('large/HomeHeader', () => {
  describe('saved properties badge', () => {
    const setup = props => mount(<HomeHeader {...props} />)

    it('is hidden when 0 properties are saved', () => {
      const props = {
        favorites: {},
      }

      const wrapper = setup(props)

      const actual = wrapper.find('span[data-tid="favorites-badge"]')
      const expected = 0
      expect(actual).toHaveLength(expected)
    })

    it('shows when 1 or more properties are saved', () => {
      const props = {
        favorites: {
          1111: true,
        },
      }

      const wrapper = setup(props)

      const actual = wrapper.find('span[data-tid="favorites-badge"]')
      const expected = 1
      expect(actual).toHaveLength(expected)
    })

    it('displays correct number of saved properties', () => {
      const props = {
        favorites: {
          1111: true,
          2222: true,
          3333: true,
        },
      }

      const wrapper = setup(props)

      const actual = wrapper.find('span[data-tid="favorites-badge"]').text()
      const expected = '3'
      expect(actual).toBe(expected)
    })
  })
})
