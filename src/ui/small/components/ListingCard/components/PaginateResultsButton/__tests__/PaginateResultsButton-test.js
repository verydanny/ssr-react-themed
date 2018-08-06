import React from 'react'
import { mount } from 'enzyme'
import PaginateResultsButton from '../PaginateResultsButton'

describe('ListingCard/PaginateResultsButton', () => {
  const props = {
    count: 100,
    theme: {},
    link: 'foo',
    pushState: () => null,
  }

  describe('Load Previous', () => {
    const wrapper = mount(<PaginateResultsButton {...props} />)

    it('renders the proper text', () => {
      const button = wrapper.find('Button').first()
      expect(button.prop('children')).toEqual('Show previous 100')
    })

    it('adds the proper tagging item', () => {
      const expected = 'previous'
      const actual = wrapper.find('a').first().prop('data-tag_item')
      expect(actual).toEqual(expected)
    })
  })

  describe('Load More', () => {
    const moreProps = { ...props, more: true }
    const wrapper = mount(<PaginateResultsButton {...moreProps} />)

    it('renders the proper text', () => {
      const button = wrapper.find('Button').first()
      expect(button.prop('children')).toEqual('Show 100 more')
    })

    it('adds the proper tagging item', () => {
      const expected = 'load_more_button'
      const actual = wrapper.find('a').first().prop('data-tag_item')
      expect(actual).toEqual(expected)
    })
  })
})
