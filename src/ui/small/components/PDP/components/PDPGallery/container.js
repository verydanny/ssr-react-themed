import { connect } from 'react-redux'
import {
  getPhotos,
} from 'app/selectors/pdpListing'
import {
  showGalleryModal,
} from 'app/store/shared/actions'
import PDPGallery from './PDPGallery'

const mapStateToProps = state => ({
  photos: getPhotos(state),
})

const mapDispatchToProps = {
  onClick: showGalleryModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(PDPGallery)
