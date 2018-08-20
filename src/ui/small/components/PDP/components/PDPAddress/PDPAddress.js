import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'

const PDPAddress = ({
  city,
  state,
  zipCode,
  neighborhood,
  streetAddress,
  theme,
}) => (
  <div
    className={theme.PDPAddress}
    data-tid="pdpAddress"
    itemScope
    itemType="https://schema.org/PostalAddress"
    itemProp="address"
  >
    <div
      className={theme.PDPAddress_StreetAddress}
      data-tid="addressStreetAddress"
      itemProp="streetAddress"
    >
      {streetAddress}
    </div>
    <div data-tid="addressCityStateZip">
      <span itemProp="addressLocality">{city}</span>{city && ', '}
      <span itemProp="addressRegion">{state}</span>{' '}
      <span itemProp="postalCode">{zipCode}</span>
    </div>
    <div data-tid="addressNeighborhood">{neighborhood}</div>
  </div>
)

PDPAddress.propTypes = {
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  neighborhood: PropTypes.string,
  streetAddress: PropTypes.string,
  theme: PropTypes.object,
}

PDPAddress.defaultProps = {
  theme: {},
}

export default themed(/^PDPAddress/, { pure: true })(PDPAddress)
