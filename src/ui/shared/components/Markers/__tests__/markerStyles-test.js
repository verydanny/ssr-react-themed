import { markerNormalIcon, markerSelectedIcon } from '../markerStyles'

const paidIcon = {
  isPaid: true,
  isActive: true,
}

const unpaidIcon = {
  isPaid: false,
  isActive: true,
}

const inactiveIcon = {
  isPaid: false,
  isActive: false,
}

describe('ui/shared/components/Markers/markerStyles', () => {
  describe('markerNormalIcon', () => {
    it('returns the paid normal icon', () => {
      expect(markerNormalIcon(paidIcon)).toMatchSnapshot()
    })

    it('returns the unpaid normal icon', () => {
      expect(markerNormalIcon(unpaidIcon)).toMatchSnapshot()
    })

    it('returns the inactive normal icon', () => {
      expect(markerNormalIcon(inactiveIcon)).toMatchSnapshot()
    })
  })

  describe('markerSelectedIcon', () => {
    it('returns the active paid selected icon when isPaid is true', () => {
      expect(markerSelectedIcon(true)).toMatchSnapshot()
    })

    it('returns the active unpaid selected icon when isPaid is false', () => {
      expect(markerSelectedIcon(false)).toMatchSnapshot()
    })

    it('returns the inactive selected icon when isPaid is false', () => {
      expect(markerSelectedIcon(false)).toMatchSnapshot()
    })
  })
})
