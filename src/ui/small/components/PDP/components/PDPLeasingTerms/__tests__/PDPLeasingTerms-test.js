import React from 'react'
import { shallow } from 'enzyme'
import PDPLeasingTerms from '../PDPLeasingTerms'

const defaultProps = {
  theme: {},
}

const factory = props =>
  <PDPLeasingTerms.WrappedComponent {...defaultProps} {...props} />

describe('<PDPLeasingTerms />', () => {
  describe('with some terms', () => {
    const wrapper = shallow(factory({ terms: 'Some leasing terms' }))

    it('should render', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.html()).toBeTruthy()
    })

    it('should match snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('without any terms', () => {
    const wrapper = shallow(factory())

    it('should not render', () => {
      expect(wrapper.html()).toBe(null)
    })
  })
})
