import React, { Component } from 'react'
import { themed } from 'react-themed'
import autobind from 'autobind-decorator'
import { Modal } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import close from 'ui/shared/components/Icon/svgs/global/close.svg'
import checkInCircle from 'ui/shared/components/Icon/svgs/global/checkInCircle.svg'
import { RecommendedOrNearby } from 'ui/small/components/RecommendedOrNearby'
import PropTypes from 'prop-types'

@themed('*')

export default class extends Component {

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  @autobind
  closeButton({ onClick }) {
    const { theme } = this.props

    return (
      <div
        role="button"
        tabIndex={0}
        className={theme.ThankYouModal_CloseButton}
        onClick={onClick}
      >
        <Icon svgs={{ close }} />
      </div>
    )
  }

  render() {
    const {
      isOpen,
      onClose,
      theme,
    } = this.props

    return (
      <div className={theme.ThankYouModal}>
        <Modal
          CloseButton={this.closeButton}
          isOpen={isOpen}
          onClose={onClose}
          data-tid="thank-you-modal"
          data-tag_section="thank_you_page"
        >
          <div className={theme.ThankYouModal_Header}>
            <Icon
              svgs={{ checkInCircle }}
              className={theme.ThankYouModal_CheckMarkIcon}
            />
            <span className={theme.ThankYouModal_Message} data-tid="thank-you-message">
              Your message has been sent.
            </span>
          </div>
          <RecommendedOrNearby />
          <a
            className={theme.ThankYouModal_BackToSearch}
            onClick={onClose}
            role="presentation"
          >
            Back to search
          </a>
        </Modal>
      </div>
    )
  }
}
