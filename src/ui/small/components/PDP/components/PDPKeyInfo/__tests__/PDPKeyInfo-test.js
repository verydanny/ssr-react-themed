import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'react-themed-too'
import { keyMirror } from '@rentpath/react-ui-utils'
import PDPKeyInfo from '../PDPKeyInfo'

const theme = keyMirror([
  'PDPKeyInfo',
  'PDPKeyInfo_Price',
  'PDPKeyInfo_PropertyLabel',
  'PDPKeyInfo_PropertyDetails',
  'PDPKeyInfo_AvailabilityLabel',
  'RatingBar',
  'RatingBar_Background',
  'RatingBar_Icons',
  'Label',
])

const setup = props => mount(
  <ThemeProvider theme={theme}>
    <PDPKeyInfo {...props} />
  </ThemeProvider>
)

describe('small/PDP/PDPKeyInfo', () => {
  const props = {
    theme: {},
    propertyLabel: 'Enso - Eco-friendly Community in East Atlanta',
    UnitsAvailable: 'Available Now',
    bathText: '1-2 Br',
    bedsText: '1-2 Bd',
    sqFt: '748-1,212',
    priceText: '$1,500+',
    listing: {},
    numRatings: 5,
    listingId: '345678',
    unitsAvailable: '7 units available',
    favorites: {},
    toggleFavorite: jest.fn(),
  }

  it('renders key Info with all fields', () => {
    const wrapper = setup(props)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
