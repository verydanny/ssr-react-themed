import { connect } from 'react-redux'
import {
  locationSlug as locationSlugSelector,
  seoRelPrevious,
  seoRelNext,
} from 'app/selectors/criteria'
import {
  host as hostSelector,
  protocol as protocolSelector,
} from 'app/selectors/router'
import { taggingRefinements } from 'app/selectors/refinements'
import { viewIsAlternatePage } from 'app/selectors/page'
import metaRobots from 'app/selectors/meta/metaRobots'
import canonicalUri from 'app/selectors/meta/canonicalUri'
import {
  buildUrlFromSelector,
  getTitle as getMetaTitle,
  getDescription as getMetaDescription,
} from 'app/selectors/meta'
import {
  getIsDesktop,
} from 'app/selectors/request'
import MetaTags from './components/MetaTags'

const mapStateToProps = state => ({
  description: getMetaDescription(state),
  title: getMetaTitle(state),
  robots: metaRobots(state),
  canonicalUrl: buildUrlFromSelector(canonicalUri)(state),
  host: hostSelector(state),
  protocol: protocolSelector(state),
  taggingRefinements: taggingRefinements(state),
  locationSlug: locationSlugSelector(state),
  viewIsAlternatePage: viewIsAlternatePage(state),
  previousUrl: buildUrlFromSelector(seoRelPrevious)(state),
  nextUrl: buildUrlFromSelector(seoRelNext)(state),
  isDesktop: getIsDesktop(state),
})

const withRedux = connect(mapStateToProps, {})

export default withRedux(MetaTags)
