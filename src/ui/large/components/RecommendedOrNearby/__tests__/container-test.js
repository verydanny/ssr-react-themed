import React from 'react'
import { createMockStore } from 'mocks'
import { shallow } from 'enzyme'
import {
  openModal,
  closeAllModals,
} from 'app/store/shared/actions'
import omit from 'lodash/omit'
import Container from '../container'

describe('RecommendedOrNearby/container', () => {
  const listings = [
    { listingId: '123' },
    { listingId: '456' },
  ]

  const recommended = [
    { listingId: '789' },
    { listingId: '987' },
  ]

  const location = {
    city: {
      name: 'New York',
    },
  }

  const state = {
    listings: {
      listings,
      recommended,
    },
    criteria: {
      location,
    },
  }

  const listing = {
    foo: 'bar',
    listingId: '123',
    endecaId: '456',
    propertyLabel: 'Foo',
    desktopPhone: '678 770 4040',
    tplSource: 'rent',
    revenue: '14.25',
    isPaid: true,
  }

  const modalId = '123'

  let wrapper
  let wrapped
  let store

  beforeEach(() => {
    store = createMockStore(state)
    wrapper = shallow(<Container store={store} />).dive()
    wrapped = wrapper.find('RecommendedOrNearby')
  })

  it('passes recommended properties to props.listings', () => {
    expect(wrapped.prop('listings')).toEqual(recommended)
  })

  it('it passes the city name to props.cityName', () => {
    expect(wrapped.prop('cityName')).toEqual(location.city.name)
  })

  describe('props.openModal', () => {
    it('closes all modals and opens new modal with correct props', () => {
      const openModalDispatch = wrapped.prop('openModal')
      openModalDispatch(listing, modalId)
      const actions = store.getActions()
      const [closeAllModalsAction, openLeadModalAction] = actions
      expect(closeAllModalsAction).toEqual(closeAllModals())
      expect(openLeadModalAction).toEqual(openModal(
        modalId,
        omit(listing, 'foo')
      ))
    })
  })
})
