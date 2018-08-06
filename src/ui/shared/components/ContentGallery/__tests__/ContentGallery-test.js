import React from 'react'
import { shallow, mount } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import ContentGallery from '../ContentGallery'

const theme = keyMirror([
  'ContentGallery',
  'ContentGallery_Item',
])

const defaultProps = {
  theme,
}

const propsSingleChild = {
  children: <div>Hello, I am a single child.</div>,
}

const propsMultipleChildren = {
  children: [
    <div>Hello, I am child 1.</div>,
    <div>Hello, I am child 2.</div>,
    <div>Hello, I am child 3.</div>,
    <div>Hello, I am child 4.</div>,
    <div>Hello, I am child 5.</div>,
    <div>Hello, I am child 6.</div>,
  ],
}

const factory = props =>
  <ContentGallery {...defaultProps} {...props} />

describe('<ContentGallery />', () => {
  it('doesnt render the ContentGallery when no children', () => {
    const wrapper = shallow(factory())
    expect(wrapper.find('.ContentGallery_Item').exists()).toBe(false)
  })
  it('renders the ContentGallery with one child', () => {
    const wrapper = mount(factory(propsSingleChild))
    expect(wrapper.find('.ContentGallery_Item').length).toBe(1)
  })
  it('renders no bullets with only one child', () => {
    const wrapper = mount(factory(propsSingleChild))
    expect(wrapper.find('button').length).toBe(0)
  })
  it('renders the ContentGallery with multiple children', () => {
    const wrapper = mount(factory(propsMultipleChildren))
    expect(wrapper.find('.ContentGallery_Item').length).toBe(6)
  })
  it('renders multiple bullets with multiple children', () => {
    const wrapper = mount(factory(propsMultipleChildren))
    expect(wrapper.find('button').length).toBe(6)
  })
})
