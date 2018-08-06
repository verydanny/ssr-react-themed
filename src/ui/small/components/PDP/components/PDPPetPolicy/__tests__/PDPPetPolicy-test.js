import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'react-themed'
import { keyMirror } from '@rentpath/react-ui-utils'
import PDPPetPolicy from '../PDPPetPolicy'

const theme = keyMirror([
  'PDPPetPolicy-expanded',
])

const defaultProps = {
  theme,
  policies: {
    'Category One': [
      { label: 'Policy One' },
      { label: 'Policy Two', comment: 'With a comment' },
      { label: 'Policy Three', weightRestriction: 'With a weightRestriction' },
    ],
    'Category Two': [
      {
        label: 'Policy Three',
        comment: 'With a comment',
        weightRestriction: 'With a weightRestriction',
      },
    ],
  },
}

const factory = props => (
  <ThemeProvider theme={theme}>
    <PDPPetPolicy.WrappedComponent {...defaultProps} {...props} />
  </ThemeProvider>
)

describe('<PDPPetPolicy />', () => {
  const wrapper = mount(factory())
  const section = wrapper.find('PDPSection')
  const lists = wrapper.find('PDPPetPolicyList')
  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('contains a PDPSection component', () => {
    expect(section.length).toBe(1)
  })
  it('contains two PDPPetPolicyList components', () => {
    expect(lists.length).toBe(2)
  })
  it('passes the expected categories to PDPPetPolicyList', () => {
    const list1 = lists.get(0)
    const list2 = lists.get(1)
    expect(list1.props.category).toBe('Category One')
    expect(list2.props.category).toBe('Category Two')
  })
})
