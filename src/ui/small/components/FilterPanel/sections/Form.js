import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import camelCase from 'lodash/camelCase'
import autobind from 'autobind-decorator'
import debounce from 'lodash/debounce'
import BedFilter from './BedFilter'
import BathFilter from './BathFilter'
import Checkboxes from './Checkboxes'
import PriceInput from './PriceInput'
import SqftInput from './SqftInput'
import DropDownFilter from './DropDownFilter'
import config from '../config'

const TaggedItem = props => {
  const { children, ...others } = props

  return (
    <span {...others}>
      {children}
    </span>
  )
}

TaggedItem.propTypes = {
  children: PropTypes.any.isRequired,
}

@themed('*')

export default class Form extends Component {

  static propTypes = {
    theme: PropTypes.object,
    refinementCriteria: PropTypes.object,
    updateFilterCriteria: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
    refinementCriteria: {},
  }

  constructor(props) {
    super(props)
    this.updateFilterCriteria = debounce(this.plainUpdateFilterCriteria, 100)
  }

  componentWillMount() {
    this.updateFilterCriteria()
  }

  plainUpdateFilterCriteria(changes) {
    this.props.updateFilterCriteria(changes)
  }

  @autobind
  handleSelection(name, value) {
    const key = camelCase(name)
    this.updateFilterCriteria({ [key]: value })
  }

  @autobind
  handleBathChange(baths) {
    this.updateFilterCriteria({ baths })
  }

  @autobind
  handleBedChange(beds) {
    this.updateFilterCriteria({ beds })
  }

  @autobind
  handlePriceChange(data) {
    this.updateFilterCriteria({
      minPrice: data.min,
      maxPrice: data.max,
    })
  }

  @autobind
  handleSqftChange(sqftMin) {
    this.updateFilterCriteria({ sqftMin })
  }

  @autobind
  handlePetPolicyFilter() {
    const e = document.getElementById('PetsDropDown')
    const str = e.options[e.selectedIndex].text
    const dataset = e.options[e.selectedIndex].dataset
    window.eventTracker.track(
      'click', {
        item: dataset.tag_item,
        section: dataset.tag_section,
        selection: dataset.tag_selection,
      }
    )
    const option = config.pets

    switch (str) {
      case option.cats.value:
        this.updateFilterCriteria({ pets: 'catFriendly' })
        break
      case option.dogs.value:
        this.updateFilterCriteria({ pets: 'dogFriendly' })
        break
      case option.pets.value:
        this.updateFilterCriteria({ pets: 'petFriendly' })
        break
      case option.none.value:
        this.updateFilterCriteria({ pets: 'noPets' })
        break
      case 'Select':
        this.updateFilterCriteria({ pets: 'Select' })
        break
      default:
        break
    }
  }

  render() {
    const { theme, refinementCriteria } = this.props

    return (
      <form
        onSubmit={e => e.preventDefault()}
        className={theme.Form}
      >
        <div className={theme.Form_Section} data-tid="price-range-section">
          <PriceInput
            onChange={this.handlePriceChange}
            min={refinementCriteria.minPrice}
            max={refinementCriteria.maxPrice}
          />
        </div>
        <div className={theme.Form_Section} data-tid="beds-baths-section">
          <h4>Beds & Baths</h4>
          <BedFilter
            onClick={this.handleBedChange}
            value={refinementCriteria.beds}
          />
          <BathFilter
            onClick={this.handleBathChange}
            value={refinementCriteria.baths}
          />
        </div>
        <div className={theme.Form_Section} data-tid="square-foot-section">
          <SqftInput
            onChange={this.handleSqftChange}
            value={refinementCriteria.sqftMin}
          />
        </div>
        <div className={theme.Form_Section} data-tid="pet-policy-section">
          <h4>Pet Policy</h4>
          <DropDownFilter
            id="PetsDropDown"
            options={config.petOptions}
            onChange={this.handlePetPolicyFilter}
            criteria={refinementCriteria}
          />
        </div>
        <div className={theme.Form_Section} data-tid="property-type-section">
          <Checkboxes
            collapsible={config.propertyTypes}
            onChange={this.handleSelection}
            criteria={refinementCriteria}
          />
        </div>

        <div className={theme.Form_Section} data-tid="amenities-section">
          <Checkboxes
            collapsible={config.amenities}
            visibleText={
              <TaggedItem data-tag_item="show_hide_features">See fewer amenities</TaggedItem>
            }
            hiddenText={
              <TaggedItem data-tag_item="show_hide_features">See all amenities</TaggedItem>
            }
            criteria={refinementCriteria}
            onChange={this.handleSelection}
          />
        </div>

        {/* TODO: work with paul to determine appropriate query
            HOOD filters are not needed for MVP
          <div className={theme['Form_Section']}>
            <CollapsiblePanel
              collapsible={config.neighborhoods}
              visibleText="See fewer neighborhoods"
              hiddenText="See all neighborhoods"
            />
          </div>
        */}
      </form>
    )
  }
}
