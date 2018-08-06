import React from 'react'
import { shallow } from 'enzyme'
import AggregateRating from 'ui/shared/components/AggregateRating'
import HdOverlay from 'ui/shared/components/HdOverlay'
import CardThemed from '../Card'
import CtaButton from '../CtaButton'

const Card = CardThemed.WrappedComponent

describe('ListingCard/Card', () => {
  const baseProps = {
    theme: {},
    viewType: 'list',
    listing: {
      listingId: '1',
      isActive: true,
      mPhone: '123-456-7890',
      noVacancy: false,
      isPaid: true,
    },
  }
  const genericSpotlightClass = 'sponsored-class-for-all'
  const ctaView = 'sponsored-class-for-list'
  const mapViewProps = {
    theme: {
      CardInfo_sponsoredLabel: genericSpotlightClass,
    },
    viewType: 'map',
    listing: {
      listingId: 1,
    },
    selectedListing: '1',
  }

  const listViewProps = {
    theme: {
      ctaView,
      CardInfo_sponsoredLabel: genericSpotlightClass,
    },
    viewType: 'list',
    isListView: true,
    listing: {
      listingId: 1,
    },
    selectedListing: '1',
  }

  const propsForSpotlight = {
    ...listViewProps,
    listing: {
      ...listViewProps.listing,
      isCurrentSpotlight: true,
    },
  }

  describe('3D Tour card', () => {
    describe('listing with 3d tour', () => {
      const tourProp = { hasHdTour: true }
      const hdListing = { ...baseProps, ...tourProp }
      it('has 3D Tour label', () => {
        const wrapper = shallow(
          <Card
            listing={hdListing}
          />
        )
        expect(wrapper.find(HdOverlay).length).toEqual(1)
      })
    })
    describe('listing without 3d tour', () => {
      it('does not have 3D Tour label', () => {
        const wrapper = shallow(
          <Card
            listing={baseProps}
          />
        )
        expect(wrapper.find(HdOverlay).length).toEqual(0)
      })
    })
  })

  describe('when listing is inactive', () => {
    it('does not show any CTAs', () => {
      const wrapper = shallow(
        <Card {...baseProps} listing={{ ...baseProps.listing, isActive: false }} />
      )
      expect(wrapper.find(CtaButton)).toHaveLength(0)
    })
  })

  it('shows CTAs when the listing is active', () => {
    const wrapper = shallow(<Card {...baseProps} />)
    expect(wrapper.find(CtaButton)).toHaveLength(2)
  })

  it('renders the aggregate ratings', () => {
    const wrapper = shallow(<Card {...baseProps} />)
    expect(wrapper.find(AggregateRating)).toHaveLength(1)
  })

  describe('spotlight', () => {
    describe('when on list view', () => {
      describe('when listing is current spotlight', () => {
        it('renders a spotlight with ctaView class', () => {
          const wrapper = shallow(<Card {...propsForSpotlight} />)
          expect(wrapper.find(`.${ctaView}`)).toHaveLength(1)
        })

        it('renders a spotlight with CardInfo_sponsoredLabel', () => {
          const wrapper = shallow(<Card {...propsForSpotlight} />)
          expect(wrapper.find(`.${genericSpotlightClass}`)).toHaveLength(1)
        })
      })

      describe('when listing is not current spotlight', () => {
        it('does not render a spotlight with ctaView class', () => {
          const wrapper = shallow(<Card {...listViewProps} />)
          expect(wrapper.find(`.${ctaView}`)).toHaveLength(0)
        })

        it('does not render a spotlight with CardInfo_sponsoredLabel', () => {
          const wrapper = shallow(<Card {...listViewProps} />)
          expect(wrapper.find(`.${genericSpotlightClass}`)).toHaveLength(0)
        })
      })
    })

    describe('when on map view', () => {
      describe('when listing is current spotlight', () => {
        it('renders a spotlight', () => {
          const wrapper = shallow(<Card {...propsForSpotlight} />)
          expect(wrapper.find(`.${genericSpotlightClass}`)).toHaveLength(1)
        })
      })

      describe('when listing is not current spotlight', () => {
        it('does not render a spotlight', () => {
          const wrapper = shallow(<Card {...mapViewProps} />)
          expect(wrapper.find(`.${genericSpotlightClass}`)).toHaveLength(0)
        })
      })

      describe('snapshot', () => {
        it('renders correctly', () => {
          const wrapper = shallow(<Card {...mapViewProps} />)
          expect(wrapper).toMatchSnapshot()
        })
        it('renders spotlight correctly', () => {
          const wrapper = shallow(<Card {...propsForSpotlight} />)
          expect(wrapper).toMatchSnapshot()
        })
      })
    })
  })
})
