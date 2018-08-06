import React from 'react'
import { shallow } from 'enzyme'
import WrappedSeoContent from '../SeoContent'

const SeoContent = WrappedSeoContent.WrappedComponent

describe('SeoContent', () => {
  const props = {
    apartmentLinks: {},
    propertyTypeLinks: {},
    cityLinks: {},
    neighborhoods: {},
  }

  it('displays nearby colleges if shouldDisplayNearbyColleges is true', () => {
    const wrapper = shallow(<SeoContent {...props} shouldDisplayNearbyColleges />)
    expect(wrapper).toMatchSnapshot()
  })

  it('does not display nearby colleges if shouldDisplayNearbyColleges is false', () => {
    const wrapper = shallow(<SeoContent {...props} shouldDisplayNearbyColleges={false} />)
    expect(wrapper).toMatchSnapshot()
  })
})
