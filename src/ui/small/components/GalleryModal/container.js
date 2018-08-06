import { connect } from 'react-redux'
import { getPhotos } from 'app/selectors/pdpListing'
import { closeGalleryModal } from 'app/store/shared/actions/modal'
import GalleryModal from './GalleryModal'

const mapStateToProps = state => ({
  photos: getPhotos(state),
})

const mapDispatchToProps = {
  dismissGallery: closeGalleryModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryModal)
