import React from 'react'
import PageViewTracker from 'ui/shared/components/PageViewTracker'
import theme from 'ui/large/themes/pages/searchResultsBundle'
import { Layout, HybridMap } from 'ui/large/components'
import { ThemeProvider } from 'react-themed-too'

const SearchResults = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <PageViewTracker />
      <HybridMap />
    </Layout>
  </ThemeProvider>
)

export default SearchResults
