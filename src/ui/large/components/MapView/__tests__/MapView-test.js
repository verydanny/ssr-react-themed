import React from 'react'
import { shallow } from 'enzyme'
import ThemedMapView from '../MapView'

const MapView = ThemedMapView.WrappedComponent

describe('ui/large/components/MapView/MapView', () => {
  const requiredProps = {
    mapZoomChanged: () => false,
  }
  it('passes center and zoom to Google Maps component', () => {
    const testCenter = { lat: 33.7490, lng: -84.3880 }
    const testZoom = 4
    const wrapper = shallow(<MapView center={testCenter} zoom={testZoom} {...requiredProps} />)
    const props = wrapper.props()
    expect(props.center).toEqual(testCenter)
    expect(props.zoom).toEqual(testZoom)
  })

  it('includes a Markers component', () => {
    const wrapper = shallow(<MapView {...requiredProps} />)
    const markers = wrapper.find('Markers')
    expect(markers.length).toBe(1)
  })

  it('includes a MapBounds component', () => {
    const wrapper = shallow(<MapView {...requiredProps} />)
    const mapbounds = wrapper.find('withMapEvents(MapBounds)')
    expect(mapbounds.length).toBe(1)
  })
})
