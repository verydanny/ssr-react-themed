import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { container as SearchInput } from 'ui/shared/components/SearchInput'
import BedFilter from './sections/BedFilter'
import MaxPriceFilter from './sections/MaxPriceFilter'
import MoreFilters from './sections/MoreFilters'
import FilterTokens from './sections/FilterTokens'

export default class Filters extends Component {
  static propTypes = {
    theme: PropTypes.object,
    updateFilterValue: PropTypes.func,
    enableFilter: PropTypes.func,
    priceButtonText: PropTypes.string,
    bedButtonText: PropTypes.string,
    isFiltersModalOpen: PropTypes.bool,
    openModal: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.isFiltersModalOpen
  }

  @autobind
  handleBedChange(count) {
    const { enableFilter } = this.props
    enableFilter('beds', `${count}beds`, true)
  }

  @autobind
  handlePriceChange(maxPrice) {
    const { updateFilterValue } = this.props

    if (maxPrice === 'Any') {
      updateFilterValue('price', 'maxPrice', null, true)
    } else {
      updateFilterValue('price', 'maxPrice', `${maxPrice}`, true)
    }
  }

  render() {
    const { theme, openModal, priceButtonText, bedButtonText } = this.props

    return (
      <Fragment>
        <div className={theme.Filters}>
          <SearchInput
            theme={theme}
            placeholder="City, State or Zip"
            searchIconName="close"
            className={theme.LocationInput_border}
            locationInputClassName={theme.LocationInput}
            removeSpace
          />
          <MaxPriceFilter
            onChange={this.handlePriceChange}
            buttonText={priceButtonText}
          />
          <BedFilter
            onChange={this.handleBedChange}
            buttonText={bedButtonText}
          />
          <MoreFilters openModal={openModal} />
        </div>
        <FilterTokens />
      </Fragment>
    )
  }
}
