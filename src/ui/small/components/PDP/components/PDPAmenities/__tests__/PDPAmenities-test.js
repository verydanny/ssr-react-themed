import React from 'react'
import { shallow } from 'enzyme'
import PDPAmenities, { getAmenitiesLength } from '../PDPAmenities'

const defaultProps = {}

const factory = props =>
  <PDPAmenities.WrappedComponent {...defaultProps} {...props} />

describe('<PDPAmenities />', () => {
  it('should render', () => {
    const wrapper = shallow(factory())

    expect(wrapper.exists()).toBe(true)
  })

  it('should display the correct count of total amenities', () => {
    const mockAmenities = {
      Pets: [
        'Pets',
        'Pet Park',
      ],
      Features: [
        'Air Conditioning',
        'Ceiling Fan',
      ],
      Community: [
        'Trails for biking, hiking, and jogging',
      ],
      Additional: [
        'additional1',
        'additional2',
        'additional3',
      ],
    }

    const expectedLength = 8

    expect(getAmenitiesLength(mockAmenities)).toBe(expectedLength)
  })
})
