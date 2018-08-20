import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import autobind from 'autobind-decorator'
import { ImageGallery } from 'ui/shared/components/ImageGallery'

class PDPGallery extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    photos: PropTypes.array,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)

    this.currentIndex = 0
  }

  @autobind
  updateIndex(index) {
    this.currentIndex = index
  }

  @autobind
  handleClick() {
    const { onClick } = this.props
    onClick(this.currentIndex)
  }

  render() {
    const { theme, photos } = this.props
    return (
      <div className={theme.PDPGallery} data-tid="pdpGallery">
        <ImageGallery
          className={theme.ListingCard_Gallery}
          disableSwipe={false}
          photos={photos}
          disableArrowKeys
          dataTagSection="image_carousel"
          onIndexChange={this.updateIndex}
          onClick={this.handleClick}
        />
      </div>
    )
  }
}

export default themed(['PDPGallery', 'ListingCard_Gallery'], { pure: true })(PDPGallery)
