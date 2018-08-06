import React from 'react'
import { mount } from 'enzyme'
import { keyMirror } from '@rentpath/react-ui-utils'
import PDPAddress from '../PDPAddress'

const theme = keyMirror([
  'PDPAddress',
  'PDPAddress_StreetAddress',
])

const defaultProps = {
  theme,
}

const factory = props =>
  <PDPAddress {...defaultProps} {...props} />

describe('<PDPAddress />', () => {
  it('should render streetAddress', () => {
    const city = 'Atlanta'
    const state = 'GA'
    const zipCode = '30318'
    const cityStateZip = `${city}, ${state} ${zipCode}`
    const neighborhood = 'Reynoldstown'
    const streetAddress = '841 Memorial Dr SE'

    const wrapper = mount(factory({
      city,
      state,
      zipCode,
      neighborhood,
      streetAddress,
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.PDPAddress_StreetAddress').text()).toEqual(streetAddress)
    expect(wrapper.find('[data-tid="addressCityStateZip"]').text()).toEqual(cityStateZip)
    expect(wrapper.find('[data-tid="addressNeighborhood"]').text()).toEqual(neighborhood)
  })

  it('should have a theme', () => {
    const wrapper = mount(factory({ theme }))

    expect(wrapper.props().theme).toBeTruthy()
  })
})
