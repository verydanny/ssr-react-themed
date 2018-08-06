import React from 'react'
import { createMockStore } from 'mocks'
import { mount } from 'enzyme'
import Container from '../container'

describe('BreadCrumbs/container', () => {
  const location = {
    city: {
      name: 'New York',
    },
    state: {
      name: 'New York',
      slug: 'new-york',
    },
    zip: '12345',
    hood: { name: 'Greenwich Village', slug: 'greenwich-village' },
  }

  const state = {
    criteria: {
      location,
      propertyType: 'apartments',
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
    router: {
      route: {
        name: 'SEARCH_RESULTS_PAGE',
        type: 'CATCHALL',
      },
    },
  }

  let wrapper
  let wrapped
  let store

  beforeEach(() => {
    store = createMockStore(state)
    wrapper = mount(<Container store={store} />)
    wrapped = wrapper.find('BreadCrumbs')
  })

  describe('mapStateToProps', () => {
    it('props.city', () => {
      const expected = location.city
      const actual = wrapped.prop('city')
      expect(expected).toEqual(actual)
    })

    it('props.headingText', () => {
      const expected = 'Cheap 3 Bedroom, $1,200 max apartments for rent in New York, NY'
      const actual = wrapped.prop('headingText')
      expect(expected).toEqual(actual)
    })

    it('props.hood', () => {
      const expected = state.criteria.location.hood
      const actual = wrapped.prop('hood')
      expect(expected).toEqual(actual)
    })

    it('props.state', () => {
      const expected = state.criteria.location.state
      const actual = wrapped.prop('state')
      expect(expected).toEqual(actual)
    })

    it('props.legacyStateLanderUrl', () => {
      const expected = 'new-york/1-33'
      const actual = wrapped.prop('legacyStateLanderUrl')
      expect(expected).toEqual(actual)
    })

    it('props.zip', () => {
      const expected = state.criteria.location.zip
      const actual = wrapped.prop('zip')
      expect(expected).toEqual(actual)
    })

    it('props.singlePropertyType', () => {
      const expected = true
      const actual = wrapped.prop('singlePropertyType')
      expect(expected).toEqual(actual)
    })
  })
})
