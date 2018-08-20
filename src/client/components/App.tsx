import * as React from 'react'
import { ThemeProvider } from 'react-themed-too'
import MobileTheme from 'ui/smallTheme'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const App = () => (
  <ThemeProvider theme={MobileTheme}>
    <Header />
    <Footer />
  </ThemeProvider>
)

export default App
