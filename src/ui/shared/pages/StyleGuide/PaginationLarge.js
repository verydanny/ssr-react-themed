import React from 'react'
import { ThemeProvider } from 'react-themed-too'
import SearchPageTheme from 'ui/large/themes/pages/searchResultsBundle'
import Pagination from 'ui/large/components/Pagination'
import sg from './PaginationLarge.css'

const URL_NEXT = '/next'
const URL_PREV = '/prev'

function setup(propsOverride) {
  const props = {
    start: 1,
    end: 30,
    total: 75,
    linkNext: URL_NEXT,
    linkPrevious: URL_PREV,
    ...propsOverride,
  }
  return <Pagination {...props} />
}

export default() => (
  <ThemeProvider theme={SearchPageTheme}>
    <div className={sg.Container}>
      <h1 className={sg.Header} data-tid="cards-header">
        Pagination for Desktop
      </h1>
      <p>
        This style guide shows several variations on how the Pagination component
        might appear for desktop. The <em>previous</em> and <em>next</em> links
        do not function.
      </p>
      <hr />

      <h2>Pagination: First Page</h2>
      <p>For the first page, the <em>previous</em> link should not appear.</p>
      <div className={sg.WrapPagination}>
        { setup() }
      </div>

      <h2>Pagination: Middle Page</h2>
      <p>For a middle page, the <em>previous</em> and <em>next</em> links should appear.</p>
      <div className={sg.WrapPagination}>
        {
          setup({
            start: 31,
            end: 60,
            total: 75,
          })
        }
      </div>

      <h2>Pagination: Last Page</h2>
      <p>For the last page, the <em>next</em> link should not appear.</p>
      <div className={sg.WrapPagination}>
        {
          setup({
            start: 61,
            end: 75,
            total: 75,
          })
        }
      </div>

      <h2>Pagination: Single Page</h2>
      <p>For a single page, the pagination component should not appear.</p>
      <div className={sg.WrapPagination}>
        {
          setup({
            start: 1,
            end: 8,
            total: 8,
          })
        }
      </div>

      <hr />

      <p>(End of style guide)</p>

    </div>
  </ThemeProvider>
)
