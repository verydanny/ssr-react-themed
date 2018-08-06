import App from 'app/components/core/App'
import { parseCriteriaFromSlug } from 'app/store/thunks'
import { getHomeMetaContent } from 'app/store/shared/actions'
import {
  HOME_PAGE,
  SEARCH_RESULTS_PAGE,
  DETAIL_PAGE_REGEX,
  DETAIL_PAGE,
  ERROR_PAGE,
  HOOD_PAGE_REGEX,
  ZIP_PAGE_REGEX,
  CITY_STATE_PAGE_REGEX,
} from 'app/const'
import { dynamic } from 'lib/import'
import sharedRoutes from 'ui/shared/routes'

const Home = dynamic({
  resolve: () => import('ui/large/pages/Home'),
})

const DetailPage = dynamic({
  resolve: () => import('ui/large/pages/Pdp'),
})

const SearchResultsPage = dynamic({
  resolve: () => import('ui/large/pages/SearchResults'),
})

const NotFound = dynamic({
  // TODO: custom 404 page for large
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
    ...sharedRoutes,
    {
      // NOTE: detail page should be placed before all search regexes
      path: DETAIL_PAGE_REGEX,
      name: DETAIL_PAGE,
      component: DetailPage,
      type: 'DETAIL',
    },
    {
      path: HOOD_PAGE_REGEX,
      name: SEARCH_RESULTS_PAGE,
      type: 'HOOD',
      component: SearchResultsPage,
      action: props => (dispatch, store) => {
        dispatch(parseCriteriaFromSlug(props.location, props.route, store()))
      },
    },
    {
      path: ZIP_PAGE_REGEX,
      name: SEARCH_RESULTS_PAGE,
      component: SearchResultsPage,
      type: 'ZIP',
      action: props => (dispatch, store) => {
        dispatch(parseCriteriaFromSlug(props.location, props.route, store()))
      },
    },
    {
      path: CITY_STATE_PAGE_REGEX,
      name: SEARCH_RESULTS_PAGE,
      component: SearchResultsPage,
      type: 'CATCHALL',
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
