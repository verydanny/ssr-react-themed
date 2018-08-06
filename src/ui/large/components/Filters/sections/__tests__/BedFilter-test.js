import React from 'react'
import { mount } from 'enzyme'
import BedFilter from '../BedFilter'

const theme = {
  Filters_Text: 'Filters_DropdownContainer-beds',
  'Filters_DropdownOption-selected': 'Filters_DropdownOption-selected',
}

function setup() {
  const props = {
    theme,
    buttonText: 'Studio',
    onChange: jest.fn(),
  }

  const wrapper = mount(<BedFilter {...props} />)
  const buttonText = wrapper.find(`.${theme.Filters_Text}`).first().text()
  const button = wrapper.find('Button')

  return {
    wrapper,
    buttonText,
    button,
  }
}

describe('Bed Filter', () => {
  const test = setup()
  const props = test.wrapper.props()

  it('contains text equal to buttonText props', () => {
    expect(test.buttonText).toBe(props.buttonText)
  })

  it('calls onChange when option is click', () => {
    test.button.simulate('click')
    const option = test.wrapper.find('ListItem').first()
    option.simulate('click')
    expect(props.onChange).toBeCalled()
  })

  it('contains expected options in dropdown', () => {
    test.button.simulate('click')
    const option = test.wrapper.find('ListItem')
    expect(option.at(0).text()).toBe('Any')
    expect(option.at(5).text()).toBe('4+ Beds')
  })
})

describe('handleOptionSelection method', () => {
  const test = setup()

  it('adds the selected classname to correct option', () => {
    const result = test.wrapper.find('BedFilter').instance().handleOptionSelection()
    expect(result).toMatchSnapshot()
  })
})
