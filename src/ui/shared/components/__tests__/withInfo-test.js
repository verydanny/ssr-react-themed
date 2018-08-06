import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { createMockStore } from 'mocks'
import withInfo from '../withInfo'

const dummyComponent = <div data-tid="dummyComponent" />

const listing = {
  originalListingProperty: 'im available to children',
  listingId: 0,
  isPaid: true,
  isActive: true,
  aggregates: {
    prices: {
      low: 800,
      high: 2100,
    },
    totalAvailable: 42,
    beds: {
      low: 2,
      high: 4,
    },
    baths: {
      low: 1,
      high: 3,
    },
  },
}
const state = {
  page: {
    currentView: 'map',
  },
  request: {
    displaySize: 'small',
  },
  listings: {
    listings: [listing],
  },
}

const store = createMockStore(state)

describe('withInfo HOC', () => {
  it('decorates listing info', () => {
    const props = {
      listing,
      someOtherProp: 'im availabile to children',
    }
    const InfoDiv = withInfo(() => dummyComponent)
    const wrapper = <InfoDiv {...props} />
    expect(wrapper.props).toMatchSnapshot()
  })

  it('grabs state from redux', () => {
    const props = {
      listing,
      listingId: listing.listingId,
      someOtherProp: 'im availabile to children',
    }

    const InfoDiv = withInfo(() => dummyComponent)

    const wrapper = mount(
      <Provider store={store}>
        <InfoDiv {...props} />
      </Provider>
    )

    expect(wrapper.find(InfoDiv).childAt(0).prop('unitAvailText')).toEqual('10+ available')
    expect(wrapper.find(InfoDiv).childAt(0).prop('isMapView')).toEqual(true)
    expect(wrapper.find(InfoDiv).childAt(0).prop('isListView')).toEqual(false)
  })
})
