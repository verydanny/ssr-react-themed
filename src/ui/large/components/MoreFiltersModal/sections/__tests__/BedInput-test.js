import { initFilters } from 'app/selectors/filters'
import BedInput from '../BedInput'
import FormButtonHelper from '../__helpers__/Form-Button-Helper'

// Providing a fake theme mapping, so classnames will be applied.
// We will use the classnames to find elements
const theme = {
  MoreFiltersModal_RowButtons: 'buttonGroup1',
  'MoreFiltersModal_RowButtons-checked': 'checkedStyle',
  BedInput: 'bedInput1',
}

const data = {
  theme,
  numButtons: 5,
  buttonNames: ['Studio', '1 Bed', '2 Beds', '3 Beds', '4+ Beds'],
  buttonParent: 'bed-buttons',
  section: 'Bed',
  propsOverride: {
    filterItems: initFilters.beds,
  },
}

FormButtonHelper(BedInput, data)
