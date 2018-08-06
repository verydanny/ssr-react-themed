import React from 'react'
import { mount } from 'enzyme'
import Footer from '../Footer'

const theme = {
  MoreFiltersModal_ResetAll: 'resetAll',
  MoreFiltersModal_Cancel: 'cancel',
  MoreFiltersModal_ShowProps: 'showProps',
  MoreFiltersModal_DisableProps: 'noShowProps',
}

const footerProps = {
  onClose: () => { },
  onUnselect: jest.fn(),
  clearFilters: jest.fn(),
  restoreFilters: jest.fn(),
  theme,
}

describe('More Filters Footer', () => {
  it('has a reset button', () => {
    const wrapper = mount(<Footer {...footerProps} />)
    const resetAll = wrapper.find('.resetAll')
    expect(resetAll.length).toBe(1)
    expect(resetAll.at(0).text()).toBe('Reset All')
  })

  it('has a cancel button', () => {
    const wrapper = mount(<Footer {...footerProps} />)
    const cancelButton = wrapper.find('button.cancel')
    expect(cancelButton.length).toBe(1)
    expect(cancelButton.at(0).text()).toBe('Cancel')
  })

  it('has a show props button', () => {
    const wrapper = mount(<Footer {...footerProps} />)
    const showProps = wrapper.find('a.showProps')
    expect(showProps.length).toBe(1)
    expect(showProps.at(0).text()).toBe('Show 0 Properties')
  })

  it('has a show props button with property count', () => {
    const Props = {
      ...footerProps,
      filterTotal: 277,
    }
    const wrapper = mount(<Footer {...Props} />)
    const showProps = wrapper.find('a.showProps')
    expect(showProps.length).toBe(1)
    expect(showProps.at(0).text()).toBe('Show 277 Properties')
  })
})
