import React from 'react'
import { shallow } from 'enzyme'
import GeoCircle from '../GeoCircle'

describe('ui/shared/components/MetaTagsBody', () => {
  it('renders geo circle', () => {
    const wrapper = shallow(<GeoCircle />)
    const element = wrapper.find('div[itemProp="circle"]')
    expect(element.length).toBe(1)
  })
  it('renders geo radius', () => {
    const wrapper = shallow(<GeoCircle />)
    const element = wrapper.find('div[itemProp="geoMidpoint"]')
    expect(element.length).toBe(1)
  })
  it('sets latitude meta', () => {
    const testLatitude = 34.0522
    const wrapper = shallow(<GeoCircle lat={testLatitude} />)
    const element = wrapper.find('meta[itemProp="latitude"]')
    expect(element.length).toBe(1)
    expect(element.props().content).toEqual(testLatitude)
  })
  it('sets longitude meta', () => {
    const testLongitude = -118.2428
    const wrapper = shallow(<GeoCircle lng={testLongitude} />)
    const element = wrapper.find('meta[itemProp="longitude"]')
    expect(element.length).toBe(1)
    expect(element.props().content).toEqual(testLongitude)
  })
  it('sets radius meta', () => {
    const testRadius = 30
    const wrapper = shallow(<GeoCircle radius={testRadius} />)
    const element = wrapper.find('meta[itemProp="geoRadius"]')
    expect(element.length).toBe(1)
    expect(element.props().content).toEqual(testRadius)
  })
})
