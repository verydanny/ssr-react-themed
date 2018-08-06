import React from 'react'
import { shallow } from 'enzyme'
import HomeHeader from '../HomeHeader'

describe('small/HomeHeader', () => {
  const wrapper = shallow(<HomeHeader />)

  it('renders', () => {
    // data-tag_item="open_close_menu"]
    const actual = wrapper.html()
    expect(actual).toMatchSnapshot()
  })
})
