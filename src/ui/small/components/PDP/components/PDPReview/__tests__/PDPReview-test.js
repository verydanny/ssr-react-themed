import React from 'react'
import { mount } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import PDPReview from '../PDPReview'

const theme = keyMirror([
  'PDPReview',
  'PDPReview_Date',
  'PDPReview_Rating',
  'PDPReview_Text',
  'PDPReview_Author',
  'PDPReview_AuthorDescription',
])

const defaultProps = {
  rating: 5,
  date: 'July 5th, 2018',
  text: 'This is the text in my review. Hey I live  here and Im leaving a great review.BLAH',
  author: 'David T.',
  authorDescription: 'Certified Resident',
  theme,
}

const factory = props =>
  <PDPReview {...defaultProps} {...props} />

describe('<PDPReview />', () => {
  it('renders the review', () => {
    const wrapper = mount(factory())
    expect(wrapper.find('.PDPReview_Date').text()).toEqual(defaultProps.date)
    expect(wrapper.find('.PDPReview_Text').text()).toEqual(defaultProps.text)
    expect(wrapper.find('.PDPReview_Author').text()).toEqual(defaultProps.author)
    expect(wrapper.find('.PDPReview_AuthorDescription').text()).toEqual(defaultProps.authorDescription)
  })

  describe('Without Author Desc', () => {
    it('doesnt render author desc', () => {
      const wrapper = mount(factory({ authorDescription: null }))
      expect(wrapper.find('.PDPReview_AuthorDescription').exists()).toBe(false)
    })
  })

  describe('<ReadMoreText />', () => {
    it('renders ReadMoreText component ', () => {
      const wrapper = mount(factory())
      expect(wrapper.find('ReadMoreText').exists()).toBe(true)
    })
  })

  describe('<RatingBar />', () => {
    it('renders RatingBar component', () => {
      const wrapper = mount(factory())
      expect(wrapper.find('.PDPReview_Rating').exists()).toBe(true)
      expect(wrapper.find('RatingBar').exists()).toBe(true)
    })
  })
})
