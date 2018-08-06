import React from 'react'
import { mount, shallow } from 'enzyme'

import ImageGallery from '../components/ImageGallery'

const ImageGalleryUnwrapped = ImageGallery.WrappedComponent

describe('ImageGallery', () => {
  const props = {
    formattedBaseUrl: {
      jpg: 'jpg/',
      jpgRetina: 'jpgRetina/',
      webp: 'webp/',
    },
    lazyload: true,
    photos: [
      { path: 'imgr/foo/', caption: 'bar' },
      { path: 'imgr/bam/', caption: 'baz' },
    ],
  }

  const nolazyloadProps = {
    formattedBaseUrl: {
      jpg: 'jpg/',
      jpgRetina: 'jpgRetina/',
      webp: 'webp/',
    },
    lazyload: false,
    photos: [
      { path: 'imgr/foo/', caption: 'bar' },
      { path: 'imgr/bam/', caption: 'baz' },
    ],
  }

  it('renders the gallery', () => {
    const wrapper = mount(<ImageGalleryUnwrapped {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders the gallery without Lazyload', () => {
    const wrapper = mount(<ImageGallery {...nolazyloadProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a LazyLoad', () => {
    const wrapper = mount(<ImageGallery {...props} />)
    const expected = 1
    const actual = wrapper.find('LazyLoad').length
    expect(actual).toEqual(expected)
  })

  it('renders only the first photo', () => {
    const expected = 1
    const wrapper = mount(<ImageGallery {...nolazyloadProps} />)
    const actual = wrapper.find('img').length
    expect(actual).toEqual(expected)
  })

  describe('ImageGallery photoRender', () => {
    const photo = props.photos[0]
    const wrapper = shallow(<ImageGalleryUnwrapped {...props} />)

    it('renders images', () => {
      expect(wrapper.instance().renderItem(photo)).toMatchSnapshot()
    })
  })
})
