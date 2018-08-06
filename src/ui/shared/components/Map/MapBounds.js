import { Component } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { debounceTime } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { getBoundsArray } from 'app/selectors/map'
import { GmapInteraction } from '@rentpath/react-ui-core'
import { MIN_ZOOM } from 'app/const'
import withMapEvents from './withMapEvents'
import { MAP_DRAG_END, MAP_ZOOM_EVENT } from './eventTypes'
import setupZoomEvents from './setupMapZoomEvents'

export const DEBOUNCE_TIME = 100

class MapBounds extends Component {
  static propTypes = {
    map: PropTypes.object,
    currentMapZoom: PropTypes.number,
    mapObservable: PropTypes.object,
    boundingBoxHandler: PropTypes.func,
    mapClass: PropTypes.string,
    onComplete: PropTypes.func,
  }

  componentDidMount() {
    const { mapObservable, mapClass, onComplete } = this.props

    setupZoomEvents(mapClass, mapObservable)

    this.hasDragged = false

    GmapInteraction.call('addListener', ['idle', () => {
      if (this.hasDragged) {
        this.callBoundingBoxHandler()
        this.hasDragged = false
      }
    }])

    mapObservable
      .pipe(ofType(MAP_ZOOM_EVENT), debounceTime(DEBOUNCE_TIME))
      .subscribe(() => this.callBoundingBoxHandler())

    mapObservable
      .pipe(ofType(MAP_DRAG_END))
      .subscribe(() => {
        this.hasDragged = true
      })

    if (onComplete) onComplete()
  }

  @autobind
  callBoundingBoxHandler() {
    const { map, boundingBoxHandler, currentMapZoom } = this.props

    if (boundingBoxHandler && currentMapZoom >= MIN_ZOOM) {
      boundingBoxHandler({
        bbox: getBoundsArray(map.getBounds()),
      })
    }
  }

  render() {
    return null
  }
}

export default withMapEvents(MapBounds)
