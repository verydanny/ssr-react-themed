import React from 'react'
import { mount } from 'enzyme'
import Menu from '../Menu'

describe('small/Menu', () => {
  describe('tagging', () => {
    const props = {
      theme: {},
      onFocus: () => true,
    }
    const wrapper = mount(<Menu {...props} />)

    it('tags home', () => {
      const expected = '/'
      const actual = wrapper.find('[data-tag_item="home"]').first().props().href
      expect(actual).toEqual(expected)
    })

    // TODO: re-enable when sign in stories are ready
    it.skip('tags sign_in', () => {
      const expected = '#'
      const actual = wrapper.find('[data-tag_item="sign_in"]').first().props().href
      expect(actual).toEqual(expected)
    })

    it('tags my_rent', () => {
      const expected = '/account/myrent/'
      const actual = wrapper.find('[data-tag_item="my_rent"]').first().props().href
      expect(actual).toEqual(expected)
    })

    it('tags moving_center', () => {
      const expected = '/moving-center/'
      const actual = wrapper.find('[data-tag_item="moving_center"]').first().props().href
      expect(actual).toEqual(expected)
    })

    it('tags list_a_property', () => {
      const expected = '/manage'
      const actual = wrapper.find('[data-tag_item="list_a_property"]').first().props().href
      expect(actual).toEqual(expected)
    })

    it('tags blog', () => {
      const expected = '/blog/'
      const actual = wrapper.find('[data-tag_item="blog"]').first().props().href
      expect(actual).toEqual(expected)
    })
  })
})
