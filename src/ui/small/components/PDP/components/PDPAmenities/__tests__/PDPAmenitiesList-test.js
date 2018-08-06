import React from 'react'
import { shallow } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import PDPAmenityList from '../PDPAmenityList'

const theme = keyMirror([
  'PDPSectionList',
  'PDPSectionList_Category',
])

const defaultProps = {
  amenities: ['Amenity One', 'Amenity Two'],
  category: 'TestCategory',
  theme,
}

const factory = props =>
  <PDPAmenityList.WrappedComponent {...defaultProps} {...props} />

describe('<PDPAmenityList />', () => {
  it('should render', () => {
    shallow(factory())
  })

  it('should display the category', () => {
    const wrapper = shallow(factory())
    const category = wrapper.find('.PDPSectionList_Category')

    expect(category.text()).toEqual(defaultProps.category)
  })
})
