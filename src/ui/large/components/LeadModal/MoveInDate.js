import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import autobind from 'autobind-decorator'
import { themed } from 'react-themed-too'
import { Field } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import calendar from 'ui/shared/components/Icon/svgs/calendar.svg'
import { startDate, minDate, maxDate } from 'lib/lead/moveInDate'
import isoToLocaleDate from 'lib/utils/isoToLocaleDate'
import dateToInt from 'lib/utils/dateToInt'
import { format, parse } from 'date-fns'
import { Subject } from 'rxjs/Subject'

const externalOpenHandler = new Subject()

@themed('*')
export default class MoveInDate extends Component {
  static propTypes = {
    theme: PropTypes.object,
    variant: PropTypes.string,
    defaultValue: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)

    this.startDate = isoToLocaleDate(startDate())
    this.minDate = minDate()
    this.maxDate = maxDate()

    this.state = {
      date: props.defaultValue || this.startDate,
    }

    this.datePickerStartDate = parse(this.state.date, 'MM/DD/YYYY')
  }

  @autobind
  dateTagging(date) {
    if (window.eventTracker) {
      window.eventTracker.track('click', {
        item: 'move_in_date',
        section: 'lead_submission_form',
        selection: date,
      })
    }
  }

  @autobind
  validateDate(event) {
    // Value used for tagging and local state

    const value = format(event, 'MM/DD/YYYY')

    this.dateTagging(value)

    const min = dateToInt(this.minDate)
    const max = dateToInt(this.maxDate)
    const current = dateToInt(value)

    // Todo - move this out of local state and into Redux
    if (current < min) {
      this.setState({ date: this.minDate })
    } else if (current > max) {
      this.setState({ date: this.maxDate })
    } else {
      this.setState({ date: value })
    }
  }

  openCalendar(e) {
    // TODO: change this to use new handler if needed
    // Once we can redeploy react-ui, we can remove this, and use the
    // new datepicker event handler
    e.nativeEvent.stopImmediatePropagation()
    const parentIsCalender = !!e.target.closest('.react-datepicker')

    if (!parentIsCalender) {
      externalOpenHandler.next()
    }
  }

  render() {
    const { theme, variant, defaultValue, ...filteredProps } = this.props

    return (
      <div
        className={cn(
          theme.MoveInDate_Container,
          variant && theme[`MoveInDate-${variant}`]
        )}
        data-tid="datePickerWrapper"
        role="presentation"
        onClick={this.openCalendar}
      >
        <Icon svgs={{ calendar }} className={theme.MoveInDate_Calendar} />
        <Field
          name="move_date"
          dateFormat="MM/DD/YYYY"
          variant={variant}
          type="datePicker"
          data-tag_item="move_in_date"
          className={theme.MoveInDate_DateField}
          value={this.state.date}
          startDate={this.datePickerStartDate}
          minDate={this.minDate}
          maxDate={this.maxDate}
          onChange={this.validateDate}
          externalOpenHandler={externalOpenHandler}
          {...filteredProps}
        />
      </div>
    )
  }
}
