import { initFilters } from 'app/selectors/filters'
import BathInput from '../BathInput'
import FormButtonHelper from '../__helpers__/Form-Button-Helper'

// Providing a fake theme mapping, so classnames will be applied.
// We will use the classnames to find elements
const theme = {
  MoreFiltersModal_RowButtons: 'buttonGroup1',
  'MoreFiltersModal_RowButtons-checked': 'checkedStyle',
  BathInput: 'bathInput1',
}

const data = {
  theme,
  numButtons: 3,
  buttonNames: ['1 Bath', '2 Baths', '3+ Baths'],
  buttonParent: 'bath-buttons',
  section: 'Bath',
  propsOverride: {
    filterItems: initFilters.baths,
  },
}

FormButtonHelper(BathInput, data)
