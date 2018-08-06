import { connect } from 'react-redux'
import { currentModal as currentModalSelector } from 'app/selectors/modal'
import { closeModal } from 'app/store/shared/actions'
import { ModalStack } from '@rentpath/react-ui-core'

const mapStateToProps = state => ({
  currentModal: currentModalSelector(state),
})

const mapDispatchToProps = {
  onClose: closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalStack)
