import React, { Component } from 'react'
import { themed } from 'react-themed'
import autobind from 'autobind-decorator'
import { Modal } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'
import Header from './sections/Header'
import Footer from './sections/Footer'
import Form from './sections/Form'

@themed('*')
export default class MoreFiltersModal extends Component {

  static propTypes = {
    filterTotal: PropTypes.number,
    isOpen: PropTypes.bool,
    locationSlug: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    propertyType: PropTypes.string,
    query: PropTypes.object,
    refinementCriteria: PropTypes.object,
    searchType: PropTypes.string,
    theme: PropTypes.object,
    total: PropTypes.number,
    filterLink: PropTypes.string,
    applyFilters: PropTypes.func,
    filters: PropTypes.object,
    updateFilterValue: PropTypes.func,
    enableFilter: PropTypes.func,
    clearFilters: PropTypes.func,
    disableFilter: PropTypes.func,
    disableAllFilters: PropTypes.func,
    restoreFilters: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  @autobind
  handleOutsideMouseDown(e) {
    // If a click starts outside the modal, set the outside flag
    // so when the click event occurs on the overlay,
    // it will close the modal.
    this.clickedOutside = (e.target === this.overlay)
  }

  @autobind
  handleOutsideMouseUp(e) {
    // If a click ends inside the modal, unset the outside flag
    // so when the click event bubbles up to the overlay,
    // it will not close the modal.
    if (e.target !== this.overlay) {
      this.clickedOutside = false
    }
  }

  @autobind
  handleOutsideClick(e) {
    const { onClose, applyFilters } = this.props

    // Verify the click started on the overlay.
    // This will handle the case of the user starting a click inside the modal,
    // then dragging and releasing the button outside the modal.
    if (!this.clickedOutside) {
      return
    }

    // Clear the flag so it will not affect the next click
    this.clickedOutside = null

    // Verify the click ended on the overlay and did not bubble up
    // from the modal
    if (e.target !== this.overlay) {
      return
    }

    if (onClose) {
      onClose()
      if (applyFilters) {
        applyFilters()
      }
    }
  }

  render() {
    const {
      filterTotal,
      isOpen,
      locationSlug,
      onClose,
      propertyType,
      query,
      refinementCriteria,
      searchType,
      theme,
      total,
      filterLink,
      filters,
      updateFilterValue,
      clearFilters,
      enableFilter,
      disableFilter,
      disableAllFilters,
      restoreFilters,
    } = this.props

    return (
      <div
        role="presentation"
        className={theme.MoreFiltersModalOverlay}
        ref={node => { this.overlay = node }}
        onMouseDown={this.handleOutsideMouseDown}
        onMouseUp={this.handleOutsideMouseUp}
        onClick={this.handleOutsideClick}
        key="overlay"
      >
        <div className={theme.MoreFiltersModal} key="modal" data-tag_section="more_filters">
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            data-tid="more-filters-modal"
          >
            <Header
              total={total}
              filterTotal={filterTotal}
              onClose={onClose}
              data-tid="more-filters-modal"
            />
            <div className={theme.MoreFiltersModal_Content}>
              <Form
                locationSlug={locationSlug}
                refinementCriteria={refinementCriteria}
                searchType={searchType}
                propertyType={propertyType}
                query={query}
                filters={filters}
                updateFilterValue={updateFilterValue}
                enableFilter={enableFilter}
                disableFilter={disableFilter}
                disableAllFilters={disableAllFilters}
              />
            </div>
            <Footer
              total={total}
              filterTotal={filterTotal}
              onClose={onClose}
              submitUrl={filterLink}
              restoreFilters={restoreFilters}
              clearFilters={clearFilters}
            />
          </Modal>
        </div>
      </div>
    )
  }
}
