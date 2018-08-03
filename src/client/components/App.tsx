import * as React from 'react'
import { ThemeProvider } from 'react-themed-too'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Buttons/someThing.css'
import Button from './Buttons/Button'

const App = () => (
  <ThemeProvider theme={styles}>
    <Button />
  </ThemeProvider>
)

export default connect()(App)