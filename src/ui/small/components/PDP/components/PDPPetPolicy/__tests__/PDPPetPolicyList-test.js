import React from 'react'
import { shallow } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import PDPPetPolicyList from '../PDPPetPolicyList'

const theme = keyMirror([
  'PDPSectionList',
  'PDPSectionList_Category',
  'PDPSectionList_List',
  'PDPPetPolicy_Policy',
  'PDPPetPolicy_Weight',
  'PDPPetPolicy_Comment',
])

const defaultProps = {
  category: 'TestCategory',
  policies: [
    {
      label: 'TestLabel1',
      comment: 'TestComment1',
      weightRestriction: '80 lbs.',
    },
    {
      label: 'TestLabel2',
      comment: 'TestComment2',
    },
    {
      label: 'TestLabel3',
    },
  ],
  theme,
}

const factory = props =>
  <PDPPetPolicyList.WrappedComponent {...defaultProps} {...props} />

describe('<PDPPetPolicyList />', () => {
  const wrapper = shallow(factory())
  const category = wrapper.find('.PDPSectionList_Category')
  const policies = wrapper.find('.PDPPetPolicy_Policy')

  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should display the category', () => {
    expect(category.text()).toEqual(defaultProps.category)
  })

  describe('policies', () => {
    it('should contain three policies', () => {
      expect(policies.length).toEqual(3)
    })

    describe('first policy', () => {
      const policy = policies.at(0)
      it('should have a label', () => {
        expect(policy.text()).toContain('TestLabel1')
      })
      it('should have a comment', () => {
        expect(policy.find('.PDPPetPolicy_Comment').text()).toEqual('TestComment1')
      })
      it('should have a weight restriction', () => {
        expect(policy.find('.PDPPetPolicy_Weight').text()).toEqual('80 lbs.')
      })
    })

    describe('second policy', () => {
      const policy = policies.at(1)
      it('should have a label', () => {
        expect(policy.text()).toContain('TestLabel2')
      })
      it('should have a comment', () => {
        expect(policy.find('.PDPPetPolicy_Comment').text()).toEqual('TestComment2')
      })
      it('should not have a weight restriction', () => {
        expect(policy.find('.PDPPetPolicy_Weight').length).toEqual(0)
      })
    })

    describe('third policy', () => {
      const policy = policies.at(2)
      it('should have a label', () => {
        expect(policy.text()).toContain('TestLabel3')
      })
      it('should not have a comment', () => {
        expect(policy.find('.PDPPetPolicy_Comment').length).toEqual(0)
      })
      it('should not have a weight restriction', () => {
        expect(policy.find('.PDPPetPolicy_Weight').length).toEqual(0)
      })
    })
  })
})
