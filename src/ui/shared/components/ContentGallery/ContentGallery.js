import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import Slider from 'react-image-gallery'
import autobind from 'autobind-decorator'

const SWIPE_THRESHOLD = 20
const FLICK_THRESHOLD = 50
const SLIDE_DURATION = 300

@themed(/^ContentGallery/)
export default class ContentGallery extends Component {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.object,
    dataTagItem: PropTypes.string,
    dataTagSection: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
  }

  get childrenArray() {
    const { children } = this.props
    return Array.isArray(children) ? children : [children]
  }

  @autobind
  renderItem(children) {
    const { theme } = this.props

    return (
      <div className={theme.ContentGallery_Item}>
        {children}
      </div>
    )
  }

  render() {
    const {
      theme,
      dataTagItem,
      dataTagSection,
    } = this.props

    const content = this.childrenArray

    if (content.length === 0) { return null }

    return (
      <div
        className={theme.ContentGallery}
        data-tid="content-gallery"
        data-tag_item={dataTagItem}
        data-tag_section={dataTagSection}
      >
        <Slider
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={false}
          swipeThreshold={SWIPE_THRESHOLD}
          flickThreshold={FLICK_THRESHOLD}
          slideDuration={SLIDE_DURATION}
          renderItem={this.renderItem}
          items={content}
          showBullets={content.length > 1}
        />
      </div>
    )
  }
}
