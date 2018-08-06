import React from 'react'
import { CONTACT_FOR_PRICE } from 'ui/large/components/MapView/const'
import { mount, shallow } from 'enzyme'
import { BasePopUpCard } from '../PopUpCard'

const PopUpCard = BasePopUpCard.WrappedComponent

const theme = {
  'PopUpImage-missing': 'PopUpImage-missing',
  PopUpImage: 'PopUpImage',
  noPriceText: 'PopUpCard_PropertyLabel-withPhone',
}

const listings = {
  houseWithPhotos: {
    listingId: '101',
    propertyType: 'HOUSE',
    isActive: true,
    priceText: '$1,800',
    propertyLabel: 'Foo Bar 123',
    showPhone: false,
    desktopPhone: '1231231234',
    photos: [
      { path: 'foobar' },
    ],
  },
  houseWithNoPrice: {
    listingId: '123456',
    propertyType: 'HOUSE',
    isActive: true,
    priceText: CONTACT_FOR_PRICE,
    propertyLabel: 'Foo Bar 123',
    showPhone: true,
    desktopPhone: '1231231234',
    photos: [
      { path: 'foobar' },
    ],
  },
  apartmentSpotlight: {
    listingId: '102',
    propertyType: 'APARTMENTS',
    propertyLabel: 'Foo Bar 123',
    showPhone: true,
    isActive: true,
    desktopPhone: '1231231234',
    aggregates: {
      prices: {
        low: 1250,
        high: 1800,
      },
    },
    isCurrentSpotlight: true,
  },
  apartmentWithoutPhotos: {
    listingId: '103',
    propertyType: 'APARTMENTS',
    aggregates: {
      prices: {
        low: 1800,
        high: 1800,
      },
    },
  },
  apartmentWithEmptyPhotos: {
    listingId: '103',
    propertyType: 'APARTMENTS',
    aggregates: {
      prices: {
        low: 1800,
        high: 1800,
      },
    },
    photos: [],
  },
  inactiveListing: {
    listingId: '104',
    isActive: false,
    priceText: 'Price Unavailable',
    desktopPhone: '1231231234',
    propertyType: 'APARTMENTS',
    aggregates: {
      prices: {
        low: 1800,
        high: 1800,
      },
    },
    photos: [],
  },
}

describe('PopUpCard', () => {
  describe('apartment snapshot', () => {
    it('renders', () => {
      const wrapper = mount(<PopUpCard {...listings.apartmentSpotlight} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('house snapshot', () => {
    it('renders', () => {
      const wrapper = mount(<PopUpCard {...listings.houseWithPhotos} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('inactive snapshot', () => {
    it('renders', () => {
      const wrapper = mount(<PopUpCard {...listings.inactiveListing} />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})

describe('PopUpCard photo', () => {
  it('contains image missing class when no photos are in listing', () => {
    const wrapper = mount(<PopUpCard {...listings.apartmentWithoutPhotos} theme={theme} />)
    expect(wrapper.find('div.PopUpImage-missing').exists()).toEqual(true)
  })

  it('contains image missing class when photos are empty', () => {
    const wrapper = mount(<PopUpCard {...listings.apartmentWithEmptyPhotos} theme={theme} />)
    expect(wrapper.find('div.PopUpImage-missing').exists()).toEqual(true)
  })

  it('does not contain image missing class when photo is available', () => {
    const wrapper = mount(<PopUpCard {...listings.houseWithPhotos} theme={theme} />)
    expect(wrapper.find('div.PopUpImage-missing').exists()).toEqual(false)
  })

  it('does not contain child image when photo is not available', () => {
    const wrapper = mount(<PopUpCard {...listings.apartmentWithoutPhotos} theme={theme} />)
    expect(wrapper.find('div.PopUpImage-missing').children().length).toEqual(0)
  })
})

describe('Inactive PopupCard Info', () => {
  it('does not display Contact Property CTA and phone number', () => {
    const wrapper = shallow(<PopUpCard {...listings.inactiveListing} theme={theme} />)
    expect(wrapper.find('[data-tid="popup-contact-row"]')).toHaveLength(0)
  })
})

describe('No Price PopUpCard', () => {
  it('Does not show HOME FOR RENT label when priceText unavailable', () => {
    const wrapper = mount(<PopUpCard {...listings.houseWithNoPrice} theme={theme} />)
    expect(wrapper.find('HOME FOR RENT').exists()).toBe(false)
  })
})
