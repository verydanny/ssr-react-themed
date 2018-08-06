import React from 'react'
import { mount } from 'enzyme'
import Header from '../Header'

const theme = {
  MoreFiltersModal_PropertyCount: 'propCount',
  MoreFiltersModal_CloseButton: 'closeButton',
}

const Props = {
  onClose: () => { },
  theme,
}

describe('More Filters Header', () => {
  it('has a close button', () => {
    const wrapper = mount(<Header {...Props} />)
    const closeButton = wrapper.find('.closeButton')
    expect(closeButton.length).toBe(1)
    expect(closeButton.at(0).text()).toBe('Close')
  })

  it('has property count of 0', () => {
    const wrapper = mount(<Header {...Props} />)
    const propertyCount = wrapper.find('.propCount')
    expect(propertyCount.length).toBe(1)
    expect(propertyCount.at(0).text()).toBe('0 Properties Found')
  })

  it('has property count of 10', () => {
    const headerProps = {
      onClose: () => { },
      theme,
      filterTotal: 10,
    }
    const wrapper = mount(<Header {...headerProps} />)
    const propertyCount = wrapper.find('.propCount')
    expect(propertyCount.length).toBe(1)
    expect(propertyCount.at(0).text()).toBe('10 Properties Found')
  })

  it('has property count of 1', () => {
    const headerProps = {
      onClose: () => { },
      theme,
      filterTotal: 1,
    }
    const wrapper = mount(<Header {...headerProps} />)
    const propertyCount = wrapper.find('.propCount')
    expect(propertyCount.length).toBe(1)
    expect(propertyCount.at(0).text()).toBe('1 Property Found')
  })
})
