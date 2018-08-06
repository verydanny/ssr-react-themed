import debounce from 'lodash/debounce'
import getOr from 'lodash/fp/getOr'
import has from 'lodash/fp/has'
import isBrowser from 'lib/utils/isBrowser'
import { importErrorHandler } from 'lib/import'
import { MAP_ZOOM_EVENT } from './eventTypes'

export default (mapClass, observable) => {
  if (isBrowser()) {
    import('hammerjs').then(result => {
      const Hammer = result
      const mapElements = document.getElementsByClassName(mapClass)
      const mapEle = mapElements.length && mapElements[0]

      if (mapEle) {
        const mc = new Hammer.Manager(mapEle)
        const doubleTap = new Hammer.Tap({ event: 'doubleTap', taps: 2 })
        const tap = new Hammer.Tap()
        const pinch = new Hammer.Pinch()
        mc.add(doubleTap)
        mc.add(pinch)
        mc.add(tap)

        const runZoomEvent = debounce(event => {
          observable.next({ type: MAP_ZOOM_EVENT, event })
        }, 500)

        mc.on('doubleTap', runZoomEvent)
        mc.on('tap', e => {
          if (has('srcEvent')(e)) {
            const ele = getOr({ getAttribute: () => false }, 'srcEvent.target')(
              e
            )
            const button = ele && ele.closest('button')

            if (button) {
              const label = button.getAttribute('aria-label')

              if (label === 'Zoom in' || label === 'Zoom out') {
                runZoomEvent(e)
              }
            }
          }
        })
        mc.on('pinch', runZoomEvent)

        mapEle.addEventListener('mousewheel', runZoomEvent, true)
        mapEle.addEventListener('wheel', runZoomEvent, true)
        mapEle.addEventListener('DOMMouseScroll', runZoomEvent, true)
      }
    }).catch(importErrorHandler)
  }
}
