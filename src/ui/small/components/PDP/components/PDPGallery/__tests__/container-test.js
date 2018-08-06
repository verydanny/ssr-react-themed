import React from 'react'
import { mount } from 'enzyme'
import { createMockStore } from 'mocks'
import { initialState as criteria } from 'app/store/reducers/criteria'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import Container from '../container'

describe('PDP Gallery container', () => {
  const state = {
    criteria: {
      ...criteria,
    },
    listing: {
      photos: [
        { path: 'foo/', caption: 'bar' },
        { path: 'bam/', caption: 'baz' },
      ],
    },
    router: {
      route: {
        name: 'DETAIL_PAGE',
      },
    },
    request: {
      displaySize: 'small',
    },
  }

  const setup = () => {
    const store = createMockStore(state)
    const component = mount(
      <CookiesProvider>
        <Provider store={store}>
          <Container />
        </Provider>
      </CookiesProvider>
    )
    return component.find('PDPGallery')
  }

  it('gets 2 photos from the store', () => {
    const component = setup()
    const photos = component.prop('photos')
    expect(photos.length).toEqual(2)
  })
})
