import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import env from 'config/env'
import {
  Gmap,
  Markers,
} from '@rentpath/react-ui-core'
import { PDPMapToggleButton } from 'ui/small/components/PDP/components/PDPMapToggleButton'
import {
  dataStyler,
  emitMapDragEnd,
  emitMapClick,
} from 'ui/shared/components/Map'
import {
  PDP_LOGO_PIN,
} from 'ui/shared/components/Markers'

import { DEFAULT_ZOOM } from './const'

const MAP_CONTROLS = {
  mapTypeControl: false,
  streetViewControl: false,
  draggableCursor: 'auto',
  zoomControl: false,
  zoomControlOptions: {
    position: 3, // google.maps.ControlPosition.TOP_RIGHT
  },
}

const getPoint = center => ({
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        center.lng,
        center.lat,
      ],
    },
    properties: {
      id: 'pdpPin',
      isActive: true,
    },
  }],
})

const getMarker = () => ({
  icon: PDP_LOGO_PIN,
})

const MAP_EVENTS = {
  onClick: emitMapClick,
  onDragEnd: emitMapDragEnd,
}

const PDPMap = ({
  center,
  theme,
  zoom,
}) => (
  <div className={theme.PDPMap}>
    <PDPMapToggleButton />
    <div
      className={theme.PDPMap_Wrapper}
      data-tid="pdpMap"
    >
      <Gmap
        apiKey={env.GOOGLE_MAPS_API_KEY}
        mapControls={MAP_CONTROLS}
        center={center}
        zoom={zoom}
        stylingFunction={dataStyler}
        {...MAP_EVENTS}
      >
        <Markers
          geojson={getPoint(center)}
          marker={getMarker}
        />
      </Gmap>

    </div>
  </div>
)

PDPMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  theme: PropTypes.object,
  zoom: PropTypes.number,
}

PDPMap.defaultProps = {
  theme: {},
  zoom: DEFAULT_ZOOM,
}

export default themed(/^PDPMap/, { pure: true })(PDPMap)
