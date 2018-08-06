import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createMockStore } from 'mocks'
import withUserData from '../withUserData'

const DummyComponent = <div data-tid="testing-hoc" />

const state = {
  user: {
    favorites: {
      111: true,
    },
  },
}

const store = createMockStore(state)

describe('withUserData HOC', () => {
  it('favorite data is in props', () => {
    const TestComponent = withUserData(() => DummyComponent)

    const wrapper = mount(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    )

    expect(wrapper.find(TestComponent).childAt(0).prop('favorites')).toEqual({ 111: true })
  })
})
