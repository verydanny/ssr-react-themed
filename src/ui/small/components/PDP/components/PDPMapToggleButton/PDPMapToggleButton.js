import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import ToolTip from 'ui/shared/components/ToolTip'
import { themed } from 'react-themed-too'
import { MAP_VIEW, STREET_VIEW } from './const'

@themed(/^PDPMapToggleButton/, { pure: true })
class PDPMapToggleButton extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    selectedView: PropTypes.oneOf([STREET_VIEW, MAP_VIEW]),
    onClickMapView: PropTypes.func,
    onClickStreetView: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
    selectedView: MAP_VIEW,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedView: props.selectedView,
      streetViewError: '',
    }
  }

  getActiveClass(selectedView) {
    const { theme } = this.props

    return this.state.selectedView === selectedView ?
      theme['PDPMapToggleButton-active'] : theme.PDPMapToggleButton
  }

  getDataTid(selectedView) {
    const active = this.state.selectedView === selectedView ?
      'active' : 'inactive'
    return `${selectedView}-${active}`
  }

  @autobind
  handleStreetViewNotAvailable() {
    this.setState({ streetViewError: 'Sorry! We don’t have a street view for this property.' })
  }

  @autobind
  handleClickStreetView() {
    const { onClickStreetView } = this.props

    this.setState({ selectedView: STREET_VIEW })

    if (onClickStreetView) {
      onClickStreetView(this.handleStreetViewNotAvailable)
    }
  }

  @autobind
  handleClickMapView() {
    const { onClickMapView } = this.props

    this.setState({ selectedView: MAP_VIEW, streetViewError: '' })

    if (onClickMapView) {
      onClickMapView() // no callback necessary
    }
  }

  renderStreetViewError() {
    const { streetViewError } = this.state

    if (!streetViewError) return null

    return (
      <ToolTip onClick={this.handleClickMapView}>
        {'Sorry! Google Maps doesn\'t have a street view for this property.'}
      </ToolTip>
    )
  }

  render() {
    const {
      theme,
    } = this.props

    return (
      <div
        className={theme.PDPMapToggleButton}
        data-tid="pdpMapToggle"
      >
        <div className={theme.PDPMapToggleButton_Container}>
          <div className={theme.PDPMapToggleButton_Buttons}>
            <button
              onClick={this.handleClickMapView}
              className={this.getActiveClass(MAP_VIEW)}
              data-tid={this.getDataTid(MAP_VIEW)}
            >
            Map View
            </button>
            <button
              onClick={this.handleClickStreetView}
              className={this.getActiveClass(STREET_VIEW)}
              data-tid={this.getDataTid(STREET_VIEW)}
            >
            Street View
            </button>
          </div>
          {this.renderStreetViewError()}
        </div>
      </div>
    )
  }
}

export default PDPMapToggleButton
