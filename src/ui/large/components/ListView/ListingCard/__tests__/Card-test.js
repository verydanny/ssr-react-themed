import React from 'react'
import { shallow } from 'enzyme'
import { Text } from '@rentpath/react-ui-core'
import HdOverlay from 'ui/shared/components/HdOverlay'
import ThemedCard from '../Card'

const Card = ThemedCard.WrappedComponent

const theme = {
  'ListingCard-active': 'ListingCard-active',
}
const sponsoredListing = {
  listingId: '102',
  propertyType: 'APARTMENTS',
  score: 3,
  listingAvailUnitCount: 1,
  isActive: true,
  isCurrentSpotlight: true,
  aggregates: {
    prices: {
      low: 1250,
      high: 1800,
    },
  },
}

describe('Card', () => {
  describe('sponsored card', () => {
    it('has sponsored label', () => {
      const wrapper = shallow(
        <Card
          listing={sponsoredListing}
          theme={theme}
        />
      )
      expect(wrapper.find(Text).prop('children')).toEqual('Sponsored')
    })
  })

  describe('Featured card', () => {
    const featuredProps = { isCurrentSpotlight: false, isCurrentFeatured: true }
    const featuredListing = { ...sponsoredListing, ...featuredProps }

    it('has Featured label', () => {
      const wrapper = shallow(
        <Card
          listing={featuredListing}
          theme={theme}
        />
      )

      expect(wrapper.find(Text).prop('children')).toEqual('Featured')
    })
  })

  describe('3D Tour card', () => {
    describe('listing with 3d tour', () => {
      const tourProp = { hasHdTour: true }
      const hdListing = { ...sponsoredListing, ...tourProp }
      it('has 3D Tour label', () => {
        const wrapper = shallow(
          <Card
            listing={hdListing}
            theme={theme}
          />
        )
        expect(wrapper.find(HdOverlay).length).toEqual(1)
      })
    })
    describe('listing without 3d tour', () => {
      it('does not have 3D Tour label', () => {
        const wrapper = shallow(
          <Card
            listing={sponsoredListing}
            theme={theme}
          />
        )
        expect(wrapper.find(HdOverlay).length).toEqual(0)
      })
    })
  })

  describe('active card', () => {
    it('has the data-active-card attribute', () => {
      const wrapper = shallow(
        <Card
          listing={sponsoredListing}
          theme={theme}
          isActiveCard
        />
      )

      expect(wrapper.find('[data-active-card]')).toHaveLength(1)
    })

    it('has the active class', () => {
      const wrapper = shallow(
        <Card
          listing={sponsoredListing}
          theme={theme}
          isActiveCard
        />
      )

      const hasClass = wrapper.hasClass(theme['ListingCard-active'])
      expect(hasClass).toBe(true)
    })
  })

  describe('inactive card', () => {
    it('passes null as the data-active-card attribute', () => {
      const wrapper = shallow(
        <Card
          listing={sponsoredListing}
          theme={theme}
        />
      )
      expect(wrapper.find('[data-tid="listing-section"]').prop('data-active-card')).toBeNull()
    })

    it('does not has the active class', () => {
      const wrapper = shallow(
        <Card
          listing={sponsoredListing}
          theme={theme}
        />
      )

      const hasClass = wrapper.hasClass(theme['ListingCard-active'])
      expect(hasClass).toBe(false)
    })
  })
})
