import { getFilteredAutocomplete as filter } from 'app/selectors/searchInput'

describe('SearchInput/filteredAutocomplete', () => {
  const item = {
    displayName: 'Houston, TX',
  }
  const defaultChoices = [item]
  const defaultExpected = [
    {
      ...item,
      highlightStart: 0,
      highlightEnd: 11,
    },
  ]

  describe('with letter-case differences', () => {
    it('ignores letter-case differences', () => {
      const expected = defaultExpected
      const actual = filter({
        searchInput: {
          currentSearch: 'houston, TX',
          suggestedLocations: defaultChoices,
        },
      })
      expect(actual).toEqual(expected)
    })
  })

  describe('with internal non-letter differences', () => {
    it('ignores internal whitespace differences', () => {
      const expected = defaultExpected
      const actual = filter({
        searchInput: {
          currentSearch: 'Houston, Tx',
          suggestedLocations: defaultChoices,
        },
      })
      expect(actual).toEqual(expected)
    })

    it('ignores internal non-letter differences', () => {
      const expected = defaultExpected
      const actual = filter({
        searchInput: {
          currentSearch: 'Houston & Tx',
          suggestedLocations: defaultChoices,
        },
      })
      expect(actual).toEqual(expected)
    })

    it('ignores internal whitespace/non-whitespace differences', () => {
      const expected = defaultExpected
      const actual = filter({
        searchInput: {
          currentSearch: 'Houston,  .Tx',
          suggestedLocations: defaultChoices,
        },
      })
      expect(actual).toEqual(expected)
    })
  })

  describe('with initial non-letter differences', () => {
    it('ignores initial whitespace differences', () => {
      const expected = defaultExpected
      const actual = filter({
        searchInput: {
          currentSearch: ' Houston, Tx',
          suggestedLocations: defaultChoices,
        },
      })
      expect(actual).toEqual(expected)
    })

    it('ignores initial non-whitespace, non-letter differences', () => {
      const expected = defaultExpected
      const actual = filter({
        searchInput: {
          currentSearch: '&Houston, Tx',
          suggestedLocations: defaultChoices,
        },
      })
      expect(actual).toEqual(expected)
    })
  })

  describe('with trailing non-letter differences', () => {
    const choices = [
      {
        displayName: 'Saint Louis, MO',
      },
      {
        displayName: 'Saint Louis Park, MN',
      },
      {
        displayName: 'Saint Louis Christian College, MO',
      },
      {
        displayName: 'Saint Louis Community College, MO',
      },
      {
        displayName: 'Saint Louis College of Pharmacy, MO',
      },
      {
        displayName: 'Saint Louis University, MO',
      },
      {
        displayName: 'Saint Louisville, OH',
      },
      {
        displayName: 'Saint Louisvl, OH',
      },
      {
        displayName: 'Saint Louis, MI',
      },
    ]

    it('ignores trailing whitespace differences', () => {
      const expected = choices.map(c => ({
        ...c,
        highlightStart: 0,
        highlightEnd: 11,
      }))
      const actual = filter({
        searchInput: {
          currentSearch: 'Saint Louis ',
          suggestedLocations: choices,
        },
      })
      expect(actual).toEqual(expected)
    })

    it('ignores trailing non-whitespace, non-letter differences', () => {
      const expected = choices.map(c => ({
        ...c,
        highlightStart: 0,
        highlightEnd: 11,
      }))
      const actual = filter({
        searchInput: {
          currentSearch: 'Saint Louis &',
          suggestedLocations: choices,
        },
      })
      expect(actual).toEqual(expected)
    })
  })

  describe('with unexpected arguments', () => {
    const expected = []
    const choices = [{ displayName: 'Saint Louis, MO' }]

    it('handles null choices', () => {
      const actual = filter({
        searchInput: {
          currentSearch: 'Saint Louis ',
          suggestedLocations: null,
        },
      })
      expect(actual).toEqual(expected)
    })

    it('handles undefined choices', () => {
      const actual = filter({
        searchInput: {
          currentSearch: 'Saint Louis ',
        },
      })
      expect(actual).toEqual(expected)
    })

    it('handles undefined input', () => {
      const actual = filter({
        searchInput: {
          currentSearch: undefined,
          suggestedLocations: choices,
        },
      })
      expect(actual).toEqual(expected)
    })

    it('handles null input', () => {
      const filteredChoices = filter({
        searchInput: {
          currentSearch: null,
          suggestedLocations: choices,
        },
      })
      expect(filteredChoices).toEqual(expected)
    })
  })
})
