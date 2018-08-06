import React from 'react'
import { shallow } from 'enzyme'
import MetaTags from '../MetaTags'

const props = {
  protocol: 'https:',
  host: 'local.rentjs.com',
  canonicalUrl: 'http://foo.bar',
}

describe('ui/shared/components/MetaTags', () => {
  describe('uses defaults when appropriate', () => {
    const wrapper = shallow(<MetaTags {...props} />)

    it('defaults meta description', () => {
      const expected = MetaTags.defaultProps.description
      const element = wrapper.find('meta[name="description"]')
      expect(element.length).toBe(1)
      expect(element.props().content).toEqual(expected)
    })

    it('defaults title', () => {
      const expected = MetaTags.defaultProps.title
      const element = wrapper.find('title')
      expect(element.length).toBe(1)
      expect(element.text()).toEqual(expected)
    })
  })

  it('sets meta description', () => {
    const testDescription = 'test description'
    const wrapper = shallow(<MetaTags {...props} description={testDescription} />)
    const element = wrapper.find('meta[name="description"]')
    expect(element.length).toBe(1)
    expect(element.props().content).toEqual(testDescription)
  })

  it('sets title', () => {
    const testTitle = 'test title'
    const wrapper = shallow(<MetaTags {...props} title={testTitle} />)
    const element = wrapper.find('title')
    expect(element.length).toBe(1)
    expect(element.text()).toEqual(testTitle)
  })

  it('defaults to no robots meta', () => {
    const wrapper = shallow(<MetaTags {...props} />)
    const element = wrapper.find('meta[name="robots"]')
    expect(element.length).toBe(0)
  })

  it('sets canonical link tag', () => {
    const wrapper = shallow(<MetaTags {...props} />)
    const element = wrapper.find('link[rel="canonical"]')
    expect(element.length).toBe(1)
    expect(element.prop('href')).toEqual(props.canonicalUrl)
  })

  it('sets robots meta', () => {
    const testRobots = 'test robots'
    const wrapper = shallow(<MetaTags {...props} robots={testRobots} />)
    const element = wrapper.find('meta[name="robots"]')
    expect(element.length).toBe(1)
    expect(element.props().content).toEqual(testRobots)
  })
})
