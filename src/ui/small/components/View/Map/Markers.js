import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { Markers as MapMarkers } from '@rentpath/react-ui-core'
import { emitMarkerClick, markerNormalIcon } from 'ui/shared/components/Markers'
import { MarkerSelector } from 'ui/small/components/Map'

const MARKER_EVENTS = {
  onClick: emitMarkerClick,
}

export default class Markers extends PureComponent {
  static propTypes = {
    map: PropTypes.object,
    geojson: PropTypes.object,
    selectedListingId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    handleCardDrawer: PropTypes.func,
  }

  static defaultProps = {
    handleCardDrawer: () => {},
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
      zIndex: properties.isActive ? 2 : 1,
      title: null,
      ...MARKER_EVENTS,
    }
  }

  render() {
    const { map, geojson, handleCardDrawer } = this.props
    const { selectedMarker } = this.state

    return (
      <Fragment>
        <MapMarkers
          map={map}
          geojson={geojson}
          marker={this.markerFromFeature}
          onMarkersReady={this.updateMarkers}
        />
        <MarkerSelector
          map={map}
          selectedMarker={selectedMarker}
          handleCardDrawer={handleCardDrawer}
        />
      </Fragment>
    )
  }
}
