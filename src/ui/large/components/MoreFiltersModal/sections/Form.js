import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { getPricesAreClose } from 'app/selectors/filters'
import cn from 'classnames'
import get from 'lodash/fp/get'
import BedInput from './BedInput'
import BathInput from './BathInput'
import PetInput from './PetInput'
import PriceInput from './PriceInput'
import ToggleButtons from './ToggleButtons'

@themed('*', { pure: true })
export default class Form extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    filters: PropTypes.object,
    updateFilterValue: PropTypes.func.isRequired,
    enableFilter: PropTypes.func.isRequired,
    disableFilter: PropTypes.func.isRequired,
    disableAllFilters: PropTypes.func.isRequired,
  }

  static defaultProps = {
    theme: {},
    refinementCriteria: {},
  }

  componentDidMount() {
    // Prevent label elements from making a double tagging call.
    // This needs to be done with a DOM event handler instead of a
    // React synthetic event.
    this.form.addEventListener('click', event => {
      const tagName = get('target.tagName')(event) || ''

      if (tagName.toUpperCase() === 'LABEL') {
        event.stopPropagation()
      }
    })
  }

  render() {
    const {
      theme,
      filters,
      updateFilterValue,
      enableFilter,
      disableFilter,
      disableAllFilters,
    } = this.props

    return (
      <form
        ref={el => { this.form = el }}
        onSubmit={e => e.preventDefault()}
      >
        <div
          className={cn(
            theme.MoreFiltersModal_Row,
            theme['MoreFiltersModal_Row-price']
          )}
          data-tid="price-input"
        >
          <h3
            className={cn(
              theme.MoreFiltersModal_RowLabel,
              theme['MoreFiltersModal_RowLabel-price']
            )}
          >
            Price Range
          </h3>
          <div className={cn(theme.MoreFiltersModal_RowContent)}>
            <PriceInput
              onChangeMin={newPrice => updateFilterValue('price', 'minPrice', newPrice)}
              onChangeMax={newPrice => updateFilterValue('price', 'maxPrice', newPrice)}
              spreadPrice={getPricesAreClose(filters.price)}
              price={filters.price}
            />
          </div>
        </div>
        <div
          className={cn(
            theme.MoreFiltersModal_Row,
            theme['MoreFiltersModal_Row-beds']
          )}
          data-tid="bed-input"
        >
          <h3 className={theme.MoreFiltersModal_RowLabel}>Beds</h3>
          <div className={theme.MoreFiltersModal_RowContent}>
            <BedInput
              onChange={name => enableFilter('beds', name)}
              onUnselect={() => disableAllFilters('beds')}
              filterItems={filters.beds}
            />
          </div>
        </div>
        <div
          className={cn(
            theme.MoreFiltersModal_Row,
            theme['MoreFiltersModal_Row-bathrooms']
          )}
          data-tid="bath-input"
        >
          <h3 className={theme.MoreFiltersModal_RowLabel}>Bathrooms</h3>
          <div className={theme.MoreFiltersModal_RowContent}>
            <BathInput
              onChange={name => enableFilter('baths', name)}
              onUnselect={() => disableAllFilters('baths')}
              filterItems={filters.baths}
            />
          </div>
        </div>
        <div
          className={cn(
            theme.MoreFiltersModal_Row,
            theme['MoreFiltersModal_Row-pets']
          )}
          data-tid="pet-input"
        >
          <h3 className={theme.MoreFiltersModal_RowLabel}>Pets</h3>
          <div className={theme.MoreFiltersModal_RowContent}>
            <PetInput
              onChange={name => enableFilter('pets', name)}
              onUnselect={() => disableAllFilters('pets')}
              filterItems={filters.pets}
            />
          </div>
        </div>
        <div
          className={cn(
            theme.MoreFiltersModal_Row,
            theme['MoreFiltersModal_Row-amenities']
          )}
          data-tid="amenities-input"
        >
          <h3 className={theme.MoreFiltersModal_RowLabel}>Amenities</h3>
          <div className={theme.MoreFiltersModal_RowContent}>
            <ToggleButtons
              onChange={enableFilter}
              onUnselect={disableFilter}
              items={{
                ...filters.amenities,
                ...filters.lifestyles,
              }}
            />
          </div>
        </div>
        <div
          className={cn(
            theme.MoreFiltersModal_Row,
            theme['MoreFiltersModal_Row-propertyTypes']
          )}
          data-tid="property-type-input"
        >
          <h3 className={theme.MoreFiltersModal_RowLabel}>Property Type</h3>
          <div className={theme.MoreFiltersModal_RowContent}>
            <ToggleButtons
              onChange={enableFilter}
              onUnselect={disableFilter}
              items={filters.propertyTypes}
            />
          </div>
        </div>
      </form>
    )
  }
}
