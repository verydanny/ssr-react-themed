import React from 'react'
import { mount } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import { ThemeProvider } from 'react-themed'
import PDPFooter from '../PDPFooter'

const theme = keyMirror([
  'PDPFooter',
  'PDPFooter_Info',
  'PDPFooter_InfoContact',
  'PDPFooter_Price',
  'PDPFooter_CTA',
  'RatingBar',
  'RatingBar_Background',
  'RatingBar_Icons',
  'Label',
])

const setup = props => mount(
  <ThemeProvider theme={theme}>
    <PDPFooter {...props} />
  </ThemeProvider>
)

describe('small/PDPFooter', () => {
  const props = {
    price: '$1,350',
    phoneTel: '1404678770',
    phoneFormatted: '(404) 678-1234',
    listing: {
      numRatings: 11,
      avgOverallRating: 3.7,
    },
  }

  describe('complete footer', () => {
    const wrapper = setup(props)
    it('contains price, rating, phone link, email button', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('missing price', () => {
    const wrapper = setup({ ...props, price: null })
    it('does not contain the price', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('missing rating', () => {
    const wrapper = setup({ ...props, listing: {} })
    it('does not contain a rating', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('missing price and rating', () => {
    const wrapper = setup({ ...props, price: null, listing: {} })
    it('contains "Contact for Price" and does not contain price or rating', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('missing phone', () => {
    const wrapper = setup({ ...props, phoneTel: null })
    it('does not contain phone link', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('click contact button', () => {
    const callback = jest.fn()
    const wrapper = setup({ ...props, openLeadFormModal: callback })
    wrapper.find('.PDPFooter_CTA button').simulate('click')
    it('calls the openLeadFormModal callback with the listing data', () => {
      expect(callback).toBeCalledWith(
        expect.objectContaining(props.listing)
      )
    })
  })
})
