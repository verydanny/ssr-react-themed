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
    listings: [
      { listingId: '1' },
      { listingId: '2' },
      { listingId: '3' },
    ],
    favorites: [],
  }

  describe('advertisement', () => {
    it('does not render ad with fewer than 5 listings ', () => {
      const props = { ...basicProps }
      const cards = Cards(props)
      const wrapper = mount(<CardWrapper cards={cards} />)
      const actual = wrapper.find('DfpAdSlot').length
      expect(actual).toEqual(0)
    })

    it('renders ad after 5th listing', () => {
      const listings = [
        { listingId: '1' },
        { listingId: '2' },
        { listingId: '3' },
        { listingId: '4' },
        { listingId: '5' },
      ]

      const cards = Cards({ ...basicProps, listings })
      const wrapper = mount(<CardWrapper cards={cards} />)
      const actual = wrapper.find('DfpAdSlot').length
      const expected = 1
      expect(actual).toEqual(expected)
    })
  })
})
