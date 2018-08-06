import * as React from 'react'
import { ThemeProvider } from 'react-themed-too'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Footer from 'ui/small/themes/Footer'
import Button from './Buttons/Button'

const App = () => (
  <ThemeProvider theme={Footer}>
    <Button />
  </ThemeProvider>
)

export default connect()(App)