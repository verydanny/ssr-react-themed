import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { Markers as MapMarkers } from '@rentpath/react-ui-core'
import {
  emitMarkerClick,
  emitMarkerMouseOver,
  emitMarkerMouseOut,
  markerNormalIcon,
} from 'ui/shared/components/Markers'
import PinPopUp from './PinPopUp'

const MARKER_EVENTS = {
  onClick: emitMarkerClick,
  onMouseOver: emitMarkerMouseOver,
  onMouseOut: emitMarkerMouseOut,
}

export default class Markers extends PureComponent {
  static propTypes = {
    map: PropTypes.object,
    geojson: PropTypes.object,
    selectedListingId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const selectedMarker = prevState.markers[nextProps.selectedListingId]

    if (selectedMarker !== prevState.selectedMarker) {
      return { selectedMarker }
    }

    return null
  }

  state = {
    selectedMarker: null,
    markers: {},
  }

  @autobind
  updateMarkers(markers) {
    this.setState({ markers })
  }

  markerFromFeature({ properties }) {
    return {
      icon: markerNormalIcon(properties),
      isPaid: properties.isPaid,
      title: null,
      zIndex: properties.isActive ? 2 : 1,
      ...MARKER_EVENTS,
    }
  }

  render() {
    const { selectedMarker } = this.state
    const { map, geojson } = this.props

    return (
      <Fragment>
        <MapMarkers
          map={map}
          geojson={geojson}
          marker={this.markerFromFeature}
          onMarkersReady={this.updateMarkers}
        />
        <PinPopUp
          map={map}
          selectedMarker={selectedMarker}
        />
      </Fragment>
    )
  }
}
