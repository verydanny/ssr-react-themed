import React from 'react'
import { shallow } from 'enzyme'
import 'google-maps-mock'
import Markers from '../Markers'

const testListingId = '1234567'

const testMap = new window.google.maps.Map()

const testMarker = new window.google.maps.Marker({ map: testMap })
testMarker.id = testListingId

const testMarkers = {
  [testListingId]: testMarker,
}

const testFeature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [
      -84.38781,
      33.786645,
    ],
  },
  properties: {
    id: '2034989',
    name: 'Atlantic House',
    isPaid: true,
    isActive: true,
  },
}

const inactiveFeature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [
      -84.38781,
      33.786645,
    ],
  },
  properties: {
    id: '2034989',
    name: 'Atlantic House',
    isPaid: false,
    isActive: false,
  },
}

describe('ui/large/components/MapView/Markers', () => {
  it('sets the selectedMarker state when selected listing id changes', () => {
    const wrapper = shallow(<Markers geojson={{}} />)
    wrapper.instance().updateMarkers(testMarkers)
    wrapper.setProps({ selectedListingId: testListingId })
    expect(wrapper.state('selectedMarker')).toBe(testMarker)
  })

  it('sets correct marker data for active listings', () => {
    const wrapper = shallow(<Markers geojson={{}} />)
    expect(wrapper.instance().markerFromFeature(testFeature)).toMatchSnapshot()
  })

  it('sets the correct marker data for inactive listings', () => {
    const wrapper = shallow(<Markers geojson={{}} />)
    expect(wrapper.instance().markerFromFeature(inactiveFeature)).toMatchSnapshot()
  })
})
