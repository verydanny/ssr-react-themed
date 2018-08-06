import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import { Icon } from 'ui/shared/components/Icon'
import { chevronDown } from 'ui/shared/components/Icon/svgs/global'
import { RentBlue66 } from 'ui/shared/themes/colors'
import { formToUrl } from 'lib/url'
import { simplifyRefinementCriteria } from 'app/selectors/criteria'

const options = [
  { label: 'Best Match', value: '', item: 'sort_dropdown', section: 'sort_by_dropdown', selection: 'best_match' },
  { label: 'Price: Low to High', value: 'cheap', item: 'sort_dropdown', section: 'sort_by_dropdown', selection: 'price_lowest_first' },
  { label: 'Price: High to Low', value: 'sortPriceHigh', item: 'sort_dropdown', section: 'sort_by_dropdown', selection: 'price_highest_first' },
  { label: 'Ratings: High to Low', value: 'sortRatingHigh', item: 'sort_dropdown', section: 'sort_by_dropdown', selection: 'rating_high_to_low' },
]

export default class SortFilter extends Component {
  static propTypes = {
    selectedValue: PropTypes.string,
    theme: PropTypes.object,
    locationSlug: PropTypes.string,
    searchType: PropTypes.string,
    propertyType: PropTypes.string,
    query: PropTypes.object,
    refinementCriteria: PropTypes.object,
    pushState: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { selectedValue: this.selectedValueFromUrl(props) }
  }

  componentWillReceiveProps(nextProps) {
    const selectedValue = this.selectedValueFromUrl(nextProps)

    if (selectedValue !== this.state.selectedValue) {
      this.setState({ selectedValue })
    }
  }

  @autobind
  onItemSelect(e) {
    const sortOption = e.target.options[e.target.selectedIndex]
    const value = sortOption.value
    const dataset = sortOption.dataset
    this.updateForm({ [value]: true })
    this.setState({ selectedValue: value })
    window.eventTracker.track(
      'click', {
        item: dataset.tag_item,
        section: dataset.tag_section,
        selection: dataset.tag_selection,
      }
    )
  }

  get options() {
    const children = options.map(opt => (
      <option
        data-tag_item={opt.item}
        data-tag_section={opt.section}
        data-tag_selection={opt.selection}
        key={opt.value} value={opt.value}
      >
        {opt.label}
      </option>
    ))

    return children
  }

  getSelectedLabel() {
    const selectedLabel = options.find(option => option.value === this.state.selectedValue)

    if (selectedLabel) {
      return selectedLabel.label
    }
    return ''
  }

  updateForm(data = {}) {
    const criteria = simplifyRefinementCriteria(this.props.refinementCriteria)
    const selectedRefinements = { ...criteria, ...data }

    const sortFilters = ['', 'sortPriceHigh', 'cheap', 'sortRatingHigh']

    sortFilters.forEach(key => {
      if (key === '' || (!data[key] && selectedRefinements[key])) {
        delete selectedRefinements[key]
      }
    })
    const url = this.url(selectedRefinements)
    this.props.pushState(url)
  }

  /* eslint-disable no-param-reassign */
  selectedValueFromUrl(props) {
    const { refinementCriteria } = props
    return Object.keys(refinementCriteria).reduce((criteria, k) => {
      const ref = refinementCriteria[k]
      const { group, key } = ref

      switch (group) {
        case 'sort':
          criteria = key
          break
        default:
          criteria = ''
          break
      }
      return criteria
    }, {})
  }

  url(selectedRefinements) {
    const {
      locationSlug,
      query,
      searchType,
      propertyType,
    } = this.props

    const queryParams = omit(query, 'page')
    const path = formToUrl({
      locationSlug,
      searchType,
      propertyType,
      selectedRefinements,
      queryParams,
      shouldClearPage: true,
    })

    return path
  }

  render() {
    const {
      theme,
    } = this.props
    return (
      <div className={theme.PropertyFilter_SortDropdownBlock}>
        <span className={theme.PropertyFilter_Nowrap} data-tid="sort-by">
          <b>Sort by:</b> {this.getSelectedLabel()}
        </span>
        <Icon
          svgs={{ chevronDown }}
          className={theme.PropertyFilter_MenuArrow}
          fill={RentBlue66}
        />
        <select
          onChange={this.onItemSelect}
          value={this.state.selectedValue}
          id={'SortDropdown'}
          className={theme.PropertyFilter_RemoveDefaultStyle}
        >
          {this.options}
        </select>
      </div>
    )
  }
}
