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
    mPhone: '678 770 4040',
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

  it('props.listings', () => {
    const expected = recommended
    const actual = wrapped.prop('listings')
    expect(expected).toEqual(actual)
  })

  it('props.cityName', () => {
    const expected = location.city.name
    const actual = wrapped.prop('cityName')
    expect(expected).toEqual(actual)
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
