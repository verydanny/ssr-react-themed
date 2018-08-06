import React from 'react'
import { shallow } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import ReadMoreText, {
  BUTTON_TEXT_EXPAND,
  BUTTON_TEXT_COLLAPSE,
} from '../ReadMoreText'

const ELLIPSIS = '…'

const theme = keyMirror([
  'ReadMoreText',
  'ReadMoreText_Text',
  'ReadMoreText-collapsed',
])

const line = ' The quick brown fox'
const lines2 = line.repeat(2)
const lines3 = line.repeat(3)
const lines4 = line.repeat(4)
const lines5 = line.repeat(5)

const defaultProps = {
  text: lines5,
  count: lines3.length,
  triggerCount: lines4.length,
  theme,
}

const factory = props =>
  shallow(<ReadMoreText.WrappedComponent {...defaultProps} {...props} />)

const validateNotTruncated = (wrapper, text) => {
  it('contains the original text', () => {
    expect(wrapper.text()).toBe(text)
  })
  it('does not have a read more button', () => {
    expect(wrapper.find('button').exists()).toBe(false)
  })
}

describe('<ReadMoreText />', () => {
  describe('text that should not truncate', () => {
    describe('text is smaller than the count', () => {
      const wrapper = factory({ text: lines2 })
      validateNotTruncated(wrapper, lines2)
    })
    describe('text is bigger than count but smaller than triggerCount', () => {
      const text = `${lines3} plus more`
      const wrapper = factory({ text })
      validateNotTruncated(wrapper, text)
    })
    describe('text is equal to the triggerCount', () => {
      const wrapper = factory({ text: lines4 })
      validateNotTruncated(wrapper, lines4)
      it('renders', () => {
        expect(wrapper.html()).toMatchSnapshot()
      })
    })
  })

  describe('text that should truncate', () => {
    const trunc = `${lines3}${ELLIPSIS}`
    describe('text is just over the triggerCount', () => {
      const text = `${lines4}+`
      const wrapper = factory({ text })
      it('contains truncated text', () => {
        expect(wrapper.find('.ReadMoreText_Text').text()).toBe(trunc)
      })
      it('has a read more button', () => {
        expect(wrapper.find('button').text()).toBe(BUTTON_TEXT_EXPAND)
      })
    })
    describe('text is well over the triggerCount', () => {
      const wrapper = factory({ text: lines5 })
      it('renders', () => {
        expect(wrapper.html()).toMatchSnapshot()
      })
      it('contains truncated text', () => {
        expect(wrapper.find('.ReadMoreText_Text').text()).toBe(trunc)
      })
      it('has a read more button', () => {
        expect(wrapper.find('button').text()).toBe(BUTTON_TEXT_EXPAND)
      })
    })
    describe('expanding and collapsing the text', () => {
      const wrapper = factory({ text: lines5 })
      wrapper.find('button').simulate('click')
      it('renders', () => {
        expect(wrapper.html()).toMatchSnapshot()
      })
      it('changes the text of the button', () => {
        expect(wrapper.find('button').text()).toBe(BUTTON_TEXT_COLLAPSE)
      })
      it('expands the text', () => {
        expect(wrapper.find('.ReadMoreText_Text').text()).toBe(lines5)
      })
      it('collapses the text again', () => {
        wrapper.find('button').simulate('click')
        expect(wrapper.find('button').text()).toBe(BUTTON_TEXT_EXPAND)
        expect(wrapper.find('.ReadMoreText_Text').text()).toBe(trunc)
      })
    })
  })
})
