import React from 'react'
import { createMockStore } from 'mocks'
import { mount } from 'enzyme'
import Container from '../container'

describe('ui/small/PageViewTracker/container', () => {
  const refinements = {
    '1beds': { slug: '1-bedroom' },
    '1baths': { slug: '1-bathroom' },
  }
  const pathname = '/california/los-angeles/apartments_condos_houses_townhouses'
  const criteria = {
    refinements,
    loading: true,
    pageNumber: null,
  }
  const location = {
    pathname,
  }
  const route = {}
  const state = {
    criteria,
    page: {
      currentView: 'map',
    },
    listings: {
      listings: [{
        listingId: 1,
      }, {
        listingId: 2,
      }],
    },
    router: {
      route,
      location,
    },
  }

  let wrapper
  let pageViewTracker
  let store

  beforeEach(() => {
    store = createMockStore(state)
    wrapper = mount(<Container store={store} />)
    pageViewTracker = wrapper.find('PageViewTracker')
  })

  it('passes taggingPageName', () => {
    const expected = 'srp_map'
    const actual = pageViewTracker.prop('taggingPageName')
    expect(actual).toEqual(expected)
  })

  it('passes criteria', () => {
    const expected = criteria
    const actual = pageViewTracker.prop('criteria')
    expect(actual).toEqual(expected)
  })

  it('passes location', () => {
    const expected = location
    const actual = pageViewTracker.prop('location')
    expect(actual).toEqual(expected)
  })

  it('passes route', () => {
    const expected = route
    const actual = pageViewTracker.prop('route')
    expect(actual).toEqual(expected)
  })

  it('passes listings prop', () => {
    const expected = [1, 2]
    const actual = pageViewTracker.prop('listings')
    expect(actual).toEqual(expected)
  })
})
