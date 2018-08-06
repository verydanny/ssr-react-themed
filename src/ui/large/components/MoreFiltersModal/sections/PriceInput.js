import React, { PureComponent } from 'react'
import { themed } from 'react-themed'
import { RangeSlider } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'
import cn from 'classnames'
import autobind from 'autobind-decorator'
import numberWithCommas from 'lib/utils/numberWithCommas'
import { priceConstraint } from 'ui/shared/config/price-const'
import getOr from 'lodash/fp/getOr'
import pipe from 'lodash/fp/pipe'

// Display a grid below the range slider at these points
const gridPoints = [500, 1000, 2000, 3000, 4000, 5000]

const MAX_PRICE_UI = 5100

@themed(/^PriceInput/, { pure: true })
export default class PriceInput extends PureComponent {
  static propTypes = {
    price: PropTypes.object,
    spreadPrice: PropTypes.bool,
    theme: PropTypes.object,
    onChangeMin: PropTypes.func.isRequired,
    onChangeMax: PropTypes.func.isRequired,
  }

  static defaultProps = {
    theme: {},
  }

  /**
   * Render the grid numbers below the slider, and add positioning
   * styles to move the numbers to the correct offsets.
   */
  get grid() {
    const { theme } = this.props
    return (
      <div className={theme.PriceInput_Grid} data-tid="priceinput-grid">
        {gridPoints.map((n, index) => {
          let label = `$${numberWithCommas(n)}`
          const offset = this.getGridOffset(n)
          const style = {
            left: `${offset}%`,
          }

          // Add "+" to the end of the last item: $5,000+
          if (index === gridPoints.length - 1) {
            label += '+'
          }

          // Skip this grid line if it is outside our range
          if (n < priceConstraint.min || n > priceConstraint.max) return null

          return (
            <div
              className={theme.PriceInput_GridItem}
              data-tid="priceinput-grid-item"
              style={style}
              key={index}
            >
              {label}
            </div>
          )
        })}
      </div>
    )
  }

  /**
   * For a given grid label (like 2000), return the percentage
   * offset to move the label to the corresponding position under the slider.
   * @param {Number} n The price label, such as 500 or 2000.
   * @returns {Number} A number between 0 and 1 that can be used as a "left"
   * style to position the label.
   */
  getGridOffset(n) {
    // Assuming that the grid covers 100% width,
    // Given a grid point "n" (like 2000),
    // At what position should it be placed based on the min/max of the range?
    const { min, max } = priceConstraint
    const total = max - min || 0

    if (total) {
      return ((n - min) / total) * 100
    }
    return 0
  }

  get max() {
    const { price } = this.props
    return pipe(getOr(priceConstraint.max, 'maxPrice.value'), parseInt)(price)
  }

  get min() {
    const { price } = this.props
    return pipe(getOr(priceConstraint.min, 'minPrice.value'))(price)
  }

  /**
   * Add dollar sign and commas to the number that appears above the slider handles
   * @param {Number} value
   * @return {String}
   */
  @autobind
  formatValue(value) {
    const { theme } = this.props
    let v = `$${numberWithCommas(value)}`
    let className = null
    const min = this.min
    const max = this.max

    if (value >= priceConstraint.max) v += '+'

    // Since RangeSlider does not give us a unique class for the two labels,
    // we will add a class so we can style min and max labels separately
    if (value < max) {
      className = theme.PriceInput_MinLabel
    } else if (value > min) {
      className = theme.PriceInput_MaxLabel
    }

    return (
      <span className={className} data-tid="priceinput-label">
        {v}
      </span>
    )
  }

  @autobind
  priceTagging() {
    if (window.eventTracker) {
      window.eventTracker.track(
        'click', {
          item: 'slider_price',
          element: 'slider_price',
          section: 'more_filters',
          value: `min_${this.min}-max_${this.max}`,
          info: '',
        }
      )
    }
  }

  @autobind
  handleChange(e) {
    const { onChangeMin, onChangeMax } = this.props
    onChangeMin(e.min)
    if (e.max >= MAX_PRICE_UI) {
      onChangeMax(undefined)
    } else {
      onChangeMax(e.max)
    }
  }

  render() {
    const {
      theme,
      spreadPrice,
      ...restProps
    } = this.props

    return (
      <div
        className={cn(
          theme.PriceInput,
          spreadPrice && theme['PriceInput-spreadLabels']
        )}
        data-tag_element="slider_price"
        data-tag_value={`min_${this.min}-max_${this.max}`}
        data-tag_info=""
      >
        <RangeSlider
          formatLabel={value => this.formatValue(value)}
          value={{ min: this.min, max: this.max }}
          minValue={priceConstraint.min}
          maxValue={priceConstraint.max}
          step={50}
          onChange={this.handleChange}
          onChangeComplete={this.priceTagging}
          {...restProps}
        />
        {this.grid}
      </div>
    )
  }
}
