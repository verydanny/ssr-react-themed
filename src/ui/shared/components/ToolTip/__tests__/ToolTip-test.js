import React from 'react'
import { shallow, mount } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import ToolTip from '../ToolTip'

const theme = keyMirror([
  'ToolTip_CloseButton',
  'ToolTip_Overlay',
  'ToolTip_Body',
])

const defaultProps = {
  theme,
}

const factory = props =>
  <ToolTip.WrappedComponent {...defaultProps} {...props} />

describe('<ToolTip />', () => {
  it('renders', () => {
    const wrapper = shallow(factory())
    expect(wrapper).toMatchSnapshot()
  })

  it('renders children', () => {
    const children = <div className="Child" />
    const wrapper = mount(
      <ToolTip.WrappedComponent {...defaultProps}>
        {children}
      </ToolTip.WrappedComponent>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('triggers an onClick for each button', () => {
    const onClick = jest.fn()
    const wrapper = shallow(factory({ onClick }))
    const selectors = ['.ToolTip_Body', '.ToolTip_Overlay', '.ToolTip_CloseButton']
    selectors.forEach(sel => wrapper.find(sel).simulate('click'))
    expect(onClick.mock.calls.length).toBe(3)
  })
})
