import React, { Component } from 'react'
import { Photo } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import Slider from 'react-image-gallery'
import LazyLoad from 'react-lazyload'
import autobind from 'autobind-decorator'
import getOr from 'lodash/fp/getOr'
import GalleryNav from './GalleryNav'

const SWIPE_THRESHOLD = 20
const FLICK_THRESHOLD = 50
const SLIDE_DURATION = 300

@themed('*')
export default class ImageGallery extends Component {
  static propTypes = {
    photos: PropTypes.array,
    theme: PropTypes.object,
    viewType: PropTypes.string,
    className: PropTypes.string,
    dataTagItem: PropTypes.string,
    dataTagSection: PropTypes.string,
    showIndex: PropTypes.bool,
    disableArrowKeys: PropTypes.bool,
    lazyload: PropTypes.bool,
    disableSwipe: PropTypes.bool,
    formattedBaseUrl: PropTypes.object,
    onIndexChange: PropTypes.func,
    onClick: PropTypes.func,
    startIndex: PropTypes.number,
  }

  static defaultProps = {
    photos: [],
    theme: {},
    viewType: 'map',
    lazyload: true,
    disableSwipe: true,
    formattedBaseUrl: {},
    startIndex: 0,
  }

  constructor(props) {
    super(props)
    this.firstPhotoPath = getOr(null, `photos[${props.startIndex}].path`, this.props)
    this.nextSlideIndex = 0
    this.previousIndex = null
    this.updatedFromTouch = false
    this.state = {
      renderOnlyFirstPhoto: true,
    }
  }

  /**
   * To support a different tagging call for swipe vs click,
   * we need a way to tell when the user swiped.
   * In addition, we need to determine if the user swiped left or right.
   * This method, in conjunction with handleOnSlide() lets us
   * determine all that.
   */
  @autobind
  handleTouchStart() {
    const {
      disableSwipe,
    } = this.props

    if (disableSwipe) return

    // Set a flag so we can check later and know that the user was swiping
    this.updatedFromTouch = true

    // Save the slide index so we can check later and determine
    // if the user swiped left or right
    this.previousIndex = this.imageGallery.getCurrentIndex()
  }

  @autobind
  disablePlaceholder() {
    // on first slide, disable placeholder
    if (this.state.renderOnlyFirstPhoto) {
      this.setState({ renderOnlyFirstPhoto: false })
    }
  }

  @autobind
  handleOnSlide(index) {
    const { dataTagSection, disableSwipe, onIndexChange } = this.props

    this.disablePlaceholder()

    // Expose change in index to parent
    if (onIndexChange) onIndexChange(index)

    if (disableSwipe) return

    // If the user didn't swipe, do nothing
    if (!this.updatedFromTouch || !window.eventTracker) return

    // Save the current slide index, so we can use it later
    // to calculate if the user swiped left vs right
    this.currentIndex = index

    // Compare the current slide to the previous slide
    // from when the user started swiping, to determine if the user
    // swiped left or right. Keep in mind the gallery can loop around
    // in either direction.
    const nextSlide = (
      (this.currentIndex === this.previousIndex + 1) ||
      (this.currentIndex === 0 && this.previousIndex > 1)
    )
    const direction = nextSlide === true ? 'right' : 'left'

    window.eventTracker.track('swipe', {
      item: `${direction}_arrow`,
      action: 'swipe',
      section: dataTagSection,
    })

    // Clear the flag when the swipe action is done
    this.updatedFromTouch = false
  }

  arrowNavigation(onClick, disabled, direction = 'next') {
    return (
      <GalleryNav
        direction={direction}
        viewType={this.props.viewType}
        onClick={onClick}
        disabled={disabled}
      />
    )
  }

  @autobind
  renderItem(photo) {
    const {
      theme,
      viewType,
      formattedBaseUrl,
    } = this.props

    const {
      renderOnlyFirstPhoto,
    } = this.state

    const { path, caption } = photo
    const renderPlaceholder = renderOnlyFirstPhoto && path !== this.firstPhotoPath

    // on initial page load, render placeholder for second slide
    if (renderPlaceholder) return <div />

    const { jpg, jpgRetina, webp } = formattedBaseUrl
    // this assumes an API response of format `imgr/HASH/`
    const photoHash = path.split('/')[1]

    const sources = [
      {
        type: 'image/webp',
        srcset: `${webp}${photoHash}`,
      },
      {
        srcset: `${jpg}${photoHash}, ${jpgRetina}${photoHash} 2x`,
      },
    ]

    return (
      <Photo
        sources={sources}
        className={theme[`SliderImage-${viewType}`]}
        alt={caption}
        url={`${jpg}${photoHash}`}
      />
    )
  }

  @autobind
  renderLeftNav(onClick, disabled) {
    return this.arrowNavigation(onClick, disabled, 'prev')
  }

  @autobind
  renderRightNav(onClick, disabled) {
    return this.arrowNavigation(onClick, disabled)
  }

  render() {
    const {
      photos,
      theme,
      viewType,
      className,
      dataTagItem,
      showIndex,
      disableArrowKeys,
      lazyload,
      disableSwipe,
      dataTagSection,
      onClick,
      startIndex,
    } = this.props

    // Different props to use depending if you want swiping
    const swipeProps = disableSwipe ? {
      disableSwipe: true,
      preventDefaultTouchmoveEvent: true,
    } : {
      swipeThreshold: SWIPE_THRESHOLD,
      flickThreshold: FLICK_THRESHOLD,
      slideDuration: SLIDE_DURATION,
      onTouchStart: this.handleTouchStart,
    }

    if (photos && photos.length) {
      const slider = (
        <Slider
          ref={comp => { this.imageGallery = comp }}
          lazyLoad
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
          renderItem={this.renderItem}
          renderRightNav={this.renderRightNav}
          renderLeftNav={this.renderLeftNav}
          items={photos}
          showIndex={photos.length > 1 ? showIndex : false}
          disableArrowKeys={disableArrowKeys}
          onSlide={this.handleOnSlide}
          onClick={onClick}
          startIndex={startIndex}
          {...swipeProps}
        />
      )

      let gallery = slider

      if (lazyload) {
        gallery = (
          <LazyLoad
            height={158}
            width={280}
            resize
            offset={[200, -100]}
            overflow
          >
            {slider}
          </LazyLoad>
        )
      }

      return (
        <div
          className={className}
          data-tid="listing-photo-gallery"
          data-tag_item={dataTagItem}
          data-tag_section={dataTagSection}
        >
          {gallery}
        </div>
      )
    }
    return (
      <div className={theme[`SliderImage-${viewType}`]} />
    )
  }
}
