import propOr from 'ramda/src/propOr'
import { parseCriteriaFromSlug, addPdpSlugToCriteria } from 'app/store/thunks'
import { getHomeMetaContent } from 'app/store/shared/actions'
import { pageAndQueryReviews } from 'app/store/small/actions'

import App from 'app/components/core/App'
import {
  HOME_PAGE,
  SEARCH_RESULTS_PAGE,
  DETAIL_PAGE,
  ERROR_PAGE,
  ZIP_PAGE_REGEX,
  HOOD_PAGE_REGEX,
  CITY_STATE_PAGE_REGEX,
  DETAIL_PAGE_REGEX,
  CATCHALL_SEARCH_TYPE,
  ZIP_SEARCH_TYPE,
  HOOD_SEARCH_TYPE,
  DETAIL_SEARCH_TYPE,
} from 'app/const'
import { dynamic } from 'lib/import'
import sharedRoutes from 'ui/shared/routes'
import { getHasPreviousSearch } from 'app/selectors/criteria'

const DEFAULT_REVIEWS_PAGE = 1

const Home = dynamic({
  resolve: () => import('ui/small/pages/Home'),
})

const SearchResultsPage = dynamic({
  resolve: () => import('ui/small/pages/SearchResults'),
})

const DetailPage = dynamic({
  resolve: () => import('ui/small/pages/PDP'),
})

const NotFound = dynamic({
  resolve: () => import('ui/small/pages/NotFound'),
})

export default [{
  path: '/',
  component: App,
  routes: [
    {
      path: '/',
      name: HOME_PAGE,
      component: Home,
      action: () => dispatch => {
        dispatch(getHomeMetaContent())
      },
    },
    {
      path: '/error',
      name: ERROR_PAGE,
      component: NotFound,
    },
    ...sharedRoutes,
    {
      // NOTE: detail page should be placed before all search regexes
      path: DETAIL_PAGE_REGEX,
      name: DETAIL_PAGE,
      component: DetailPage,
      type: DETAIL_SEARCH_TYPE,
      action: props => (dispatch, store) => {
        // if server side visit and no previous search
        const state = store()

        const ssrVisit = getHasPreviousSearch(state)
        const reviewsPage = propOr(
          DEFAULT_REVIEWS_PAGE,
          'props.location.query.reviewsPage'
        )(props)

        dispatch(pageAndQueryReviews(reviewsPage))

        if (!ssrVisit) {
          dispatch(parseCriteriaFromSlug(props.location, props.route, state))
        } else {
          // NOTE: this fires when a user has transitioned from any js page -> pdp
          dispatch(addPdpSlugToCriteria(props.location.pathname, state))
        }
      },
    },
    {
      path: HOOD_PAGE_REGEX,
      name: SEARCH_RESULTS_PAGE,
      type: HOOD_SEARCH_TYPE,
      component: SearchResultsPage,
      action: props => (dispatch, store) => {
        dispatch(parseCriteriaFromSlug(props.location, props.route, store()))
      },
    },
    {
      path: ZIP_PAGE_REGEX,
      name: SEARCH_RESULTS_PAGE,
      component: SearchResultsPage,
      type: ZIP_SEARCH_TYPE,
      action: props => (dispatch, store) => {
        dispatch(parseCriteriaFromSlug(props.location, props.route, store()))
      },
    },
    {
      path: CITY_STATE_PAGE_REGEX,
      name: SEARCH_RESULTS_PAGE,
      component: SearchResultsPage,
      // NOTE: this route is shared for city/state, college, and military searches
      type: CATCHALL_SEARCH_TYPE,
      action: props => (dispatch, store) => {
        dispatch(parseCriteriaFromSlug(props.location, props.route, store()))
      },
    },
    {
      path: '*',
      name: ERROR_PAGE,
      component: NotFound,
      status: 404,
    },
  ],
}]
