import React from 'react'
import { shallow, mount } from 'enzyme'
import CtaButton from '../CtaButton'

describe('ListingCard/CtaButton', () => {
  const theme = {
    CtaButton: 'CtaButton',
    'CtaButton-email-test-variation': 'CtaButton-email-test-variation',
  }

  const props = {
    contactType: 'email',
    link: 'https://www.rent.com',
    tags: { 'data-tag_item': 'testTag' },
    onClick: jest.fn(),
    icon: 'email',
    theme,
    variation: 'test-variation',
  }

  it('passes through children props', () => {
    const wrapper = shallow(
      <CtaButton {...props}>
        <div className="test-child-prop">Test Prop</div>
      </CtaButton>
    )
    const div = wrapper.find('.test-child-prop')
    expect(div.text()).toBe('Test Prop')
  })

  it('sets tagging data', () => {
    const wrapper = mount(<CtaButton {...props} />)
    const container = wrapper.find('.CtaButton')
    expect(container.prop('data-tag_item')).toBe('testTag')
  })

  it('sets the link href', () => {
    const wrapper = mount(<CtaButton {...props} />)
    expect(wrapper.find('button').prop('href')).toBe(props.link)
  })

  it('sets the onClick handler', () => {
    const wrapper = mount(<CtaButton {...props} />)
    const link = wrapper.find('button')
    link.simulate('click')
    expect(props.onClick).toBeCalled()
  })

  it('sets a variation class', () => {
    const wrapper = mount(<CtaButton {...props} />)
    const container = wrapper.find(`.CtaButton-${props.contactType}-${props.variation}`)
    expect(container.length).toBe(1)
  })

  it('sets the provided nodeType', () => {
    const anchorProps = {
      nodeType: 'a',
      ...props,
      onClick: () => {},
    }
    const wrapper = mount(<CtaButton {...anchorProps} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('a')).toHaveLength(1)
    expect(wrapper.find('button')).toHaveLength(0)
  })
})
