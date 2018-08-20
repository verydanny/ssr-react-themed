import React, { Component } from 'react'
import { themed } from 'react-themed-too'
import autobind from 'autobind-decorator'
import { RangeSlider } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'
import numberWithCommas from 'lib/utils/numberWithCommas'
import { priceConstraint } from 'ui/shared/config/price-const'

const text = ({ min, max }) => {
  if (min === priceConstraint.min && max === priceConstraint.max) {
    return 'Any Price'
  } else if (min !== priceConstraint.min && max === priceConstraint.max) {
    return `$${numberWithCommas(min)}+`
  } else if (min === priceConstraint.min && max !== priceConstraint.max) {
    return `$${numberWithCommas(max)} and under`
  }
  return `$${numberWithCommas(min)} - $${numberWithCommas(max)}`
}

@themed(['RangeSlider_Text'])
export default class PriceInput extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  get max() {
    return this.props.max || priceConstraint.max
  }

  get min() {
    return this.props.min || priceConstraint.min
  }

  get value() {
    return `min_${this.min}-max_${this.max}`
  }

  @autobind
  priceTagging() {
    if (window.eventTracker) {
      window.eventTracker.track(
        'click', {
          item: 'slider_price',
          element: 'slider_price',
          section: 'more_filters',
          value: this.value,
          info: '',
        }
      )
    }
  }

  render() {
    const {
      min,
      max,
      theme,
      ...restProps
    } = this.props

    return (
      <div
        data-tag_element="slider_price"
        data-tag_value={this.value}
        data-tag_info=""
      >
        <RangeSlider
          formatLabel={() => ''}
          formatHeader={
            selectedPrice => (
              <div>
                <h4>Price</h4>
                <div className={theme.RangeSlider_Text} data-tid="price-range">
                  {text(selectedPrice)}
                </div>
              </div>
            )
          }
          value={{
            min: this.min,
            max: this.max,
          }}
          minValue={priceConstraint.min}
          maxValue={priceConstraint.max}
          step={100}
          onChangeComplete={this.priceTagging}
          {...restProps}
        />
      </div>
    )
  }
}
