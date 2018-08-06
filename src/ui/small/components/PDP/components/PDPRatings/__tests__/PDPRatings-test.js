import React from 'react'
import { mount, shallow } from 'enzyme'
import RatingSummary from 'ui/shared/components/RatingSummary'
import CategoryRatings from 'ui/shared/components/CategoryRatings'
import AggregateRating from 'ui/shared/components/AggregateRating'
import PDPRatings from '../PDPRatings'

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

const RATING_SUMMARY = {
  numRatings: 30,
  values: [
    { name: '5', count: 18 },
    { name: '4', count: 6 },
    { name: '3', count: 3 },
    { name: '2', count: 2 },
    { name: '1', count: 1 },
  ],
}

const AVG_OVERALL_RATING = 4

const defaultProps = {
  categoryRatings: CATEGORY_RATINGS,
  ratingSummary: RATING_SUMMARY,
  avgOverallRating: AVG_OVERALL_RATING,
}

const factory = props =>
  <PDPRatings.WrappedComponent {...props} />

describe('<PDPRatings />', () => {
  it('renders', () => {
    const wrapper = shallow(factory(defaultProps))

    expect(wrapper.exists()).toBe(true)
  })

  it('renders a rating in the header', () => {
    const wrapper = mount(factory(defaultProps))

    expect(wrapper.find(AggregateRating).exists()).toBe(true)
  })

  it('does not render a rating when avgOverallRating is null', () => {
    const wrapper = mount(factory({
      avgOverallRating: null,
      ratingSummary: RATING_SUMMARY,
      categoryRatings: CATEGORY_RATINGS,
    }))

    expect(wrapper.find(AggregateRating).exists()).toBe(false)
  })

  it('renders property ratings', () => {
    const wrapper = mount(factory(defaultProps))

    expect(wrapper.find(RatingSummary).exists()).toBe(true)
  })

  it('does not render property ratings when ratingSummary is empty', () => {
    const wrapper = mount(factory({
      ratingSummary: {
        numRatings: 0,
        values: [],
      },
      avgOverallRating: AVG_OVERALL_RATING,
      categoryRatings: CATEGORY_RATINGS,
    }))

    expect(wrapper.find(RatingSummary).exists()).toBe(false)
  })

  it('renders category ratings', () => {
    const wrapper = mount(factory(defaultProps))

    expect(wrapper.find(CategoryRatings).exists()).toBe(true)
  })

  it('does not render category ratings when empty', () => {
    const wrapper = mount(factory({
      ratingSummary: RATING_SUMMARY,
      avgOverallRating: AVG_OVERALL_RATING,
      categoryRatings: [],
    }))

    expect(wrapper.find(CategoryRatings).exists()).toBe(false)
  })
})
