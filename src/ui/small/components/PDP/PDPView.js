import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import {
  PDPAmenities,
  PDPHeader,
  PDPKeyInfo,
  PDPFooter,
  PDPAddress,
  PDPMap,
  PDPPetPolicy,
  PDPGallery,
  PDPLeasingTerms,
  PDPRatings,
  PDPFloorplans,
} from './components'

const PDPView = ({ theme }) => (
  <div className={theme.PDPView}>
    <PDPHeader />
    <PDPKeyInfo />
    <PDPGallery />
    <PDPAddress />
    <PDPMap />
    <PDPAmenities />
    <PDPPetPolicy />
    <PDPFloorplans />
    <PDPLeasingTerms />
    <PDPRatings />
    <PDPFooter />
  </div>
)

PDPView.propTypes = {
  theme: PropTypes.object,
}

PDPView.defaultProps = {
  theme: {},
}

export default themed(/^PDPView/, { pure: true })(PDPView)
