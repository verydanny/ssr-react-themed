import React from 'react'
import { mount, shallow } from 'enzyme'
import {
  unitAvailTextSelector,
  priceTextSelector,
  bedTextSelector,
  bathTextSelector,
} from 'app/selectors/listingInfo'
import { getShowPhone } from 'app/selectors/listings'
import ListingInfo from '../ListingInfo'

const theme = {
  Property_RecentChange: 'Property_RecentChange',
  Property_UnitsSpecials: 'Property_UnitsSpecials',
}
const listings = [
  {
    propertyType: 'HOUSE',
    phone: '(470) 881-5188',
  },
  {
    propertyType: 'APARTMENTS',
    avgOverallRating: 3,
    numRatings: 30,
    isPaid: true,
    isActive: true,
    aggregates: {
      prices: {
        low: 1250,
        high: 1800,
      },
      totalAvailable: 1,
    },
  },
  {
    propertyType: 'APARTMENTS',
    desktopPhone: '(370) 881-4189',
    noVacancy: false,
    isPaid: true,
    isActive: true,
    aggregates: {
      beds: {
        low: 1,
        high: 3,
      },
      baths: {
        low: 1,
        high: 3,
      },
      totalAvailable: 12,
    },
  },
  {
    propertyType: 'APARTMENTS',
    phone: '(270) 881-5480',
    isPaid: true,
    isActive: true,
    aggregates: {
      totalAvailable: 4,
    },
  },
]
const inactiveListing = {
  listingId: '104',
  propertyType: 'APARTMENTS',
  phone: '(370) 881-4189',
  noVacancy: false,
  isActive: false,
  aggregates: {
    beds: {
      low: 1,
      high: 3,
    },
    baths: {
      low: 1,
      high: 3,
    },
    totalAvailable: 12,
  },
}

describe('ListingInfo check Home/Apt', () => {
  it('Property Home check', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[0].propertyType}
        phone={listings[0].phone}
        theme={theme}
      />
    )
    expect(wrapper.text()).toContain('HOME FOR RENT')
  })
  it('Property Apt listing check', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[1].propertyType}
        unitAvailText={unitAvailTextSelector(listings[1])}
        theme={theme}
      />
    )
    expect(wrapper.text()).toContain('1 unit available')
  })
  it('Apt rating check', () => {
    const wrapper = shallow(
      <ListingInfo
        propertyType={listings[1].propertyType}
        numRatings={listings[1].numRatings}
        avgOverallRating={listings[1].avgOverallRating}
        theme={theme}
      />
    )
    expect(wrapper.html()).toContain('width:60%')
  })
  it('Phone check Apt', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[1].propertyType}
        numRatings={listings[1].numRatings}
        avgOverallRating={listings[1].avgOverallRating}
        theme={theme}
      />
    )
    expect(wrapper.text()).toContain('Available Now')
  })
  it('Phone check Apt', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[2].propertyType}
        theme={theme}
        phone={listings[2].desktopPhone}
        showPhone={getShowPhone(listings[2])}
        noVacancy={listings[2].noVacancy}
        isPaid={listings[2].isPaid}
      />
    )
    expect(wrapper.text()).toContain('(370) 881-4189')
  })
})

describe('Units Available Validation', () => {
  it('4 Units', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[3].propertyType}
        theme={theme}
        phone={listings[3].phone}
        unitAvailText={unitAvailTextSelector(listings[3])}
      />
    )
    expect(wrapper.text()).toContain('4 units available')
  })
  it('11 Units', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[2].propertyType}
        theme={theme}
        phone={listings[2].phone}
        unitAvailText={unitAvailTextSelector(listings[2])}
      />
    )
    expect(wrapper.text()).toContain('10+ units available')
  })
})

describe('Bed & Bath Text Validation', () => {
  it('Beds check', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[2].propertyType}
        theme={theme}
        phone={listings[2].phone}
        beds={bedTextSelector(listings[2])}
      />
    )
    expect(wrapper.text()).toContain('1–3 Beds')
  })
  it('Baths check', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[2].propertyType}
        theme={theme}
        phone={listings[2].phone}
        baths={bathTextSelector(listings[2])}
      />
    )
    expect(wrapper.text()).toContain('1–3 Baths')
  })
})

describe('Price Text Validation', () => {
  it('Price check', () => {
    const wrapper = mount(
      <ListingInfo
        propertyType={listings[1].propertyType}
        theme={theme}
        phone={listings[1].phone}
        priceText={priceTextSelector(listings[1])}
      />
    )
    expect(wrapper.text()).toContain('$1,250+')
  })
})

describe('Recently updated', () => {
  describe('recently updated is not set', () => {
    const wrapper = mount(
      <ListingInfo
        listingId={listings[1].listingId}
        propertyType={listings[1].propertyType}
        theme={theme}
        phone={listings[1].phone}
      />
    )
    const section = wrapper.find(`.${theme.Property_RecentChange}`)
    it('does not contain a recently updated section', () => {
      expect(section.length).toBe(0)
    })
  })
  describe('recently updated is set', () => {
    const text = 'Updated 2 days ago'
    const wrapper = mount(
      <ListingInfo
        listingId={listings[1].listingId}
        propertyType={listings[1].propertyType}
        theme={theme}
        phone={listings[1].phone}
        recentlyUpdated={text}
      />
    )
    const section = wrapper.find(`.${theme.Property_RecentChange}`)
    it('contains a recently updated section', () => {
      expect(section.length).toBe(1)
    })
    it('contains the recently updated text', () => {
      expect(section.text()).toBe(text)
    })
  })
})

describe('Available Units', () => {
  describe('available units is not set', () => {
    const wrapper = mount(
      <ListingInfo
        listingId={listings[1].listingId}
        propertyType={listings[1].propertyType}
        theme={theme}
        phone={listings[1].phone}
      />
    )
    const section = wrapper.find(`.${theme.Property_UnitsSpecials}`)
    it('does not contain an available units section', () => {
      expect(section.length).toBe(0)
    })
  })
  describe('available units is set', () => {
    const text = '10+ units available'
    const wrapper = mount(
      <ListingInfo
        listingId={listings[1].listingId}
        propertyType={listings[1].propertyType}
        theme={theme}
        phone={listings[1].phone}
        unitAvailText={text}
      />
    )
    const section = wrapper.find(`.${theme.Property_UnitsSpecials}`)
    it('contains an available units section', () => {
      expect(section.length).toBe(1)
    })
    it('contains the available units text', () => {
      expect(section.text()).toBe(text)
    })
  })
})

describe('Inactive Propreties', () => {
  it('has "Price Unavailable, no bed ranges, no "# of units", no update times, no CTA, and no phone', () => {
    const wrapper = shallow(
      <ListingInfo
        listingId={inactiveListing.listingId}
        propertyType={inactiveListing.propertyType}
        theme={theme}
        phone={inactiveListing.phone}
        priceText={priceTextSelector(inactiveListing)}
        isActive={inactiveListing.isActive}
      />
    )
    expect(wrapper.html()).toContain('Price Unavailable')
    expect(wrapper.html()).not.toContain('Bath')
    expect(wrapper.html()).not.toContain('units available')
    expect(wrapper.html()).not.toContain('updated')
    expect(wrapper.html()).not.toContain('(370) 881-4189')
  })
})
