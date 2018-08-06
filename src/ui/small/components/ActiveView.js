import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import theme from 'ui/small/themes/SmallTheme'
import { Layout } from 'ui/small/components/Layout'
import PageViewTracker from 'ui/shared/components/PageViewTracker'
import SearchResultsLayout from 'ui/small/themes/layouts/SearchResults.css'
import {
  views,
  MapView,
  ListView,
  FiltersView,
  ToggleBar,
} from './View'

// Note about theme:
// This component is created before the Layout component,
// so it doesn't get the theme.
// Also it creates several child components and passes them
// to the Layout component, so these child components need to have
// the theme manually set.

export default class ActiveView extends Component {
  static propTypes = {
    currentView: PropTypes.string.isRequired,
    updateViews: PropTypes.func.isRequired,
    loadedViews: PropTypes.object,
    layout: PropTypes.object,
  }

  static defaultProps = {
    currentView: 'map',
    layout: SearchResultsLayout,
  }

  get mapView() {
    return (
      <MapView
        key="mapview"
        toggleView={this.toggleView}
      />
    )
  }

  get filterView() {
    return (
      <FiltersView
        key="filterview"
        theme={theme}
        toggleView={this.toggleView}
      />
    )
  }

  get listView() {
    return (
      <ListView
        key="listview"
        theme={theme}
        toggleView={this.toggleView}
      />
    )
  }

  get header() {
    const {
      currentView,
    } = this.props

    return currentView === 'filters' ? false : undefined
  }

  get footer() {
    const {
      currentView,
    } = this.props

    if (currentView === 'filters') {
      return false
    }

    return (
      <ToggleBar
        theme={theme}
        views={views}
        currentView={currentView}
        toggleView={this.toggleView}
      />
    )
  }

  @autobind
  toggleView(nextView) {
    const {
      currentView,
      updateViews,
    } = this.props

    updateViews(nextView, currentView, true)
  }

  render() {
    const {
      loadedViews,
      layout,
    } = this.props

    return (
      <Layout
        headerComponent={this.header}
        footerComponent={this.footer}
        layout={layout}
      >
        <PageViewTracker />
        {loadedViews.map && this.mapView}
        {loadedViews.filters && this.filterView}
        {loadedViews.list && this.listView}
      </Layout>
    )
  }
}
