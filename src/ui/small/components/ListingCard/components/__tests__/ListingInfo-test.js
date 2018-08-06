import React from 'react'
import { shallow } from 'enzyme'
import ThemedListingInfo from '../ListingInfo'

const ListingInfo = ThemedListingInfo.WrappedComponent

describe('ListingCard/ListingInfo', () => {
  const withPropsShallow = props => shallow(<ListingInfo {...props} />)

  describe('spotlight', () => {
    const cardInfoTitleClass = 'price'
    const cardInfoBedBathClass = 'beds'
    const selector = '[data-tid="listing-section"]'

    describe('when on list view', () => {
      const listViewProps = {
        theme: {
          ListingInfo_bedbathText: cardInfoBedBathClass,
        },
        viewType: 'list',
        isSponsored: false,
        isActive: true,
        unitAvailText: '5 thingies are here',
      }

      it('renders correctly', () => {
        const wrapper = withPropsShallow(listViewProps)
        expect(wrapper).toMatchSnapshot()
      })

      describe('when listing is current spotlight', () => {
        const propsForSpotlight = {
          ...listViewProps,
          isSponsored: true,
        }
        const wrapper = withPropsShallow(propsForSpotlight)

        it('renders a spotlight', () => {
          expect(wrapper.find('[data-tid="listing-section"]').at(0)).toHaveLength(1)
        })
      })

      describe('when listing is current spotlight', () => {
        const propsForSpotlight = {
          ...listViewProps,
          isSponsored: true,
        }
        const wrapper = withPropsShallow(propsForSpotlight)
        it('does not render beds and bath text when they are not present', () => {
          expect(wrapper.find('[data-tid="beds-baths"]')).toHaveLength(0)
        })
      })

      describe('when listing is not current spotlight', () => {
        const wrapper = withPropsShallow(listViewProps)
        it('does not render a spotlight', () => {
          expect(wrapper.find(selector)).toHaveLength(0)
        })
      })

      describe('when property is inactive', () => {
        it('does not show available units', () => {
          const wrapper = withPropsShallow({ ...listViewProps, isActive: false })
          expect(wrapper.find('[data-tid="available-units"]')).toHaveLength(0)
        })
      })

      it('shows available units', () => {
        const wrapper = withPropsShallow(listViewProps)
        expect(wrapper.find('[data-tid="available-units"]')).toHaveLength(1)
      })
    })

    describe('when on map view', () => {
      const mapViewProps = {
        theme: {
          ListingInfo_title: cardInfoTitleClass,
          ListingInfo_bedbathText: cardInfoBedBathClass,
        },
        price: '$1700',
        propertyLabel: 'Test Property',
        beds: 'studio 2 beds',
        baths: '1 - 2 baths',
        viewType: 'map',
        isSponsored: false,
        isActive: true,
        unitAvailText: 'stuff and junk present',
      }

      it('renders correctly', () => {
        const wrapper = withPropsShallow(mapViewProps)
        expect(wrapper).toMatchSnapshot()
      })

      describe('when property is inactive', () => {
        it('does not show available units', () => {
          const wrapper = withPropsShallow({ ...mapViewProps, isActive: false })
          expect(wrapper.find('[data-tid="available-units"]')).toHaveLength(0)
        })
      })

      it('shows available units', () => {
        const wrapper = withPropsShallow(mapViewProps)
        expect(wrapper.find('[data-tid="available-units"]')).toHaveLength(1)
      })

      describe('when listing is current spotlight', () => {
        const propsForSpotlight = {
          ...mapViewProps,
          isSponsored: true,
        }
        // ListingInfo on the map should never render the cta contact, regardless of isSponsored
        it('does not render a spotlight', () => {
          const wrapper = withPropsShallow(propsForSpotlight)
          expect(wrapper.find(selector)).toHaveLength(0)
        })
      })
      describe('when listing is current spotlight', () => {
        const propsForSpotlight = {
          ...mapViewProps,
          isSponsored: true,
        }
        // ListingInfo on the map should never render the cta contact, regardless of isSponsored
        it('renders price for a spotlight', () => {
          const wrapper = withPropsShallow(propsForSpotlight)
          expect(wrapper.find('[data-tid="listing-price"]')).toHaveLength(1)
        })
      })

      describe('when listing is current spotlight', () => {
        const propsForSpotlight = {
          ...mapViewProps,
          isSponsored: true,
        }
        it('renders beds and bath text for a spotlight', () => {
          const wrapper = withPropsShallow(propsForSpotlight)
          expect(wrapper.find(`.${cardInfoBedBathClass}`)).toHaveLength(1)
        })
      })
      describe('when listing is not current spotlight', () => {
        it('does not render a spotlight', () => {
          const wrapper = withPropsShallow(mapViewProps)
          expect(wrapper.find(selector)).toHaveLength(0)
        })
      })
    })
  })

  describe('price info', () => {
    const baseProps = {
      priceText: '$1700',
      isActive: true,
      viewType: 'list',
    }

    it('shows the price', () => {
      const wrapper = withPropsShallow(baseProps)
      expect(wrapper.find('[data-tid="listing-price"]').text()).toEqual('$1700')
    })

    describe('when the property is inactive', () => {
      it('shows "Price Unavailable" for the price', () => {
        const wrapper = withPropsShallow({ ...baseProps, isActive: false })
        expect(wrapper.find('[data-tid="listing-price"]').text()).toEqual('Price Unavailable')
      })
    })
  })

  describe('bed and bath info', () => {
    const baseProps = {
      price: '$1700',
      propertyLabel: 'Test Property',
      beds: 'the beds',
      baths: 'the baths',
      viewType: 'map',
      isSponsored: false,
      isActive: true,
    }

    describe('when the property is inactive', () => {
      it('does not render beds and baths', () => {
        const wrapper = withPropsShallow({ ...baseProps, isActive: false })
        expect(wrapper.find('[data-tid="beds-baths"]').children()).toHaveLength(0)
      })
    })

    describe('when both beds and bath are present', () => {
      const wrapper = withPropsShallow(baseProps)

      it('renders bed and bath text', () => {
        const actual = wrapper.find('[data-tid="beds-baths"]').first().text()
        expect(actual).toEqual('the beds • the baths')
      })
    })

    describe('when only beds are present', () => {
      const wrapper = withPropsShallow({ ...baseProps, baths: null })

      it('renders only bed text', () => {
        const actual = wrapper.find('[data-tid="beds-baths"]').first().text()
        expect(actual).toEqual('the beds')
      })
    })

    describe('when only baths are present', () => {
      const wrapper = withPropsShallow({ ...baseProps, beds: null })

      it('renders only bath text', () => {
        const actual = wrapper.find('[data-tid="beds-baths"]').first().text()
        expect(actual).toEqual('the baths')
      })
    })

    describe('when neither beds nor baths are present', () => {
      const wrapper = withPropsShallow({ ...baseProps, beds: null, baths: null })

      it('renders nothing', () => {
        const actual = wrapper.find('[data-tid="beds-baths"]').first().text()
        expect(actual).toEqual('')
      })
    })
  })
})
