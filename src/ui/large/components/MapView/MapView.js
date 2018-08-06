import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import {
  Gmap,
  Layer,
} from '@rentpath/react-ui-core'
import env from 'config/env'
import {
  MapBounds,
  MapTracking,
  dataStyler,
  emitMapDragEnd,
  emitMapClick,
  emitDataClick,
  emitMapZoomChanged,
  MAP_ZOOM_CHANGED,
} from 'ui/shared/components/Map'
import ZoomInBanner from 'ui/shared/components/ZoomInBanner'
import { eventSubject } from 'ui/shared/components/Map/events'
import { ofType } from 'redux-observable'
import Markers from './Markers'

const MAP_CONTROLS = {
  fullscreenControl: false,
  mapTypeControl: true,
  mapTypeControlOptions: {
    position: 3, // google.maps.ControlPosition.TOP_RIGHT
  },
  streetViewControl: true,
  draggableCursor: 'auto',
  zoomControl: true,
}

const MAP_EVENTS = {
  onClick: emitMapClick,
  onDragEnd: emitMapDragEnd,
  onZoomChanged: emitMapZoomChanged,
}

const LAYER_EVENTS = {
  onClick: emitDataClick,
}

@themed(/^MapView/)
export default class MapView extends PureComponent {
  static propTypes = {
    center: PropTypes.object,
    clearListingData: PropTypes.func,
    geoShape: PropTypes.object,
    points: PropTypes.object,
    theme: PropTypes.object,
    searchByBoundingBox: PropTypes.func,
    mapInitComplete: PropTypes.func,
    selectedListingId: PropTypes.string,
    zoom: PropTypes.number,
    belowMinZoom: PropTypes.bool,
    currentMapZoom: PropTypes.number,
    mapZoomChanged: PropTypes.func.isRequired,
    count: PropTypes.number,
    total: PropTypes.number,
  }

  static defaultProps = {
    theme: {},
  }

  componentDidMount() {
    const { mapZoomChanged } = this.props

    eventSubject
      .pipe(ofType(MAP_ZOOM_CHANGED))
      .subscribe(() => {
        mapZoomChanged()
      })
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

  render() {
    const {
      center,
      geoShape,
      searchByBoundingBox,
      selectedListingId,
      theme,
      zoom,
      points,
      mapInitComplete,
      belowMinZoom,
      currentMapZoom,
    } = this.props

    return (
      <Gmap
        className={theme.MapView}
        apiKey={env.GOOGLE_MAPS_API_KEY}
        mapControls={MAP_CONTROLS}
        center={center}
        zoom={zoom}
        stylingFunction={dataStyler}
        {...MAP_EVENTS}
      >
        {this.zoomInBanner}
        { !belowMinZoom &&
          <Markers geojson={points} selectedListingId={selectedListingId} />
        }
        <MapBounds
          boundingBoxHandler={searchByBoundingBox}
          currentMapZoom={currentMapZoom}
          mapClass={theme.MapView}
          onComplete={mapInitComplete}
        />
        { !!geoShape && <Layer geojson={geoShape} {...LAYER_EVENTS} /> }
        <MapTracking />
      </Gmap>
    )
  }
}
