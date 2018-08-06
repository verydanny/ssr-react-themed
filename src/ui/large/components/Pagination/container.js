import { connect } from 'react-redux'
import {
  getTotal,
} from 'app/selectors/listings'

import {
  nextPageLink,
  previousPageLink,
} from 'app/selectors/criteria'

import {
  getPageStartIndex,
  getPageEndIndex,
  getHasMultiplePages,
  getIsLastPage,
  getIsFirstPage,
} from 'app/selectors/page'
import Pagination from './Pagination'

const mapStateToProps = state => ({
  start: getPageStartIndex(state),
  end: getPageEndIndex(state),
  hasMultiplePages: getHasMultiplePages(state),
  total: getTotal(state),
  isLastPage: getIsLastPage(state),
  isFirstPage: getIsFirstPage(state),
  nextPageLink: nextPageLink(state),
  previousPageLink: previousPageLink(state),
})

export default connect(mapStateToProps)(Pagination)
