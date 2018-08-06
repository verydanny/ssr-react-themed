import React from 'react'
import { shallow } from 'enzyme'
import PageViewTracker from '../PageViewTracker'

describe('ui/shared/PageViewTracker', () => {
  const props = {
    taggingPageName: 'foo',
    route: {
      type: 'CATCHALL',
    },
    criteria: {
      city: 'Prescott',
      pageNumber: null,
      pdpSlug: null,
      loading: false,
      locationSlug: 'arizona/prescott',
      prevLocationSlug: 'arizona/prescott',
      bbox: null,
      location: {
        name: 'Prescott, AZ',
        zip: null,
        city: {
          name: 'Prescott',
          slug: 'prescott',
        },
        state: {
          name: 'Arizona',
          slug: 'arizona',
        },
        hood: null,
        marketCodes: {
          target: '38060',
        },
      },
      propertyType: null,
      refinements: {
        apartments: {
          value: true,
          slug: 'apartments',
          group: 'propertyTypes',
          key: 'apartments',
        },
        condos: {
          value: true,
          slug: 'condos',
          group: 'propertyTypes',
          key: 'condos',
        },
        houses: {
          value: true,
          slug: 'houses',
          group: 'propertyTypes',
          key: 'houses',
        },
        townhouses: {
          value: true,
          slug: 'townhouses',
          group: 'propertyTypes',
          key: 'townhouses',
        },
      },
      withSpotlights: true,
      withFeatured: true,
      withSemPhone: false,
      zoom: 10,
      center: null,
    },
    location: {
      query: {},
      pathname: '/arizona/prescott/apartments_condos_houses_townhouses',
    },
    listings: ['1', '2'],
  }

  const pageView = shallow(<PageViewTracker {...props} />).find('PageView')

  it('renders a PageView', () => {
    const expected = 1
    const actual = pageView.length
    expect(actual).toEqual(expected)
  })

  it('passes a page name', () => {
    const expected = 'foo'
    const actual = pageView.prop('page')
    expect(actual).toEqual(expected)
  })

  it('passes a pageNumber', () => {
    const expected = 1
    const actual = pageView.prop('page_number')
    expect(actual).toEqual(expected)
  })

  describe('listings_array', () => {
    describe('when listings are present', () => {
      it('passes a listings_array', () => {
        const expected = ['1', '2']
        const actual = pageView.prop('listings_array')
        expect(actual).toEqual(expected)
      })
    })

    describe('when listings are empty', () => {
      const emptyListingsProps = { ...props, listings: [] }
      const pageViewWithEmptyListings = shallow(
        <PageViewTracker {...emptyListingsProps} />
      ).find('PageView')

      it('passes "none"', () => {
        const expected = 'none'
        const actual = pageViewWithEmptyListings.prop('listings_array')
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('shouldComponentUpdate', () => {
    const instance = shallow(<PageViewTracker {...props} />).instance()

    describe('should update', () => {
      const expected = true

      fit('with only a new taggingPageName', () => {
        const actual = instance.shouldComponentUpdate({ ...props, taggingPageName: 'bob' })
        expect(actual).toEqual(expected)
      })

      it('with only new listings', () => {
        const actual = instance.shouldComponentUpdate({ ...props, listings: [3] })
        expect(actual).toEqual(expected)
      })

      it('with a partially matching larger set', () => {
        const actual = instance.shouldComponentUpdate({ ...props, listings: ['1', '2', '3', '4'] })
        expect(actual).toEqual(expected)
      })

      it('with a partially matching smaller set', () => {
        const actual = instance.shouldComponentUpdate({ ...props, listings: ['1'] })
        expect(actual).toEqual(expected)
      })
    })

    describe('should NOT update', () => {
      const expected = false

      it('with no changes', () => {
        const actual = instance.shouldComponentUpdate(props)
        expect(actual).toEqual(expected)
      })

      it('with a new array reference, but the same values', () => {
        const actual = instance.shouldComponentUpdate(Object.assign({}, props, { listings: ['1', '2'] }))
        expect(actual).toEqual(expected)
      })

      it('with only new pageNumber', () => {
        const propsWithNewPage = {
          ...props,
          location: {
            ...props.location,
            query: {
              page: 2,
            },
          },
        }
        const actual = instance.shouldComponentUpdate(propsWithNewPage)
        expect(actual).toEqual(expected)
      })

      it('with only new path', () => {
        const propsWithNewPath = {
          ...props,
          location: {
            ...props.location,
            pathname: '/arizona/prescott/apartments_condos_houses',
          },
        }
        const actual = instance.shouldComponentUpdate(propsWithNewPath)
        expect(actual).toEqual(expected)
      })

      it('with new taggingPageName and new path', () => {
        const propsWithNewPathAndPageName = {
          ...props,
          location: {
            ...props.location,
            pathname: '/arizona/prescott/apartments_condos_houses',
          },
          taggingPageName: 'bob',
        }
        const actual = instance.shouldComponentUpdate(propsWithNewPathAndPageName)
        expect(actual).toEqual(expected)
      })

      it('with new taggingPageName and new pageNumber', () => {
        const propsWithNewPageNameAndNumber = {
          ...props,
          location: {
            ...props.location,
            query: {
              page: 2,
            },
          },
          taggingPageName: 'bib',
        }
        const actual = instance.shouldComponentUpdate(propsWithNewPageNameAndNumber)
        expect(actual).toEqual(expected)
      })
    })
  })
})
