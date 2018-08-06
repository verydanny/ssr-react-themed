import React from 'react'
import { mount } from 'enzyme'

import HeaderBadge from '../components/HeaderBadge'

describe('large/HeaderBadge', () => {
  describe('saved properties badge', () => {
    const setup = props => mount(<HeaderBadge {...props} />)

    it('displays correct number of saved properties', () => {
      const props = {
        numFavorites: 22,
      }

      const wrapper = setup(props)

      const actual = wrapper.find('span[data-tid="favorites-badge"]').text()
      const expected = '22'
      expect(actual).toBe(expected)
    })
  })
})
