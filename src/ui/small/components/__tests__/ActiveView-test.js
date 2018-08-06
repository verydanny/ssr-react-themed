import { getTaggingPageName } from 'app/selectors/tagging'

describe('small/ActiveView', () => {
  describe('tagging', () => {
    describe('when on the map srp', () => {
      const props = {
        currentView: 'map',
        previousView: 'filters',
        loadedViews: {
          map: true,
        },
        updateViews: () => true,
        selectListing: () => {},
        taggingPageName: 'srp_map',
      }

      it('passes the proper taggingPageName', () => {
        const expected = 'srp_map'
        const actual = getTaggingPageName({ page: props })
        expect(actual).toEqual(expected)
      })
    })

    describe('when on the list srp', () => {
      const props = {
        currentView: 'list',
        previousView: 'filters',
        loadedViews: {
          list: true,
        },
        updateViews: () => true,
        selectListing: () => {},
        taggingPageName: 'srp',
      }

      it('passes the proper taggingPageName', () => {
        const expected = 'srp'
        const actual = getTaggingPageName({ page: props })
        expect(actual).toEqual(expected)
      })
    })

    describe('when on the filters page', () => {
      const props = {
        currentView: 'filters',
        previousView: 'list',
        loadedViews: {
          list: true,
        },
        updateViews: () => true,
        selectListing: () => {},
        taggingPageName: 'srp',
      }

      it('passes the proper taggingPageName', () => {
        const expected = 'srp'
        const actual = getTaggingPageName({ page: props })
        expect(actual).toEqual(expected)
      })
    })
  })
})
