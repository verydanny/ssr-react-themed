import React from 'react'
import { shallow } from 'enzyme'
import ThemedCateogryRatings from '../CategoryRatings'

const CategoryRatings = ThemedCateogryRatings.WrappedComponent

const CATEGORY_RATINGS = [
  {
    avgRating: 0,
    category: 'Location',
  },
  {
    avgRating: 4.3,
    category: 'Value for the Money',
  },
  {
    avgRating: 4.8,
    category: 'Maintenance',
  },
  {
    avgRating: 4.8,
    category: 'Office Staff',
  },
  {
    avgRating: 0,
    category: 'Landscaping',
  },
  {
    avgRating: 4.7,
    category: 'Building Exterior',
  },
  {
    avgRating: 4.7,
    category: 'Move-in Condition',
  },
  {
    avgRating: 4.7,
    category: 'Parking Availability',
  },
  {
    avgRating: 0,
    category: 'Recreational Facilities',
  },
]

describe('CategoryRatings', () => {
  describe('when categories > 0', () => {
    it('renders category ratings', () => {
      const wrapper = shallow(<CategoryRatings categories={CATEGORY_RATINGS} />)

      expect(wrapper.children()).toHaveLength(CATEGORY_RATINGS.length)
    })
  })

  describe('when categories are empty', () => {
    it('does not render category ratings', () => {
      const wrapper = shallow(<CategoryRatings categories={[]} />)

      expect(wrapper.children()).toHaveLength(0)
    })
  })
})
