import ToggleButtons from '../ToggleButtons'
import FormButtonHelper from '../__helpers__/Form-Button-Helper'

// Providing a fake theme mapping, so classnames will be applied.
// We will use the classnames to find elements
const theme = {
  MoreFiltersModal_RowButtons: 'buttonGroup1',
  'MoreFiltersModal_RowButtons-checked': 'checkedStyle',
}

const firstData = {
  theme,
  numButtons: 4,
  buttonParent: 'toggle-buttons',
  section: '4 ToggleButtons',
  getButtons: wrapper => wrapper.find('button'),
  buttonType: 'button',
  buttonNames: ['B1', 'B2', 'B3', 'B4'],
  propsOverride: {
    items: {
      B1: {
        active: false,
        label: 'B1',
        name: 'button1',
      },
      B2: {
        active: false,
        label: 'B2',
        name: 'button2',
      },
      B3: {
        active: false,
        label: 'B3',
        name: 'button3',
      },
      B4: {
        active: false,
        label: 'B4',
        name: 'button4',
      },
    },
  },
}

FormButtonHelper(ToggleButtons, firstData)

const secondData = {
  theme,
  numButtons: 2,
  buttonParent: 'toggle-buttons',
  section: '2 ToggleButtons',
  getButtons: wrapper => wrapper.find('button'),
  buttonType: 'button',
  buttonNames: ['Foo', 'Bar'],
  propsOverride: {
    items: {
      Foo: {
        label: 'Foo',
        name: 'button1',
        active: true,
      },
      Bar: {
        label: 'Bar',
        name: 'button2',
        active: true,
      },
    },
  },
}

FormButtonHelper(ToggleButtons, secondData)
