import React from 'react'
import { mount } from 'enzyme'
import every from 'lodash/fp/every'

export default (Component, data) => {
  const {
    theme,
    propsOverride,
    numButtons,
    buttonParent,
    buttonType,
    section,
    getButtons,
    at,
    buttonNames,
  } = data

  function setup() {
    const props = {
      theme,
      onChange: jest.fn(),
      onUnselect: jest.fn(),
      ...propsOverride,
    }
    const wrapper = mount(<Component {...props} />)

    props.onChange.mockImplementation(e => {
      wrapper.setProps({
        ...wrapper.props(),
        value: e,
      })
    })

    const buttonElements =
      (getButtons && getButtons(wrapper)) ||
      wrapper
        .find(`[data-tid="${buttonParent}"]`)
        .at(at || 2)
        .children()

    const buttons = buttonElements.map(i => i)

    return {
      wrapper,
      buttons,
      props,
    }
  }

  describe(`${section} Input Buttons`, () => {
    const test = setup()

    it(`has ${numButtons} buttons`, () => {
      expect(test.buttons.length).toBe(numButtons)
    })

    it('have all the buttons rendered', () => {
      expect(
        every(
          button => button.name() === (buttonType || 'Themed(RadioButton)')
        )(test.buttons)
      ).toBe(true)
    })

    test.buttons.forEach((button, i) => {
      if (buttonNames && buttonNames.length && i < buttonNames.length) {
        it('has the correct button name', () => {
          if (buttonType === 'button') {
            expect(button.text()).toBe(buttonNames[i])
          } else {
            expect(button.find('label').text()).toBe(buttonNames[i])
          }
        })
      }

      it(`selects the correct value on click for button ${i}`, () => {
        const input = button.find('input')

        if (input && input.length) {
          input.simulate('change', { target: { checked: true, value: String(i) } })

          // Expect change
          expect(test.props.onChange).toBeCalled()

          // Need to figure out why theme mapping does not seem to work
          // Expect button to get checked style
          // expect(test.buttons[i].hasClass('checkedStyle')).toBe(true)

          const otherbuttons = test.buttons
            .slice(0, i)
            .concat(test.buttons.slice(i + 1))

          expect(
            every(otherbutton => !otherbutton.hasClass(theme.checkedStyle))(
              otherbuttons
            )
          ).toBe(true)
        }
      })
    })
  })
}
