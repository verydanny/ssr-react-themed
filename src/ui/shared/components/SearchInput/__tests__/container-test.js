import React from 'react'
import { mount } from 'enzyme'
import { createMockStore } from 'mocks'
import { initialState as criteria } from 'app/store/reducers/criteria'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import Container from '../container'

describe('shared/SearchInput/container', () => {
  let component
  let store
  const location = 'Atlanta, GA'
  const state = {
    criteria: {
      ...criteria,
      locationSlug: 'georgia/atlanta',
    },
    searchInput: {
      term: 'foo',
      displayValue: 'bar',
      currentLocation: {},
      locations: [],
    },
    listings: {
      listings: [],
      points: {
        features: [],
      },
    },
    meta: {
      displayName: location,
    },
  }

  const props = {
    onFocus: () => {},
  }

  beforeEach(() => {
    store = createMockStore(state)
    component = mount(
      <CookiesProvider>
        <Provider store={store}>
          <Container {...props} />
        </Provider>
      </CookiesProvider>
    ).find('SearchInput')
  })

  it('mounts <SearchInput/>', () => {
    expect(component.length).toBe(1)
  })
  it('actions check', () => {
    const selectLocationDispatch = component.prop('selectLocation')
    selectLocationDispatch(location)
    const actions = store.getActions()
    const [selectLocationAction] = actions
    expect(selectLocationAction).toEqual(selectLocationDispatch(location))
  })
  it('defaultSearch props check', () => {
    const expected = {
      locationSlug: state.criteria.locationSlug,
      displayName: state.meta.displayName,
    }
    const actual = component.prop('defaultSearch')
    expect(expected).toEqual(actual)
  })
})
