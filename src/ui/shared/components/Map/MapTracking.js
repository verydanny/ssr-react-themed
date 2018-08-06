import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ofType } from 'redux-observable'
import autobind from 'autobind-decorator'
import withMapEvents from './withMapEvents'
import {
  MAP_ZOOM_EVENT,
  MAP_DRAG_END,
} from './eventTypes'

class MapTracking extends PureComponent {
  static contextTypes = {
    map: PropTypes.object,
  }

  static propTypes = {
    mapObservable: PropTypes.object,
    map: PropTypes.object,
  }

  componentDidMount() {
    this.lastZoom = this.props.map.getZoom()
    this.setupEventResponses()
  }

  setupEventResponses() {
    const { mapObservable } = this.props

    mapObservable
         .pipe(ofType(MAP_ZOOM_EVENT))
         .subscribe(this.createZoomEvent)
    mapObservable
         .pipe(ofType(MAP_DRAG_END))
         .subscribe(this.createDragEvent)
  }

  @autobind
  createZoomEvent() {
    const { map } = this.props

    const zoom = map.getZoom()
    const direction = zoom > this.lastZoom ? 'in' : 'out'
    this.lastZoom = zoom
    const data = {
      page: 'srp_map',
      section: 'map',
      item: `zoom_${direction}`,
    }
    this.createEventType('click', data)
  }

  createEventType(type, data) {
    window.eventTracker.track(type, data)
  }

  @autobind
  createDragEvent() {
    const data = {
      page: 'srp_map',
      section: 'map',
      item: 'pan',
    }

    this.createEventType('click', data)
  }

  render() {
    return null
  }
}

export default withMapEvents(MapTracking)
