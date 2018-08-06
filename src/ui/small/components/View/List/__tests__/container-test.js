import React from 'react'
import { createMockStore } from 'mocks'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Container from '../container'

describe('View/List/container', () => {
  const state = {
    ads: {
      rendered: [
        'gpt_list_srp_mobile_footer',
      ],
    },
    criteria: {
      bbox: null,
      center: {
        lat: 34.0522,
        lng: -118.2428,
      },
      city: 'Los Angeles',
      pageNumber: null,
      locationSlug: 'california/los-angeles',
      location: {
        name: 'Los Angeles, CA',
        zip: null,
        city: {
          name: 'Los Angeles',
          slug: 'los-angeles',
        },
        state: {
          name: 'California',
          slug: 'california',
        },
        hood: null,
        marketCodes: {
          target: '31084',
        },
      },
      propertyType: 'apartments',
      refinements: {
        apartments: {
          value: true,
          slug: 'apartments',
          group: 'propertyTypes',
          key: 'apartments',
        },
      },
      withSpotlights: true,
      withSemPhone: false,
      zoom: 10,
    },
    leads: {
      lastSuccessful: null,
    },
    listings: {
      clientListingsLoaded: false,
      listings: [
        {
          address: '888 S Olive Street',
          city: 'Los Angeles',
          state: 'California',
          zipCode: '90014',
          aggregates: {
            prices: {
              low: 3900,
              high: 13950,
            },
            beds: {
              low: 1,
              high: 3,
            },
            baths: {
              low: 1,
              high: 3,
            },
            totalAvailable: 0,
          },
          avgOverallRating: null,
          endecaId: '100057144_1355674',
          isPaid: true,
          isCurrentSpotlight: true,
          listingId: '100057144',
          listingSeoPath: 'california/los-angeles-apartments/level-furnished-living-4-100057144',
          mPhone: '2135684259',
          nearbyListings: [
            '100064864',
            '100030560',
            '711760',
            '100065636',
          ],
          noVacancy: false,
          numRatings: null,
          photos: [
            {
              path: 'imgr/2576db62ffa153ebef00317a5c68a368/',
              caption: null,
            },
          ],
          propertyName: 'LEVEL Furnished Living',
          propertyLabel: 'LEVEL Furnished Living',
          recommendedListings: [
            '100062554',
            '100048258',
            '438022',
            '100057522',
          ],
          revenue: '0',
          tplSource: 'MYADS',
        },
      ],
      recommended: [],
      selectedListingId: '100057144',
      selectedPinData: null,
      selectedListingOptions: {},
      total: 878,
      viewportListingIds: ['100057144'],
      loading: false,
      loadingOptions: {},
    },
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
      listingCount: 878,
      targetCode: '31084',
      robots: null,
      canonicalUri: null,
      title: 'Apartments for Rent in Los Angeles, CA | Los Angeles Apartments | Rent.com®',
      description: 'View apartments for rent in Los Angeles, CA. 878 Apartments rental listings are currently available. Compare rentals, see map views and save your favorite apartments.',
      localInfoBody: '<h2>Overview of Los Angeles</h2>',
      headline: null,
    },
    page: {
      currentView: 'list',
      previousView: 'map',
      viewDisabled: null,
      loadedViews: {
        map: false,
        list: true,
        filters: false,
      },
      viewDefinitions: {
        mainView: 'list',
        alternateView: 'map',
      },
    },
    request: {
      displaySize: 'small',
    },
    modal: {
      openModals: [],
    },
    router: {
      route: {
        path: {
          keys: [
            {
              name: 0,
              prefix: null,
              delimiter: null,
              optional: false,
              repeat: false,
              partial: false,
              asterisk: false,
              pattern: null,
            },
          ],
        },
        name: 'SEARCH_RESULTS_PAGE',
        type: 'CATCHALL',
        loading: false,
        status: 200,
      },
      params: {
        0: 'california',
      },
      location: {
        host: 'local.rentjs.com',
        hash: '',
        search: '',
        hostname: 'local.rentjs.com',
        pathname: '/california/los-angeles-apartments',
        protocol: 'http:',
        query: {},
        href: 'http://local.rentjs.com/california/los-angeles-apartments',
      },
    },
    searchInput: {
      currentSearch: '',
      displayName: '',
      suggestedLocations: [],
      showCurrentLocation: false,
    },
    nearby: {
      neighborhoods: [
        {
          displayName: 'Central La',
          url: '/california/los-angeles-apartments/central-la-neighborhood',
        },
      ],
      colleges: [
        {
          displayName: 'Fullerton College, CA',
          url: '/california/fullerton-college-apartments',
        },
      ],
      militaryBases: [
        {
          displayName: 'Los Angeles Air Force Base, CA',
          url: '/california/los-angeles-air-force-base-apartments',
        },
      ],
    },
    apartmentLinks: {
      total: 878,
      bedrooms: [
        {
          id: 6051,
          name: 'Studio',
          count: 313,
        },
      ],
      petCategory: [
        {
          name: 'No Pets',
          count: 126,
        },
      ],
      amenities: [
        {
          id: 5846,
          name: 'Corporate Billing Available',
          count: 56,
        },
      ],
    },
    propertyTypeLinks: {
      apartments: 878,
      condo: 14,
      duplex: 4,
      house: 1773,
      townhome: 2,
      houses: 1777,
    },
    filterForm: {
      filterCriteria: {},
      filterTotal: null,
    },
    experiments: {
      running: [
        {
          experiment: {
            name: 'Disable_Optimizely_Web',
            id: '10368677955',
          },
          variation: {
            name: 'DISABLE_OPTIMIZELY_WEB',
            id: '10396223712',
          },
        },
      ],
      activeFeatures: [
        'DISABLE_OPTIMIZELY_WEB',
        'listDefaultSRP',
        'RJS_Control',
        'RJS_List',
        'ATE_Control',
        'DTE_control',
        'BMF_Grey_BG',
        'DTE_Variation_3',
      ],
    },
    shape: {},
  }

  describe('when passing props', () => {
    const store = createMockStore(state)
    const wrapper = mount(<Provider store={store}><Container /></Provider>)
    const wrapped = wrapper.find('ListView')

    it('receives title', () => {
      const expected = state.meta.title
      const actual = wrapped.prop('title')
      expect(actual).toEqual(expected)
    })

    it('receives city', () => {
      const expected = state.criteria.location.city.name
      const actual = wrapped.prop('city')
      expect(actual).toEqual(expected)
    })

    it('receives count', () => {
      const expected = 0
      const actual = wrapped.prop('count')
      expect(actual).toEqual(expected)
    })

    it('receives currentView', () => {
      const expected = 'list'
      const actual = wrapped.prop('currentView')
      expect(actual).toEqual(expected)
    })

    it('receives hidden', () => {
      const expected = false
      const actual = wrapped.prop('hidden')
      expect(actual).toEqual(expected)
    })

    it('receives listings', () => {
      const expected = state.listings.listings
      const actual = wrapped.prop('listings')
      expect(actual).toEqual(expected)
    })

    it('receives loading', () => {
      const expected = false
      const actual = wrapped.prop('loading')
      expect(actual).toEqual(expected)
    })

    it('receives loadingOptions', () => {
      const expected = {}
      const actual = wrapped.prop('loadingOptions')
      expect(actual).toEqual(expected)
    })

    it('receives nextPageLink', () => {
      const expected = '/california/los-angeles-apartments?page=2'
      const actual = wrapped.prop('nextPageLink')
      expect(actual).toEqual(expected)
    })

    it('receives pageNumber', () => {
      const expected = 1
      const actual = wrapped.prop('pageNumber')
      expect(actual).toEqual(expected)
    })

    it('receives previousPageLink', () => {
      const expected = '/california/los-angeles-apartments'
      const actual = wrapped.prop('previousPageLink')
      expect(actual).toEqual(expected)
    })

    it('receives query', () => {
      const expected = {}
      const actual = wrapped.prop('query')
      expect(actual).toEqual(expected)
    })

    it('receives selectedListingId', () => {
      const expected = '100057144'
      const actual = wrapped.prop('selectedListingId')
      expect(actual).toEqual(expected)
    })

    it('receives total', () => {
      const expected = 878
      const actual = wrapped.prop('total')
      expect(actual).toEqual(expected)
    })

    it('receives viewportListingIds', () => {
      const expected = state.listings.viewportListingIds
      const actual = wrapped.prop('viewportListingIds')
      expect(actual).toEqual(expected)
    })

    it('receives refinementCriteria', () => {
      const expected = state.criteria.refinements
      const actual = wrapped.prop('refinementCriteria')
      expect(actual).toEqual(expected)
    })

    it('receives locationSlug', () => {
      const expected = 'california/los-angeles'
      const actual = wrapped.prop('locationSlug')
      expect(actual).toEqual(expected)
    })

    it('receives propertyType', () => {
      const expected = 'apartments'
      const actual = wrapped.prop('propertyType')
      expect(actual).toEqual(expected)
    })

    it('receives searchType', () => {
      const expected = 'CATCHALL'
      const actual = wrapped.prop('searchType')
      expect(actual).toEqual(expected)
    })

    it('receives uri', () => {
      const expected = '/california/los-angeles-apartments'
      const actual = wrapped.prop('uri')
      expect(actual).toEqual(expected)
    })
  })
})
