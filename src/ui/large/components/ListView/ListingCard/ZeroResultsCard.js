import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import cn from 'classnames'

@themed('*', { pure: true })
export default class ZeroResultsCard extends PureComponent {

  static propTypes = {
    theme: PropTypes.object,
    onClickOpenModal: PropTypes.func,
    onClickZoomOut: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const {
      theme,
    } = this.props

    return (
      <div
        className={cn(theme.ZeroResultsCard)}
        data-tid="zeroResultsCard"
      >
        <div className={theme.ZeroResults_Text}>
          <div className={theme.ZeroResults_PropertyCount} data-tid="zero_properties">
            0 Properties Found
          </div>
          <div className={theme.ZeroResults_SuggestText} data-tid="suggest_text">
            Try adjusting the filters above or zoom out on the map
          </div>
        </div>
        <div className={theme.ZeroResults_Suggestions}>
          <div className={theme.ZeroResults_NextSteps} data-tid="next_steps">
          Next Steps :
          </div>
          <button
            className={cn(theme.ButtonRaised, theme.ZeroResults_AdjustFilters)}
            onClick={this.props.onClickOpenModal}
            data-tid="adjust_filters"
          >
            Adjust Filters
          </button>
        </div>
        <div
          className={theme.ZeroResults_ZoomOut}
        >
          <span className={theme.ZeroResults_ZoomOutOrText}>
            or
          </span>
          <button
            className={theme.ZeroResults_ZoomOutText}
            onClick={this.props.onClickZoomOut}
            data-tid="zoom_out"
          >
            Zoom Out
          </button>
        </div>
      </div>
    )
  }
}
