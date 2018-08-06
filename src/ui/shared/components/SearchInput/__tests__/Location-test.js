import React from 'react'
import { mount } from 'enzyme'
import Location from '../Location'

describe('Location', () => {
  it('renders the location name', () => {
    const wrapper = mount(<Location location={{ displayName: 'foo' }} />)
    expect(wrapper.html()).toEqual(
      '<div data-tid="search-location-suggestion"><span>foo</span></div>'
    )
  })

  it('renders the correct portion of the location name in bold', () => {
    const wrapper = mount(
      <Location
        location={{ displayName: 'foo bar', highlightStart: 0, highlightEnd: 3 }}
      />
    )
    expect(wrapper.find('b')).toHaveLength(1)
    expect(wrapper.find('b').html()).toEqual('<b>foo</b>')
  })

  it('renders the correct internal portion of the location name in bold', () => {
    const wrapper = mount(
      <Location
        location={{ displayName: 'foo bar', highlightStart: 1, highlightEnd: 7 }}
      />
    )
    expect(wrapper.find('b')).toHaveLength(1)
    expect(wrapper.find('b').html()).toEqual('<b>oo bar</b>')
  })

  it('passes through props', () => {
    const wrapper = mount(<Location location={{ displayName: 'foo' }} id="foo" />)
    const children = wrapper.children()
    expect(children.find('#foo')).toHaveLength(1)
  })
})
