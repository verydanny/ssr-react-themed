import { initFilters } from 'app/selectors/filters'
import PetInput from '../PetInput'
import FormButtonHelper from '../__helpers__/Form-Button-Helper'

// Providing a fake theme mapping, so classnames will be applied.
// We will use the classnames to find elements
const theme = {
  MoreFiltersModal_RowButtons: 'buttonGroup1',
  'MoreFiltersModal_RowButtons-checked': 'checkedStyle',
  PetInput: 'petInput1',
}

const data = {
  theme,
  numButtons: 4,
  buttonNames: ['Cats OK', 'Dogs OK', 'Cats & Dogs OK', 'No Pets'],
  buttonParent: 'pet-buttons',
  section: 'Pet',
  propsOverride: {
    filterItems: initFilters.pets,
  },
}

FormButtonHelper(PetInput, data)
