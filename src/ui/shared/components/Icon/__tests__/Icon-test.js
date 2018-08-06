import React from 'react'
import { shallow } from 'enzyme'
import Icon from '../Icon'

describe('ui/shared/Icon', () => {
  it('renders with passed svgs object, single item, and no name', () => {
    const props = {
      svgs: { map: 'svg' },
      title: 'bar',
      className: 'logo',
      onClick: jest.fn(),
    }
    const wrapper = shallow(<Icon {...props} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with passed svgs object, single item, and mismatched name', () => {
    const props = {
      name: 'list',
      svgs: { map: 'map' },
      title: 'bar',
      className: 'logo',
      onClick: jest.fn(),
    }
    const wrapper = shallow(<Icon {...props} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders named svgs with passed svgs object, multiple items', () => {
    const props = {
      name: 'list',
      svgs: { map: 'svg', list: 'list' },
      title: 'bar',
      className: 'logo',
      onClick: jest.fn(),
    }
    const wrapper = shallow(<Icon {...props} />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
