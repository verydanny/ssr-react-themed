import React from 'react'
import { createMockStore } from 'mocks'
import { mount } from 'enzyme'
import Container from '../container'

describe('ui/large/MoreFiltersModal/container', () => {
  const state = {
    filters: {
      current: {},
      total: 10,
    },
    listings: { total: 100 },
    router: {
      location: {
        query: {},
      },
      route: { type: 'CATCHALL' },
    },
    criteria: {
      locationSlug: 'california/los-angeles',
      propertyType: 'houses',
      refinements: {
        houses: {
          value: true,
          slug: 'houses',
          group: 'propertyTypes',
          key: 'houses',
        },
        '3beds': {
          value: 3,
          slug: '3-bedroom',
          group: 'beds',
          key: '3beds',
        },
        maxPrice: {
          value: '1200',
          slug: 'max-price-1200',
          key: 'maxPrice',
          group: 'price',
        },
        cheap: {
          value: true,
          slug: 'cheap',
          group: 'sort',
          key: 'cheap',
        },
      },
    },
  }

  let wrapper
  let wrapped
  let store

  beforeEach(() => {
    store = createMockStore(state)
    wrapper = mount(<Container onClose={jest.fn()} store={store} />)
    wrapped = wrapper.find('MoreFiltersModal')
  })

  describe('mapStateToProps', () => {
    it('props.filters', () => {
      const expected = state.filters.current
      const actual = wrapped.prop('filters')
      expect(expected).toEqual(actual)
    })

    it('props.filterTotal', () => {
      const expected = state.filters.total
      const actual = wrapped.prop('filterTotal')
      expect(expected).toEqual(actual)
    })

    it('props.locationSlug', () => {
      const expected = state.criteria.locationSlug
      const actual = wrapped.prop('locationSlug')
      expect(expected).toEqual(actual)
    })

    it('props.propertyType', () => {
      const expected = state.criteria.propertyType
      const actual = wrapped.prop('propertyType')
      expect(expected).toEqual(actual)
    })

    it('props.query', () => {
      const expected = state.router.location.query
      const actual = wrapped.prop('query')
      expect(expected).toEqual(actual)
    })

    it('props.searchType', () => {
      const expected = state.router.route.type
      const actual = wrapped.prop('searchType')
      expect(expected).toEqual(actual)
    })
  })
})
