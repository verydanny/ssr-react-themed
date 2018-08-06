import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PageView } from '@rentpath/react-ui-tracking'
import { locationToCriteria } from 'app/parsers'
import isEqual from 'lodash/isEqual'
import { DFPManager } from 'react-dfp'

export default class PageViewTracker extends Component {
  static propTypes = {
    taggingPageName: PropTypes.string.isRequired,
    criteria: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    listings: PropTypes.array.isRequired,
  }

  static defaultProps = {
    listings: [],
    criteria: {},
    route: {},
    location: {},
    refreshAds: true,
  }

  shouldComponentUpdate(nextProps) {
    const { taggingPageName, listings } = this.props
    const newView = taggingPageName !== nextProps.taggingPageName
    const newListings = !isEqual(listings, nextProps.listings)
    const willFetch = locationToCriteria(nextProps.location, nextProps.route, this.props)

    return (newView && !willFetch) || newListings
  }

  componentDidUpdate() {
    // When a second or subsequent pageview occurs, tell the ads to refresh
    DFPManager.refresh()
  }

  render() {
    const {
      taggingPageName,
      criteria,
      listings,
    } = this.props

    const pageNumber = criteria.pageNumber || 1

    return (
      <PageView
        page={taggingPageName}
        page_number={pageNumber}
        listings_array={listings && listings.length ? listings : 'none'}
      />
    )
  }
}
