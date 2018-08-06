import React from 'react'
import { shallow } from 'enzyme'
import Layout from '../Layout'
import HomeHeader from '../HomeHeader'

describe('small/Layout', () => {
  const props = {
    headerComponent: null,
    footerComponent: null,
  }

  const wrapper = shallow(<Layout {...props}><span id="foo" /></Layout>)

  it('renders children', () => {
    const expected = 1
    const actual = wrapper.find('#foo').length
    expect(actual).toEqual(expected)
  })
})

describe('small/HomeHeader', () => {
  const wrapper = shallow(<HomeHeader />)

  it('renders', () => {
    const actual = wrapper.html()
    expect(actual).toMatchSnapshot()
  })
})
