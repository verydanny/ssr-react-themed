import {
  getCenter as getCenterSelector,
} from 'app/selectors/map'

const BIG_PIN = {
  url: '/map-pin.png',
  scaledSize: { width: 17, height: 17 },
}

const SMALL_PIN = {
  url: '/map-pin.png',
  scaledSize: { width: 12, height: 12 },
}

const getPin = ({ properties }) => ({
  icon: properties.isPaid
    ? BIG_PIN
    : SMALL_PIN,
})

const basicProps = {
  currentView: 'map',
  listings: [{
    propertyLabel: 'foo',
    listingId: '123',
    photos: [],
  }, {
    propertyLabel: 'bar',
    listingId: '456',
    photos: [],
  }, {
    propertyLabel: 'los',
    listingId: '356',
    photos: [],
  }],
  calculatedPoints: {
    paid: [],
    unpaid: [],
  },
  points: jest.object,
  selectListing: jest.fn(),
  selectedListing: '1',
  toggleView: jest.fn(),
  pathname: '',
  query: jest.object,
  views: {
    filters: {},
    list: {},
    map: {},
  },
  city: 'Atlanta',
  count: 3,
  total: 20,
  center: {
    lat: 24,
    lng: 27,
  },
  spotlightId: '1',
  pageNumber: 1,
  bbox: null,
  viewportListingIds: null,
  activeCard: jest.fn(),
}

describe.skip('Passing of center prop', () => {
  it('Use center if no bbox exist', () => {
    const center = getCenterSelector({ criteria: basicProps })
    expect(center).toBe(basicProps.center)
  })
  it('Use center if bbox exists', () => {
    const props = { ...basicProps, bbox: [10, 20, 40, 50] }
    const center = getCenterSelector({ criteria: props })
    expect(center).toBe(basicProps.center)
  })
})

describe('ui/small/components/View/Map/MapView', () => {
  it('returns big pin for paid property', () => {
    const pin = getPin({ properties: { isPaid: true } })
    const actual = { icon: BIG_PIN }
    expect(actual).toEqual(pin)
  })

  it('returns small pin for unpaid property', () => {
    const pin = getPin({ properties: { isPaid: false } })
    const actual = { icon: SMALL_PIN }
    expect(actual).toEqual(pin)
  })
})
