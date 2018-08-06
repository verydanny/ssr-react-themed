import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { forceCheck as imageGalleryForceCheck } from 'react-lazyload'
import { Gmap, Layer } from '@rentpath/react-ui-core'
import env from 'config/env'
import { ALTERNATE_SPINNER } from 'app/store/types'
import { Listings } from 'ui/small/components/ListingCard'
import TotalCountBanner from 'ui/small/components/TotalCountBanner'
import ZoomInBanner from 'ui/shared/components/ZoomInBanner'
import LoadingBanner from 'ui/small/components/LoadingBanner'
import {
  MapBounds,
  dataStyler,
  emitMapDragEnd,
  emitMapDragStart,
  emitMapZoomChanged,
  MapTracking,
  MAP_DRAG_START,
  MAP_ZOOM_CHANGED,
} from 'ui/shared/components/Map'
import { ofType } from 'redux-observable'
import { eventSubject } from 'ui/shared/components/Map/events'
import Markers from './Markers'

const MAP_CONTROLS = {
  fullscreenControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  zoomControl: false,
}

const MAP_EVENTS = {
  onDragEnd: emitMapDragEnd,
  onDragStart: emitMapDragStart,
  onZoomChanged: emitMapZoomChanged,
}

export default class MapView extends Component {
  static propTypes = {
    currentView: PropTypes.string,
    center: PropTypes.object,
    city: PropTypes.string,
    count: PropTypes.number,
    geoShape: PropTypes.object,
    gotoNextPage: PropTypes.func,
    gotoPreviousPage: PropTypes.func,
    hidden: PropTypes.bool,
    loading: PropTypes.bool,
    loadingOptions: PropTypes.object,
    nextPageLink: PropTypes.string,
    openModal: PropTypes.func,
    pathname: PropTypes.string,
    pageNumber: PropTypes.number,
    points: PropTypes.object,
    previousPageLink: PropTypes.string,
    pushState: PropTypes.func,
    query: PropTypes.object,
    searchByBoundingBox: PropTypes.func,
    mapInitComplete: PropTypes.func,
    selectListing: PropTypes.func,
    selectedListingId: PropTypes.string,
    toggleView: PropTypes.func,
    total: PropTypes.number,
    viewportListings: PropTypes.array,
    zoom: PropTypes.number,
    belowMinZoom: PropTypes.bool,
    currentMapZoom: PropTypes.number,
    mapZoomChanged: PropTypes.func.isRequired,
    features: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      drawerHidden: true,
      withPagination: true,
      showBanner: true,
    }
  }

  componentDidMount() {
    const { mapZoomChanged } = this.props
    imageGalleryForceCheck()
    this.setHideBannerTimeout()

    eventSubject
      .pipe(ofType(MAP_DRAG_START))
      .subscribe(() => this.handleCardDrawer(true))

    eventSubject
      .pipe(ofType(MAP_ZOOM_CHANGED))
      .subscribe(mapZoomChanged)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.points !== this.props.points) {
      this.setState({ showBanner: true })
      this.setHideBannerTimeout()
    } else {
      this.setState({ showBanner: false })
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.hidden && this.props.hidden) {
      return false
    }
    return true
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hidden && !this.props.hidden) {
      imageGalleryForceCheck()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle)
  }

  get viewInfo() {
    const { total, toggleView, loading, count, belowMinZoom } = this.props

    if (this.state.showBanner && !loading && !belowMinZoom) {
      return (
        <TotalCountBanner
          viewingCount={count}
          totalProperties={total}
          toggleView={toggleView}
        />
      )
    }
    return null
  }

  get loadingBanner() {
    const { loading, loadingOptions, belowMinZoom } = this.props

    if (loading && loadingOptions && !belowMinZoom &&
      loadingOptions.spinner !== ALTERNATE_SPINNER) {
      return <LoadingBanner />
    }
    return null
  }

  get zoomInBanner() {
    if (this.props.belowMinZoom) {
      return (
        <ZoomInBanner
          text="Zoom in on the map to see more."
        />
      )
    }
    return null
  }

  @autobind
  setHideBannerTimeout() {
    this.timeoutHandle = setTimeout(() => {
      this.setState({
        showBanner: false,
      })
    }, 5000)
  }

  @autobind
  handleCardDrawer(hide) {
    this.setState({ drawerHidden: hide })
  }

  @autobind
  showTotalCountBanner() {
    this.setState({ showBanner: true })
    this.setHideBannerTimeout()
  }

  render() {
    const {
      center,
      city,
      count,
      currentView,
      geoShape,
      gotoNextPage,
      gotoPreviousPage,
      hidden,
      loading,
      loadingOptions,
      nextPageLink,
      openModal,
      pageNumber,
      pathname,
      points,
      previousPageLink,
      pushState,
      query,
      searchByBoundingBox,
      selectListing,
      selectedListingId,
      total,
      viewportListings,
      zoom,
      mapInitComplete,
      features,
      belowMinZoom,
      currentMapZoom,
    } = this.props

    const { drawerHidden } = this.state

    // NOTE: we cannot use display:none because it resizes the map
    // also, <div hidden /> does not work either
    const style = hidden ? { visibility: 'hidden' } : {}

    return (
      <div
        data-tid="google-map-container"
        data-tag_section="map"
        style={style}
      >
        {this.viewInfo}
        {this.loadingBanner}
        {this.zoomInBanner}
        <Gmap
          apiKey={env.GOOGLE_MAPS_API_KEY}
          mapControls={MAP_CONTROLS}
          center={center}
          zoom={zoom}
          points={points}
          stylingFunction={dataStyler}
          className="Gmap_Container"
          {...MAP_EVENTS}
        >
          { !belowMinZoom &&
            <Markers
              geojson={points}
              selectedListingId={selectedListingId}
              handleCardDrawer={this.handleCardDrawer}
            />
          }
          <MapBounds
            boundingBoxHandler={searchByBoundingBox}
            currentMapZoom={currentMapZoom}
            mapClass="Gmap_Container"
            onComplete={mapInitComplete}
          />
          { !!geoShape && <Layer geojson={geoShape} /> }
          <MapTracking />
        </Gmap>
        { !hidden && !belowMinZoom &&
          <Listings
            listings={viewportListings}
            currentView={currentView}
            selectListing={selectListing}
            selectedListingId={selectedListingId}
            viewType="map"
            count={count}
            total={total}
            pageNumber={pageNumber}
            city={city}
            gotoNextPage={gotoNextPage}
            gotoPreviousPage={gotoPreviousPage}
            pathname={pathname}
            query={query}
            loading={loading}
            loadingOptions={loadingOptions}
            drawerHidden={drawerHidden}
            handleCardDrawer={this.handleCardDrawer}
            pushState={pushState}
            withPaginationCards={this.state.withPagination}
            withInfiniteScroll
            previousPageLink={previousPageLink}
            nextPageLink={nextPageLink}
            openModal={openModal}
            features={features}
          />
        }
      </div>
    )
  }
}
