import React from 'react'
import { mount } from 'enzyme'
import ZeroResultsCard from '../ZeroResultsCard'

const theme = {
  ZeroResults_PropertyCount: 'propertyCount',
  ZeroResults_SuggestText: 'suggestText',
  ZeroResults_NextSteps: 'nextSteps',
  ZeroResults_AdjustFilters: 'adjustFilters',
  ZeroResults_ZoomOutOrText: 'orText',
  ZeroResults_ZoomOutText: 'zoomOut',
}

const props = {
  onClickOpenModal: jest.fn(),
  onClickZoomOut: jest.fn(),
  theme,
}

describe('Zero Results Card', () => {
  it('renders 0 results card', () => {
    const wrapper = mount(
      <ZeroResultsCard {...props} />
    )
    const propertyCount = wrapper.find('.propertyCount')
    const suggestText = wrapper.find('.suggestText')
    const nextSteps = wrapper.find('.nextSteps')
    const adjustFilters = wrapper.find('.adjustFilters')
    const orText = wrapper.find('.orText')
    const zoomOut = wrapper.find('.zoomOut')
    expect(propertyCount.at(0).text()).toBe('0 Properties Found')
    expect(suggestText.at(0).text()).toBe('Try adjusting the filters above or zoom out on the map')
    expect(nextSteps.at(0).text()).toBe('Next Steps :')
    expect(adjustFilters.at(0).text()).toBe('Adjust Filters')
    expect(orText.at(0).text()).toBe('or')
    expect(zoomOut.at(0).text()).toBe('Zoom Out')
  })

  it('clicking adjust filters opens modal', () => {
    const wrapper = mount(<ZeroResultsCard {...props} />)
    wrapper.find('.adjustFilters').simulate('click')
    expect(props.onClickOpenModal).toBeCalled()
  })

  it('clicking zoom out zooms out map ', () => {
    const wrapper = mount(<ZeroResultsCard {...props} />)
    const zoom = wrapper.find('.zoomOut')
    zoom.at(0).simulate('click')
    expect(props.onClickZoomOut).toBeCalled()
  })
})
