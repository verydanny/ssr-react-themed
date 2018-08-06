import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed'
import autobind from 'autobind-decorator'
import { Link } from '@rentpath/react-redux-router'
import classnames from 'classnames'
import numberWithCommas from 'lib/utils/numberWithCommas'

class Footer extends PureComponent {

  static propTypes = {
    toggleView: PropTypes.func,
    submitUrl: PropTypes.string,
    previousView: PropTypes.string,
    theme: PropTypes.object,
    filterTotal: PropTypes.number,
    total: PropTypes.number,
    filterCriteria: PropTypes.object,
  }

  static defaultProps = {
    previousView: 'map',
    theme: {},
  }

  @autobind
  getMsg(filterCount, refinements, total) {
    let count = (refinements && filterCount !== null) ? filterCount : (total || 0)

    let msg = '0 properties'

    if (count > 1) {
      count = numberWithCommas(count)
      msg = `Show ${count} properties`
    } else if (count === 1) {
      msg = 'Show 1 property'
    }

    return msg
  }

  @autobind
  handleClick(e) {
    const {
      toggleView,
      previousView,
      submitUrl,
      filterTotal,
    } = this.props

    if (!submitUrl || filterTotal === 0) {
      e.preventDefault()
    }

    return toggleView(previousView)
  }

  render() {
    const {
      theme,
      filterTotal,
      filterCriteria,
      total,
    } = this.props

    const msg = this.getMsg(filterTotal, filterCriteria.refinements, total)

    let disabledBtnClass = {}

    if (filterTotal === 0 && filterCriteria.refinements) {
      disabledBtnClass = {
        opacity: 0.3,
        pointerEvents: 'none',
      }
    }

    // TODO: restore react-redux-router Link
    return (
      <div className={classnames(theme.FilterPanel_Footer)}>
        <Link
          className={classnames(
            theme['Button-apply'],
            theme.Button_Link
          )}
          style={disabledBtnClass}
          data-tid="show-apartments-button"
          data-tag_item="show_properties_button"
          onClick={this.handleClick}
          to={this.props.submitUrl}
        >
          {msg}
        </Link>
      </div>
    )
  }
}

export default themed('*')(Footer)
