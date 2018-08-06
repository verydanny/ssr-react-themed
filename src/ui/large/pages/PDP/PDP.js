import React, { Component } from 'react'
import { ThemeProvider } from 'react-themed'
import theme from 'ui/large/themes/pages/detailBundle'

class Detail extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <p>Detail Page WIP</p>
      </ThemeProvider>
    )
  }
}

export default Detail
