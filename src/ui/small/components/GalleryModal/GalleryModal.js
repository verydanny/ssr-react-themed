import React, { PureComponent } from 'react'
import { themed } from 'react-themed-too'
import autobind from 'autobind-decorator'
import { Modal } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import arrowLeft from 'ui/shared/components/Icon/svgs/arrowLeft.svg'
import PropTypes from 'prop-types'
import { ImageGallery } from 'ui/shared/components/ImageGallery'

const MODAL_ATTRIBUTE = 'data-modal-open'

class GalleryModal extends PureComponent {

  static defaultProps = {
    theme: {},
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    theme: PropTypes.object,
    photos: PropTypes.array,
    photoIndex: PropTypes.number,
    dismissGallery: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: props.photoIndex ? props.photoIndex : 0,
    }
  }

  componentDidMount() {
    this.tagBody()
  }

  componentWillUnmount() {
    this.unTagBody()
  }

  photoDescription() {
    const { photos } = this.props
    const currentPhoto = photos[this.state.currentIndex]
    let description = null

    if (currentPhoto.caption) {
      const caption = currentPhoto.caption
      const wordLength = caption.match(/\b\S+\b/g).length

      description = wordLength > 2 ?
        (
          <span> :
            <div>
              {caption}
            </div>
          </span>
        ) :
        (
          <span>: {caption} </span>
        )
    }

    return description
  }

  @autobind
  updateIndex(index) {
    this.setState({ currentIndex: index })
  }

  @autobind
  closeButton() {
    const { theme, dismissGallery } = this.props

    return (
      <div
        role="button"
        tabIndex={0}
        className={theme.GalleryModal_CloseButton}
        onClick={dismissGallery}
        data-tid="gallery-fullscreen-back"
      >
        <Icon svgs={{ arrowLeft }} className={theme.GalleryModal_Icon} />
      </div>
    )
  }

  /**
   * To make the content behind the modal have a blurred effect,
   * we need to apply certain CSS rules to parent elements.
   * Instead of trying to modify the parent elements, we will just
   * add a data attribute to the BODY element, then those parent
   * components can write CSS rules that apply only when the modal
   * is active.
   */
  tagBody() {
    document.body.setAttribute(MODAL_ATTRIBUTE, '')
  }

  unTagBody() {
    document.body.removeAttribute(MODAL_ATTRIBUTE)
  }

  renderDescription() {
    const { photos } = this.props
    return (
      <div data-tid="description">{this.state.currentIndex + 1} of {photos.length} photos {this.photoDescription()}</div>
    )
  }

  render() {
    const {
      isOpen,
      onClose,
      theme,
      photos,
    } = this.props

    const ImgGallery = (
      <ImageGallery
        disableSwipe={false}
        viewType="pdpsmall"
        photos={photos}
        disableArrowKeys={false}
        dataTagSection="fullscreen_gallery"
        onIndexChange={this.updateIndex}
        startIndex={this.state.currentIndex}
      />
    )

    return (
      <div className={theme.GalleryModal}>
        <Modal
          CloseButton={this.closeButton}
          isOpen={isOpen}
          onClose={onClose}
          data-tid="pdpGalleryModal"
        >
          <div className={theme.GalleryModal_Container}>
            {ImgGallery}
          </div>
          { this.renderDescription() }
        </Modal>
      </div>
    )
  }
}

export default themed(/^GalleryModal/, { pure: true })(GalleryModal)
