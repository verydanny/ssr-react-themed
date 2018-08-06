import React from 'react'
import { shallow } from 'enzyme'
import { PAGE_SIZE } from 'app/graphql/small/queries'
import PaginateResultsButton from '../PaginateResultsButton'
import ThemedListings from '../Listings'

const Listings = ThemedListings.WrappedComponent

describe('small/ListingCard/Listings', () => {
  const listings = [{
    propertyLabel: 'foo',
    listingId: '123',
    photos: [],
  }, {
    propertyLabel: 'bar',
    listingId: '456',
    photos: [],
  }]

  describe('when on map', () => {
    const props = {
      theme: {},
      viewType: 'map',
      selectListing: jest.fn(),
      selectedListingId: '123',
      listings,
      selectPin: jest.fn(),
      gotoPreviousPage: jest.fn(),
      previousPageLink: '/georgia/atlanta-apartments?page=2',
      nextPageLink: '/georgia/atlanta-apartments?page=4',
    }

    describe('selectListingFromGallery', () => {
      it('calls selectListing(id) after change', () => {
        const wrapper = shallow(<Listings {...props} />)
        const instance = wrapper.instance()
        const nextSlideIndex = 1
        instance.selectListingFromGallery(nextSlideIndex)
        expect(props.selectListing).toHaveBeenCalledWith(
          props.listings[nextSlideIndex].listingId
        )
      })

      // there is no previous card on the map, for now at least
      it.skip('clears selectedListingId when sliding to the "prev" Card', () => {
        const pageTwoProps = { ...props, pageNumber: 2 }
        const wrapper = shallow(<Listings {...pageTwoProps} />)
        const instance = wrapper.instance()
        const nextSlideIndex = 0
        instance.selectListingFromGallery(nextSlideIndex)
        expect(props.selectListing).toHaveBeenCalledWith(null)
      })

      // there is no next card on the map, for now at least
      it.skip('clears selectedListingId when sliding to the "next" Card', () => {
        const wrapper = shallow(<Listings {...props} />)
        const instance = wrapper.find(Listings).instance()
        const nextSlideIndex = props.listings.length
        instance.selectListingFromGallery(nextSlideIndex)
        expect(props.selectListing).toHaveBeenCalledWith(null)
      })
    })

    // TODO: restore pagination on map
    describe.skip('Pagination', () => {
      const prevButtonSelector = 'button[data-tid="load-prev-map"]'
      const nextButtonSelector = 'button[data-tid="load-more-map"]'

      describe.skip('When there are more listings on page 1', () => {
        let wrapper
        let buttons
        const pageProps = {
          ...props,
          pageNumber: 1,
          total: PAGE_SIZE * 2,
        }

        beforeEach(() => {
          wrapper = shallow(<Listings {...pageProps} />)
          buttons = wrapper.find('PaginateResultsCard')
        })

        it('adds a load next card', () => {
          expect(buttons.find(nextButtonSelector)).toHaveLength(1)
        })

        it('does not add a load previous card', () => {
          expect(buttons.find(prevButtonSelector)).toHaveLength(0)
        })
      })

      describe.skip('When on page > 1 with no more listings', () => {
        let buttons
        const pageTwoProps = { ...props, pageNumber: 2, total: PAGE_SIZE * 2 }
        beforeEach(() => {
          buttons = shallow(<Listings {...pageTwoProps} />).find('PaginateResultsCard')
        })

        it('adds a load previous card', () => {
          expect(buttons.find(prevButtonSelector)).toHaveLength(1)
        })

        it('does not add a load next card', () => {
          expect(buttons.find(nextButtonSelector)).toHaveLength(0)
        })
      })

      describe('When on page > 1 with more listings', () => {
        let buttons
        const pageTwoProps = {
          ...props,
          pageNumber: 2,
          total: (PAGE_SIZE * 2) + 1,
        }
        beforeEach(() => {
          buttons = shallow(<Listings {...pageTwoProps} />).find('PaginateResultsCard')
        })

        it('adds a load next card', () => {
          expect(buttons.find(nextButtonSelector)).toHaveLength(1)
        })

        it('adds a load previous card', () => {
          expect(buttons.find(prevButtonSelector)).toHaveLength(1)
        })
      })
    })
  })

  describe('when on list', () => {
    const props = {
      viewType: 'list',
      currentView: 'list',
      listings,
      updateActiveListViewChange: jest.fn(),
      previousPageLink: '/georgia/atlanta-apartments?page=2',
      nextPageLink: '/georgia/atlanta-apartments?page=4',
      selectListing: () => {},
    }

    it('does not have the map listings rendered', () => {
      const wrapper = shallow(<Listings {...props} />)
      expect(wrapper.find('[data-tid="map-listings"]')).toHaveLength(0)
    })

    describe('Pagination', () => {
      describe('When there are more listings on page 1', () => {
        const pageProps = { ...props, pageNumber: 1, total: PAGE_SIZE * 2 }

        it('adds a load next button', () => {
          const wrapper = shallow(<Listings {...pageProps} />)
          expect(wrapper.find(PaginateResultsButton).find({ more: true })).toHaveLength(1)
        })

        it('does not add a load previous button', () => {
          const wrapper = shallow(<Listings {...pageProps} />)
          expect(wrapper.find(PaginateResultsButton).findWhere(n => !n.prop('more'))).toHaveLength(0)
        })
      })

      describe('When on page 2 with no more listings', () => {
        const pageTwoProps = {
          ...props,
          pageNumber: 2,
          total: PAGE_SIZE * 2,
        }

        it('adds a load previous button', () => {
          const wrapper = shallow(<Listings {...pageTwoProps} />)
          expect(wrapper.find(PaginateResultsButton).findWhere(n => !n.prop('more'))).toHaveLength(1)
        })

        it('does not add a load next button', () => {
          const wrapper = shallow(<Listings {...pageTwoProps} />)
          expect(wrapper.find(PaginateResultsButton).find({ more: true })).toHaveLength(0)
        })
      })

      describe('When on page > 1 with more listings', () => {
        const pageTwoProps = {
          ...props,
          pageNumber: 2,
          total: (PAGE_SIZE * 3) + 1,
        }

        it('adds a load next button', () => {
          const wrapper = shallow(<Listings {...pageTwoProps} />)
          expect(wrapper.find(PaginateResultsButton).find({ more: true })).toHaveLength(1)
        })

        it('adds a load previous button', () => {
          const wrapper = shallow(<Listings {...pageTwoProps} />)
          expect(wrapper.find(PaginateResultsButton).findWhere(n => !n.prop('more'))).toHaveLength(1)
        })
      })
    })
  })
})
