import React, { PureComponent } from 'react'
import { PriceFilterCard } from '@rentpath/react-ui-core'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { PRICE_FILTER_SLIDER_DEFAULTS } from './const'

@themed(/^Inline/)
export default class InlinePriceFilterCard extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    submitUrl: PropTypes.string,
    updateFilterCriteriaWithChanges: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)
    this.state = { isSliding: false }
  }

  @autobind
  handleSubmit() {
    const { pushState, submitUrl } = this.props
    pushState(submitUrl)
  }

  @autobind
  handlePriceChange(value) {
    if (window.eventTracker) {
      window.eventTracker.track('click', {
        item: 'slider_price',
        section: 'filter_card',
        selection: `${value}`,
      })
    }
    this.props.updateFilterCriteriaWithChanges({ maxPrice: value })
    this.setState({ isSliding: false })
  }

  render() {
    const {
      priceBoundaries,
      defaultPriceRange,
      step,
    } = PRICE_FILTER_SLIDER_DEFAULTS

    const { theme } = this.props
    return (
      <PriceFilterCard
        data-tid="inline-price-filter-card"
        data-tag_section="filter_card"
        className={classnames(
          theme.InlineCard,
          this.state.isSliding && theme['InlinePriceFilterCard-sliding']
        )}
        title="Filter by price"
        description="Set a maximum price for your search."
        applyButton={{
          onClick: this.handleSubmit,
          'data-tag_item': 'update_results_button',
          'data-tag_selection': 'price',
        }}
        priceSlider={{
          'data-tid': 'range-slider',
          formatLabel: val => `$${val}`,
          value: priceBoundaries.value,
          minValue: defaultPriceRange.min,
          maxValue: defaultPriceRange.max,
          minLabel: defaultPriceRange.min,
          maxLabel: defaultPriceRange.max,
          step,
          onChangeStart: () => this.setState({ isSliding: true }),
        }}
        onChange={this.handlePriceChange}
      />
    )
  }
}
