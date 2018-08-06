import React from 'react'
import { shallow, mount } from 'enzyme'
import ThemedPriceInput from '../PriceInput'

const PriceInput = ThemedPriceInput.WrappedComponent

describe('ui/small/components/FilterPanel/PriceInput', () => {
  const tags = {
    item: 'slider_price',
    element: 'slider_price',
    section: 'more_filters',
    value: 'min_0-max_5100',
    info: '',
  }

  it('correctly tracks the tags on click', () => {
    shallow(<PriceInput />).instance().priceTagging()
    expect(window.eventTracker.track).toBeCalledWith('click', tags)
  })

  it('displays "Any Price" with no initial price provided', () => {
    const wrapper = mount(<PriceInput />)
    expect(wrapper.text()).toContain('Any Price')
  })

  it('displays a price range with a min and a max provided', () => {
    const wrapper = mount(<PriceInput min={400} max={1500} />)
    expect(wrapper.text()).toContain('$400 - $1,500')
  })

  it('displays the price followed by a + if just a min is provided', () => {
    const wrapper = mount(<PriceInput min={400} />)
    expect(wrapper.text()).toContain('$400+')
  })

  it('displays the price followed by a "and under" if just a max is provided', () => {
    const wrapper = mount(<PriceInput max={1200} />)
    expect(wrapper.text()).toContain('$1,200 and under')
  })
})
