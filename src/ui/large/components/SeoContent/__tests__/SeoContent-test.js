import React from 'react'
import { shallow } from 'enzyme'
import { DfpAdSlot } from 'ui/shared/components/DfpAdSlot'
import WrappedSeoContent from '../SeoContent'

const SeoContent = WrappedSeoContent.WrappedComponent

describe('SeoContent', () => {
  const prop = { links: [], maxLinksShowing: 5 }
  const props = {
    apartmentLinks: [],
    propertyTypeLinks: prop,
    cityLinks: prop,
    neighborhoods: prop,
    localInfoBody: 'localInfoBody',
    propertyType: 'propertyType',
    colleges: [],
    militaryBases: [],
    shouldDisplayLocalInfo: true,
    theme: {},
  }

  const setupShallow = overrideProps => {
    const setupProps = { ...props, ...overrideProps }
    return shallow(<SeoContent {...setupProps} />)
  }

  describe('apartmentLinks or propertyTypeLinks', () => {
    let wrapper

    beforeEach(() => {
      wrapper = setupShallow()
    })

    it('does not render if there are none', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('localInfoBody', () => {
    describe('when shouldDisplayLocalInfo is true', () => {
      it('renders', () => {
        const wrapper = setupShallow({ shouldDisplayLocalInfo: true })
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when shouldDisplayLocalInfo is false', () => {
      it('does not render', () => {
        const wrapper = setupShallow({ shouldDisplayLocalInfo: false })
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('nearby colleges', () => {
    it('displays nearby colleges if shouldDisplayNearbyColleges is true', () => {
      const wrapper = setupShallow({ shouldDisplayNearbyColleges: true })
      expect(wrapper).toMatchSnapshot()
    })

    it('does not display nearby colleges if shouldDisplayNearbyColleges is false', () => {
      const wrapper = setupShallow({ shouldDisplayNearbyColleges: false })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('advertisement', () => {
    it('appears on the page', () => {
      const wrapper = setupShallow()
      expect(wrapper.find(DfpAdSlot)).toHaveLength(2)
    })
  })
})
