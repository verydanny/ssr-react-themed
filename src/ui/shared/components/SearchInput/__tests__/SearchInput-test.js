import React from 'react'
import { reset } from 'dom'
import Cookies from 'universal-cookie'
import { getSearchTerm, removeSearchTerm } from 'lib/cookies/cookieManager'
import { mount } from 'enzyme'
import SearchInput from '../SearchInput'

const cookies = new Cookies()
const defaultSearch = { displayName: 'fromAPriorSearchOrGeoIp', locationSlug: '/foo' }

describe('SearchInput', () => {
  const props = {
    selectLocation: () => {},
    selectListing: jest.fn(),
    fetchLocation: () => {},
    updateTerm: () => {},
    updateSearch: () => {},
    queryParams: {},
    suggestedLocations: [],
    onFocus: () => {},
    cookies,
    defaultSearch,
  }

  const propsWithoutDefaultSearch = {
    selectLocation: () => {},
    fetchLocation: () => {},
    updateTerm: () => {},
    updateSearch: () => {},
    onFocus: () => {},
    suggestedLocations: [],
    queryParams: {},
    cookies,
  }

  const propsWithBoundingBox = {
    ...props,
    queryParams: {
      'display-mode': 'map',
      boundingbox: '-118.42,33.702,-117.975,34.279',
    },
    defaultSearch,
  }

  afterEach(() => {
    reset()
    removeSearchTerm()(cookies)
  })

  it('renders an empty input when not given a term, display value, location or default', () => {
    const wrapper = mount(<SearchInput {...propsWithoutDefaultSearch} />)
    expect(wrapper.find('input').getDOMNode().value).toEqual('')
  })

  it('uses defaultSearch displayName as placeholder when not on a bbox', () => {
    const wrapper = mount(<SearchInput {...props} />)
    expect(wrapper.find('input').getDOMNode().placeholder).toEqual(defaultSearch.displayName)
  })

  it('displays Map Location when there is a bounding box', () => {
    // If the user pans the map, a boundingbox parameter is added,
    // and the search input should show the placeholder "Map Location" instead of the
    // previous location.
    const wrapper = mount(<SearchInput {...propsWithBoundingBox} />)
    expect(wrapper.find('input').getDOMNode().placeholder).toEqual('Map Location')
  })

  it('does not save Map Location as a saved search term using cookie', () => {
    const wrapper = mount(<SearchInput {...propsWithBoundingBox} />)
    expect(wrapper.find('input').getDOMNode().placeholder).toEqual('Map Location')
    expect(getSearchTerm()(cookies)).toEqual(undefined)
  })

  it('calls fetchLocations on input change', () => {
    const mock = jest.fn()
    const wrapper = mount(<SearchInput {...props} />)
    wrapper.instance().fetchLocations = mock
    wrapper.find('input').simulate('change')
    setTimeout(() => {
      expect(mock).toHaveBeenCalled()
    }, 200)
  })

  describe('selectLocation', () => {
    it('returns without a location', () => {
      const instance = mount(<SearchInput {...props} />).instance()
      const actual = instance.selectLocation()
      const expected = undefined
      expect(actual).toEqual(expected)
    })

    it('defaults to all propertytypes when no propertyType is provided', () => {
      const selectLocation = jest.fn()
      const instance = mount(
        <SearchInput {...props} selectLocation={selectLocation} />
      ).instance()

      instance.selectLocation({ locationSlug: 'georgia/atlanta' })
      const args = { locationSlug: 'georgia/atlanta', propertyType: undefined, queryParams: {}, refinementSlug: 'apartments_condos_houses_townhouses' }
      expect(selectLocation).toHaveBeenCalledWith(args)
    })

    it('selects a location with refinements and propertyType', () => {
      const selectLocation = jest.fn()
      const instance = mount(
        <SearchInput
          {...props}
          selectLocation={selectLocation}
          refinementSlug="min-price-200_controlled_access"
          propertyType="apartments"
        />
      ).instance()

      instance.selectLocation({ locationSlug: 'georgia/atlanta' })
      const args = { locationSlug: 'georgia/atlanta', propertyType: 'apartments', queryParams: {}, refinementSlug: 'min-price-200_controlled_access' }
      expect(selectLocation).toHaveBeenCalledWith(args)
    })
  })
})
