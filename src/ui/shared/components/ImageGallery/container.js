import { connect } from 'react-redux'
import { formattedBaseUrl } from 'app/selectors/listingPhotoFormats'
import { getCurrentView } from 'app/selectors/page'
import ImageGallery from './components/ImageGallery'

const mapStateToProps = state => ({
  formattedBaseUrl: formattedBaseUrl(state),
  viewType: getCurrentView(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery)
