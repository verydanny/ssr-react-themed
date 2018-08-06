import React from 'react'
import { Provider } from 'react-redux'
import { createMockStore } from 'mocks'
import { mount } from 'enzyme'
import Cards from '../Cards'

describe('ListingCard/Cards', () => {
  const state = {
    meta: {
      displayName: 'Los Angeles, CA',
      searchType: 'city',
      lat: 34.0522,
      lng: -118.2428,
      city: {
        name: 'Los Angeles',
        slug: 'los-angeles',
      },
      state: {
        name: 'California',
        slug: 'california',
      },
      zip: null,
      hood: null,
      listingCount: 561,
      targetCode: '31084',
      robots: null,
      canonicalUri: null,
      title: '',
      description: '',
      localInfoBody: '',
      headline: null,
    },
    user: {
      id: '',
      favorites: {},
    },
  }

  /* eslint-disable react/prop-types */
  const CardWrapper = ({ cards }) => {
    const store = createMockStore(state)
    return (
      <Provider store={store}>
        <div>{cards}</div>
      </Provider>
    )
  }
  /* eslint-enable react/prop-types */

  const basicProps = {
    theme: {},
    viewType: 'list',
    isListView: true,
    listings: [{
      listingId: '1',
    }, {
      listingId: '2',
    }, {
      listingId: '3',
    }],
    selectedListingId: '2',
    favorites: {},
  }

  const fivelistings = [{
    listingId: '1',
  }, {
    listingId: '2',
  }, {
    listingId: '3',
  }, {
    listingId: '4',
  }, {
    listingId: '5',
  }]

  describe('key', () => {
    it('uses the listingID as the key', () => {
      const cards = Cards({ ...basicProps })

      expect(cards[0].key).toEqual(basicProps.listings[0].listingId)
      expect(cards[1].key).toEqual(basicProps.listings[1].listingId)
      expect(cards[2].key).toEqual(basicProps.listings[2].listingId)
    })
  })

  describe('List View Cards', () => {
    it('does not render ad with fewer than 5 listings', () => {
      const basicPropsCards = Cards({ ...basicProps })
      const wrapper = mount(<CardWrapper cards={basicPropsCards} />)
      expect(wrapper.find('DfpAdSlot')).toHaveLength(0)
    })

    it('every card isActiveCard', () => {
      const basicPropsCards = Cards({ ...basicProps })
      const wrapper = mount(<CardWrapper cards={basicPropsCards} />)
      expect(wrapper.find('Card').map(card => card.props().isActiveCard)).toEqual([true, true, true])
    })
  })

  describe('Map View Cards', () => {
    let mapViewCards
    beforeEach(() => {
      mapViewCards = Cards({ ...basicProps, fivelistings, viewType: 'map', isListView: false })
    })

    it('computes proper isActiveCard', () => {
      const wrapper = mount(<CardWrapper cards={mapViewCards} />)
      expect(wrapper.find('Card').map(card => card.props().isActiveCard)).toEqual([false, true, false])
    })
  })
})
