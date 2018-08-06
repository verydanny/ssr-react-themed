import React from 'react'
import { mount, shallow } from 'enzyme'
import { createMockStore } from 'mocks'
import { initialState as criteria } from 'app/store/reducers/criteria'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import ListView from '../ListView'

const ListViewUnwrapped = ListView.WrappedComponent

describe('ListView', () => {
  let component
  let store
  const state = {
    criteria: {
      ...criteria,
    },
    meta: {},
  }

  const defaultProps = {
    theme: {},
    listings: [],
    openModal: () => {},
    total: 0,
    selectListingFromMapPin: () => {},
    clearListingData: () => {},
    loading: false,
    loadingOptions: {},
    clearListingScroll: jest.fn(),
  }

  const setup = propsOverride => {
    const props = { ...defaultProps, ...propsOverride }
    store = createMockStore(state)
    component = mount(
      <CookiesProvider>
        <Provider store={store}>
          <ListView {...props} />
        </Provider>
      </CookiesProvider>
    )
    return component
  }

  beforeEach(() => setup())

  it('renders zero result card', () => {
    const wrapper = setup()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders listings', () => {
    const wrapper = setup({ total: 10 })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('scroll functionality', () => {
    describe('selectedListingShouldScroll is set', () => {
      const fnScroll = jest.fn()
      const fnClear = jest.fn()
      ListViewUnwrapped.prototype.scrollToSelectedListing = fnScroll
      setup({ selectedListingShouldScroll: true, clearListingScroll: fnClear })

      it('calls scrollToSelectedListing', () => {
        expect(fnScroll).toBeCalled()
      })
      it('calls clearListingScroll', () => {
        expect(fnClear).toBeCalled()
      })
    })

    describe('selectedListingShouldScroll is not set', () => {
      const fnScroll = jest.fn()
      ListViewUnwrapped.prototype.scrollToSelectedListing = fnScroll
      setup({ selectedListingShouldScroll: false })

      it('does not call scrollToSelectedListing', () => {
        expect(fnScroll).not.toBeCalled()
      })
    })
  })

  describe('hover functionality', () => {
    describe('handleCardMouseEnter is triggered', () => {
      const fnSelectMapPin = jest.fn()
      const props = {
        ...defaultProps,
        selectListingFromMapPin: fnSelectMapPin,
      }
      const wrapper = shallow(<ListViewUnwrapped {...props} />)
      const instance = wrapper.instance()
      instance.handleCardMouseEnter({}, 'foo')

      it('calls selectListingFromMapPin', () => {
        expect(fnSelectMapPin).toBeCalledWith('foo', {
          clicked: true,
          trackClick: false,
        })
      })
    })
  })
})
