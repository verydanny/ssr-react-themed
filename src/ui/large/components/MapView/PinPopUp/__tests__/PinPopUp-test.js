import React from 'react'
import { mount } from 'enzyme'
import 'google-maps-mock'
import {
  emitMarkerClick,
  emitMarkerMouseOver,
  emitMarkerMouseOut,
} from 'ui/shared/components/Markers'
import {
  emitMapClick,
} from 'ui/shared/components/Map'
import PinPopUp from '../PinPopUp'

const testMap = new window.google.maps.Map()
const testMarker = new window.google.maps.Marker({ map: testMap })
testMarker.id = '1234'
testMarker.isPaid = false
testMarker.isActive = true

const testEvent = (fn, done, timeout = 50) => {
  setTimeout(() => {
    try {
      fn()
      done()
    } catch (error) {
      done.fail(error)
    }
  }, timeout)
}

describe('ui/large/components/MapView/PinPopUp', () => {
  it('sets the listing id on marker click', done => {
    const callback = jest.fn()
    const wrapper = mount(<PinPopUp map={testMap} selectListingFromMapPin={callback} />)
    emitMarkerClick({}, {}, testMarker)
    testEvent(() => {
      expect(callback.mock.calls.length).toBe(1)
      const opts = { clicked: true, trackClick: true }
      expect(callback).toHaveBeenCalledWith(testMarker.id, opts, true, testMarker.isActive)
      wrapper.unmount()
    }, done)
  })

  it('mouse hover sets listing id, if no listing is currently clicked', done => {
    const callback = jest.fn()
    const wrapper = mount(<PinPopUp map={testMap} selectListingFromMapPin={callback} />)
    emitMarkerMouseOver({}, {}, testMarker)
    testEvent(() => {
      expect(callback.mock.calls.length).toBe(1)
      expect(callback).toHaveBeenCalledWith(testMarker.id, {}, false, testMarker.isActive)
      wrapper.unmount()
    }, done)
  })

  it('mouse hover does not set listing id if a marker is currently clicked', done => {
    const callback = jest.fn()
    const wrapper = mount(
      <PinPopUp
        map={testMap}
        selectListingFromMapPin={callback}
        selectedListingId="5678"
        selectedListingOptions={{ clicked: true }}
      />
    )
    emitMarkerMouseOver({}, {}, testMarker)
    testEvent(() => {
      expect(callback.mock.calls.length).toBe(0)
      wrapper.unmount()
    }, done)
  })

  it('clears the selected listing on mouse out', done => {
    const callback = jest.fn()
    const wrapper = mount(<PinPopUp map={testMap} clearListingData={callback} />)
    emitMarkerMouseOut({}, {}, testMarker)
    testEvent(() => {
      expect(callback.mock.calls.length).toBe(1)
      wrapper.unmount()
    }, done, 100)
  })

  it('clears any selected listing on map click', done => {
    const callback = jest.fn()
    const wrapper = mount(<PinPopUp map={testMap} clearListingData={callback} />)
    emitMapClick()
    testEvent(() => {
      expect(callback.mock.calls.length).toBe(1)
      wrapper.unmount()
    }, done)
  })
})
