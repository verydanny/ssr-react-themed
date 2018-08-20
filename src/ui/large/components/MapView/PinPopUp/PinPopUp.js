import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { ofType } from 'redux-observable'
import { tap } from 'rxjs/operators'
import autobind from 'autobind-decorator'
import cn from 'classnames'
import { OverlayView } from '@rentpath/react-ui-core'
import {
  MAP_CLICK,
  DATA_CLICK,
  withMapEvents,
} from 'ui/shared/components/Map'
import {
  MARKER_CLICK,
  MARKER_MOUSE_OVER,
  MARKER_MOUSE_OUT,
  markerNormalIcon,
  markerSelectedIcon,
  withMarkerEvents,
} from 'ui/shared/components/Markers'
import { TeardropIcon } from 'ui/shared/components/Markers/icons'
import PopUpCard from './PopUpCard'

@themed(/^PinPopUp/)
class PinPopUp extends PureComponent {
  static propTypes = {
    map: PropTypes.object,
    mapObservable: PropTypes.object,
    markerObservable: PropTypes.object,
    clearListingData: PropTypes.func,
    selectListingFromMapPin: PropTypes.func,
    selectedListing: PropTypes.object,
    selectedListingId: PropTypes.string,
    selectedListingOptions: PropTypes.object,
    openModal: PropTypes.func,
    selectedMarker: PropTypes.object,
    theme: PropTypes.object,
  }

  static defaultProps = {
    selectedListingOptions: {},
    theme: {},
  }

  componentDidMount() {
    this.setupEventResponses()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedListingOptions !== this.props.selectedListingOptions) {
      if (this.props.selectedListingOptions.clicked && this.props.selectedMarker) {
        this.setMarkerSelectedIcon({ marker: this.props.selectedMarker })
      }

      // reset any prior clicked marker back to normal status
      if (prevProps.selectedListingOptions.clicked && prevProps.selectedMarker) {
        this.setMarkerNormalIcon({ marker: prevProps.selectedMarker })
      }
    }
  }

  setupEventResponses() {
    const { mapObservable, markerObservable } = this.props

    markerObservable
      .pipe(ofType(MARKER_CLICK))
      .subscribe(this.handleMarkerClick)

    markerObservable
      .pipe(
        ofType(MARKER_MOUSE_OVER),
        tap(this.setMarkerSelectedIcon)
      )
      .subscribe(this.handleMarkerMouseOver)

    markerObservable
      .pipe(
        ofType(MARKER_MOUSE_OUT),
        tap(this.setMarkerNormalIcon)
      )
      .subscribe(this.handleMarkerMouseOut)

    mapObservable
      .pipe(ofType(MAP_CLICK, DATA_CLICK))
      .subscribe(this.handleMapClick)
  }

  @autobind
  setMarkerNormalIcon({ marker }) {
    const clicked = this.props.selectedListingOptions.clicked

    if (!clicked || (clicked && marker !== this.props.selectedMarker)) {
      marker.setIcon(markerNormalIcon(marker))
    }
  }

  setMarkerSelectedIcon({ marker }) {
    marker.setIcon(markerSelectedIcon(marker.isPaid))
  }

  @autobind
  handleMarkerClick({ marker }) {
    const {
      selectedListingId,
      selectedListingOptions,
      selectListingFromMapPin,
    } = this.props

    if (marker.id === selectedListingId && selectedListingOptions.clicked) {
      return
    }

    selectListingFromMapPin(marker.id, { clicked: true, trackClick: true }, true, marker.isActive)
  }

  @autobind
  handleMarkerMouseOver({ marker }) {
    const {
      selectedListingId,
      selectedListingOptions,
      selectListingFromMapPin,
    } = this.props

    if (this.inPopUp || marker.id === selectedListingId) return

    // If current selected property was not selected via click,
    // then select it with hover.
    if (!selectedListingOptions.clicked) {
      selectListingFromMapPin(marker.id, {}, false, marker.isActive)
    }
  }

  @autobind
  handleMarkerMouseOut() {
    if (this.inPopUp) return

    // Set a timeout before hiding the popup, to give the user time
    // to move the mouse into the popup.
    clearTimeout(this.markerLeaveTimeoutId)
    this.markerLeaveTimeoutId = setTimeout(this.clearPopUp, 100)
  }

  @autobind
  clearPopUp() {
    if (!this.props.selectedListingOptions.clicked) {
      this.props.clearListingData()
    }
  }

  @autobind
  handleMousePopUpEnter() {
    // If a timeout was waiting to hide the popup, cancel it since the cursor
    // is now in the popup and we do not want it to go away
    clearTimeout(this.markerLeaveTimeoutId)
    this.inPopUp = true
  }

  @autobind
  handleMousePopUpLeave() {
    // When leaving the popup, treat it as if we are leaving a pin:
    // close the popup unless it has been locked in
    this.inPopUp = false
    this.clearPopUp()
  }

  @autobind
  handleMapClick() {
    this.inPopUp = false
    this.props.clearListingData()
  }

  render() {
    const {
      openModal,
      map,
      selectedMarker,
      selectedListing,
      selectedListingOptions,
      theme,
    } = this.props

    const overlayClasses = cn(
      selectedListingOptions.clicked && theme['PinPopUp-clicked'],
      theme.PinPopUp,
    )

    return (
      <Fragment>
        <OverlayView
          map={map}
          anchor={selectedMarker}
          className={overlayClasses}
        >
          <PopUpCard
            listing={selectedListing}
            openModal={openModal}
            onMouseEnter={this.handleMousePopUpEnter}
            onMouseLeave={this.handleMousePopUpLeave}
            theme={theme}
          />
        </OverlayView>
        <OverlayView
          map={map}
          anchor={selectedMarker}
          className={theme.PinPopUp_ClickedIconContainer}
        >
          <div className={selectedListingOptions.clicked ? theme.PinPopUp_ClickedIcon : theme['PinPopUp_ClickedIcon-hidden']}>
            <img src={TeardropIcon} alt="" />
          </div>
        </OverlayView>
      </Fragment>
    )
  }
}

export default withMapEvents(withMarkerEvents(PinPopUp))
