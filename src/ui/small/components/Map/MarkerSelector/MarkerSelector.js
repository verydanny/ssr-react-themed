import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { ofType } from 'redux-observable'
import themed from 'react-themed-too'
import { OverlayView } from '@rentpath/react-ui-core'
import {
  MARKER_CLICK,
  markerNormalIcon,
  markerSelectedIcon,
} from 'ui/shared/components/Markers'
import { TeardropIcon } from 'ui/shared/components/Markers/icons'

@themed(/^MarkerSelector/, { pure: true })
export default class MarkerSelector extends PureComponent {
  static propTypes = {
    map: PropTypes.object,
    markerObservable: PropTypes.object,
    selectedMarker: PropTypes.object,
    selectListing: PropTypes.func,
    handleCardDrawer: PropTypes.func,
    theme: PropTypes.object,
  }

  static defaultProps = {
    selectListing: () => {},
    handleCardDrawer: () => {},
    theme: {},
  }

  componentDidMount() {
    this.setupEventResponses()

    if (this.props.selectedMarker) {
      this.setMarkerSelectedIcon({ marker: this.props.selectedMarker })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedMarker !== this.props.selectedMarker) {
      if (this.props.selectedMarker) {
        this.setMarkerSelectedIcon({ marker: this.props.selectedMarker })
      }

      if (prevProps.selectedMarker) {
        this.setMarkerNormalIcon({ marker: prevProps.selectedMarker })
      }
    }
  }

  setupEventResponses() {
    const { markerObservable } = this.props

    markerObservable
      .pipe(ofType(MARKER_CLICK))
      .subscribe(this.handleMarkerClick)
  }

  @autobind
  setMarkerNormalIcon({ marker }) {
    if (marker !== this.props.selectedMarker) {
      marker.setIcon(markerNormalIcon(marker))
    }
  }

  setMarkerSelectedIcon({ marker }) {
    marker.setIcon(markerSelectedIcon(marker.isPaid))
  }

  @autobind
  handleMarkerClick({ marker }) {
    this.props.selectListing(marker.id, { marker }, false, marker.isActive)
    this.props.handleCardDrawer(false)
  }

  render() {
    const {
      map,
      selectedMarker,
      theme,
    } = this.props

    return (
      <OverlayView
        map={map}
        anchor={selectedMarker}
        className={theme.MarkerSelector_ClickedIconContainer}
      >
        <img
          className={selectedMarker ? theme.MarkerSelector_ClickedIcon : theme['MarkerSelector_ClickedIcon-hidden']}
          src={TeardropIcon}
          alt=""
        />
      </OverlayView>
    )
  }
}
