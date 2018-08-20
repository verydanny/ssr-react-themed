import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { RangeSlider } from '@rentpath/react-ui-core'

@themed(['RangeSlider_Text'])
export default class SqftInput extends Component {
  static propTypes = {
    value: PropTypes.number,
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const {
      value,
      theme,
      ...restProps
    } = this.props

    return (
      <RangeSlider
        formatLabel={() => ''}
        formatHeader={
          text => (
            <div>
              <h4>Square Foot</h4>
              <div className={theme.RangeSlider_Text} data-tid="sq-ft-range">
                {!text ? 'Any' : `${text} ft+`}
              </div>
            </div>
          )
        }
        value={value}
        minValue={0}
        maxValue={1600}
        step={100}
        {...restProps}
      />
    )
  }
}
