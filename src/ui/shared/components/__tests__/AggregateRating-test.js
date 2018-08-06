import React from 'react'
import { shallow } from 'enzyme'
import { RatingBar } from '@rentpath/react-ui-core'
import ThemedAggregateRating from '../AggregateRating'

const AggregateRating = ThemedAggregateRating.WrappedComponent

describe('AggregateRating', () => {
  const propsWithRating = (avgOverallRating, numRatings = 1) => ({
    listing: {
      listingId: '1',
      avgOverallRating,
      numRatings,
    },
  })

  describe('numRatings', () => {
    describe('when > 0', () => {
      it('renders a rating', () => {
        const wrapper = shallow(<AggregateRating {...propsWithRating(1, 1)} />)
        expect(wrapper.find(RatingBar)).toHaveLength(1)
      })
    })

    describe('when zero', () => {
      it('does not render a rating', () => {
        const wrapper = shallow(<AggregateRating {...propsWithRating(1, 0)} />)
        expect(wrapper.find(RatingBar)).toHaveLength(0)
      })
    })

    describe('when falsey', () => {
      it('does not render a rating', () => {
        const wrapper = shallow(<AggregateRating {...propsWithRating(1, null)} />)
        expect(wrapper.find(RatingBar)).toHaveLength(0)
      })
    })
  })

  describe('rounding', () => {
    it('rounds down to whole number', () => {
      const wrapper = shallow(<AggregateRating {...propsWithRating(1.24)} />)
      const score = wrapper.find(RatingBar).at(0).props().score
      expect(score).toEqual(1)
    })

    it('rounds down to nearest .5', () => {
      const wrapper = shallow(<AggregateRating {...propsWithRating(3.74)} />)
      const score = wrapper.find(RatingBar).at(0).props().score
      expect(score).toEqual(3.5)
    })

    it('rounds up to whole number', () => {
      const wrapper = shallow(<AggregateRating {...propsWithRating(3.76)} />)
      const score = wrapper.find(RatingBar).at(0).props().score
      expect(score).toEqual(4)
    })

    it('rounds up to nearest .5', () => {
      const wrapper = shallow(<AggregateRating {...propsWithRating(3.26)} />)
      const score = wrapper.find(RatingBar).at(0).props().score
      expect(score).toEqual(3.5)
    })
  })
})
