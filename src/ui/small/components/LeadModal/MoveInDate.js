import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import autobind from 'autobind-decorator'
import { themed } from 'react-themed-too'
import { Field } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import calendar from 'ui/shared/components/Icon/svgs/calendar.svg'
import { startDate, minDate, maxDate } from 'lib/lead/moveInDate'
import dateToInt from 'lib/utils/dateToInt'

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

    this.startDate = startDate()
    this.minDate = minDate()
    this.maxDate = maxDate()

    this.state = {
      date: props.defaultValue || this.startDate,
    }
  }

  @autobind
  validateDate(event) {
    const { value } = event.currentTarget

    if (!value) {
      this.setState({ date: this.startDate })
      return
    }

    const min = dateToInt(this.minDate)
    const max = dateToInt(this.maxDate)
    const current = dateToInt(value)

    if (current < min) {
      this.setState({ date: this.minDate })
    } else if (current > max) {
      this.setState({ date: this.maxDate })
    } else {
      this.setState({ date: value })
    }
  }

  render() {
    const {
      theme,
      variant,
      defaultValue,
      ...filteredProps
    } = this.props

    return (
      <div
        className={cn(
          theme.MoveInDate_Container,
          variant && theme[`MoveInDate-${variant}`],
        )}
      >
        <Icon
          svgs={{ calendar }}
          className={theme.MoveInDate_Calendar}
        />
        <Field
          name="move_date"
          variant={variant}
          type="date"
          className={theme.MoveInDate_DateField}
          value={this.state.date}
          min={this.minDate}
          max={this.maxDate}
          onChange={this.validateDate}
          {...filteredProps}
        />
      </div>
    )
  }
}
