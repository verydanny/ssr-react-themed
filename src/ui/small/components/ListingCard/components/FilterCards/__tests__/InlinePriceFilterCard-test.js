import React from 'react'
import { shallow } from 'enzyme'
import { PriceFilterCard } from '@rentpath/react-ui-core'
import InlinePriceFilterCard from '../InlinePriceFilterCard'

const defaultProps = {
  pushState: () => {},
  updateFilterCriteriaWithChanges: () => {},
}

const factory = props =>
  <InlinePriceFilterCard.WrappedComponent {...defaultProps} {...props} />

describe('small/ListingCard/FilterCards/components/InlinePriceFilterCard', () => {
  it('renders PriceFilterCard', () => {
    const wrapper = shallow(factory())
    expect(wrapper.find(PriceFilterCard)).toHaveLength(1)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
