import React from 'react'
import { mount } from 'enzyme'
import RatingSummaryItem from '../RatingSummaryItem'
import ThemedRatingSummary from '../RatingSummary'

const RatingSummary = ThemedRatingSummary.WrappedComponent

describe('<RatingSummary />', () => {
  const getSummaryRating = () => ({
    total: 30,
    values: [
      { name: '5', count: 18, label: '18' },
      { name: '4', count: 6, label: '6' },
      { name: '3', count: 3, label: '3' },
      { name: '2', count: 2, label: '2' },
      { name: '1', count: 1, label: '1' },
    ],
  })

  describe('values', () => {
    describe('when > 0', () => {
      const wrapper = mount(<RatingSummary {...getSummaryRating()} />)
      const ratingItems = wrapper.find(RatingSummaryItem)
      it('contains five rating summmary items', () => {
        expect(ratingItems).toHaveLength(5)
      })

      it('passes the expected ratings to RatingSummaryItem', () => {
        const rating1 = ratingItems.get(4)
        const rating2 = ratingItems.get(3)
        const rating3 = ratingItems.get(2)
        const rating4 = ratingItems.get(1)
        const rating5 = ratingItems.get(0)

        expect(rating1.props.ratingCount).toBe(1)
        expect(rating2.props.ratingCount).toBe(2)
        expect(rating3.props.ratingCount).toBe(3)
        expect(rating4.props.ratingCount).toBe(6)
        expect(rating5.props.ratingCount).toBe(18)
      })
    })

    describe('when emtpy', () => {
      it('does not render a rating summary', () => {
        const wrapper = mount(<RatingSummary total={0} values={[]} />)
        expect(wrapper.find(RatingSummaryItem)).toHaveLength(0)
      })
    })
  })
})
