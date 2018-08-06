import React from 'react'
import { mount } from 'enzyme'
import { map, TEST_BBOX } from 'gmap-mocks'
import { MIN_ZOOM } from 'app/const'
import MapBounds, { DEBOUNCE_TIME } from '../MapBounds'
import { emitMapDragEnd, emitMapZoomEvent } from '../events'

describe('ui/shared/components/Map/MapBounds', () => {
  it('calls boundingBoxHandler on drag end event', done => {
    const callback = jest.fn()
    const wrapper = mount(
      <MapBounds
        map={map}
        boundingBoxHandler={callback}
        currentMapZoom={MIN_ZOOM}
      />
    )
    emitMapDragEnd() // first event is debounced
    emitMapZoomEvent()
    setTimeout(() => { // need to wait between events
      emitMapDragEnd()
    }, DEBOUNCE_TIME + 10)

    setTimeout(() => {
      try {
        wrapper.unmount()
        expect(callback.mock.calls.length).toBe(1)
        expect(callback).toHaveBeenCalledWith({ bbox: TEST_BBOX })
        done()
      } catch (error) {
        done.fail(error)
      }
    }, DEBOUNCE_TIME + 10)
  })
})
