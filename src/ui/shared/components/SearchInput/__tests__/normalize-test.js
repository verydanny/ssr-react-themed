import { locationName as normalizeLocation } from '../normalize'

describe('SearchInput/normalize/locationName()', () => {
  it('strips the state from a zip location name', () => {
    const term = normalizeLocation('27713, NC')
    expect(term).toEqual('27713')
  })

  it('preserves city/state location names', () => {
    const term = normalizeLocation('Durham, NC')
    expect(term).toEqual('Durham, NC')
  })

  it('preserves neighborhood/city/state loaction terms', () => {
    const term = normalizeLocation('Woodcroft, Durham, NC')
    expect(term).toEqual('Woodcroft, Durham, NC')
  })

  it('returns an empty string when term is not provided', () => {
    const expected = ''
    const actual = normalizeLocation()
    expect(actual).toEqual(expected)
  })
})
