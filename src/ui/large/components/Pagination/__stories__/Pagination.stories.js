import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SearchPageTheme from 'ui/large/themes/pages/searchResultsBundle'
import Pagination from '../Pagination'

const props = {
  theme: SearchPageTheme,
  start: 1,
  end: 30,
  total: 75,
  hasMultiplePages: true,
  linkNext: 'next',
  linkPrevious: 'prev',
  gotoNextPage: action('clicked next page'),
  gotoPreviousPage: action('clicked previous page'),
}
const propsFirstPage = {
  ...props,
  isFirstPage: true,
}
const propsMiddlePage = {
  ...props,
  start: 31,
  end: 60,
}
const propsLastPage = {
  ...props,
  start: 61,
  end: 75,
  isLastPage: true,
}
const propsSinglePage = {
  ...props,
  hasMultiplePages: false,
}

storiesOf('Large/Pagination', module)
  .add('first page', () => <Pagination {...propsFirstPage} />)
  .add('middle page', () => <Pagination {...propsMiddlePage} />)
  .add('last page', () => <Pagination {...propsLastPage} />)
  .add('single page', () => <Pagination {...propsSinglePage} />)
