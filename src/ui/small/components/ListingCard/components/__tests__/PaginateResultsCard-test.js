import React from 'react'
import { mount } from 'enzyme'
import PaginateResultsCard from '../PaginateResultsCard'

describe('ListingCard/PaginateResultsCard', () => {
  const link = 'foo'
  const count = 11
  const props = {
    count,
    theme: {},
    link,
  }

  describe('Load Previous', () => {
    const wrapper = mount(<PaginateResultsCard {...props} />)

    it('renders a link', () => {
      const expected = link
      const actual = wrapper.find('Link').first().prop('to')
      expect(actual).toEqual(expected)
    })

    it('adds the proper tagging item', () => {
      const expected = 'previous'
      const actual = wrapper.find('Link').first().prop('data-tag_item')
      expect(actual).toEqual(expected)
    })
  })

  describe('Load More', () => {
    const moreProps = { ...props, more: true }
    const wrapper = mount(<PaginateResultsCard {...moreProps} />)

    it('renders a link', () => {
      const expected = link
      const actual = wrapper.find('Link').first().prop('to')
      expect(actual).toEqual(expected)
    })

    it('adds the proper tagging item', () => {
      const expected = 'load_more_button'
      const actual = wrapper.find('Link').first().prop('data-tag_item')
      expect(actual).toEqual(expected)
    })
  })
  describe('Spinner State', () => {
    const moreProps = { ...props, loading: true }
    const wrapper = mount(<PaginateResultsCard {...moreProps} />)

    it('renders a spinner', () => {
      const expected = 'spinner-card'
      const actual = wrapper.find('div')
        .first()
        .children()
        .first()
        .prop('data-tid')
      expect(actual).toEqual(expected)
    })
  })
})
