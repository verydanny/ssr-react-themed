import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'react-themed-too'
import PageViewTracker from 'ui/shared/components/PageViewTracker'
import ModalStack from 'ui/shared/components/ModalStack'
import { modalDefinitions } from 'ui/small/config/modalConfig'
import theme from 'ui/small/themes/SmallTheme'

/* eslint-disable no-unused-vars */
// Importing CSS override for body element only
import cssOverride from './PDPLayout.css'
/* eslint-enable no-unused-vars */

const PDPLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div className={theme.PDPLayout}>
      <PageViewTracker />
      <ModalStack modalDefinitions={modalDefinitions} />
      { children }
    </div>
  </ThemeProvider>
)

PDPLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PDPLayout
