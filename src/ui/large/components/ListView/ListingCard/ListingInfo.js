import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import cn from 'classnames'
import autobind from 'autobind-decorator'
import { Text } from '@rentpath/react-ui-core'
import AggregateRating from 'ui/shared/components/AggregateRating'

@themed('*', { pure: true })

export default class ListingInfo extends PureComponent {

  static propTypes = {
    theme: PropTypes.object,
    unitAvailText: PropTypes.string,
    priceText: PropTypes.string,
    beds: PropTypes.string,
    baths: PropTypes.string,
    propertyType: PropTypes.string,
    propertyLabel: PropTypes.string,
    neighborhoodInfo: PropTypes.string,
    recentlyUpdated: PropTypes.string,
    numRatings: PropTypes.number,
    avgOverallRating: PropTypes.number,
    phone: PropTypes.string,
    onContactPropertyClick: PropTypes.func,
    listingSeoPath: PropTypes.string,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    theme: {},
    isActive: true,
  }

  get propertyLabel() {
    const { theme, propertyLabel, listingSeoPath } = this.props

    return (
      <a
        className={cn(theme.Property_Name, theme.Property_Address)}
        data-tid="property-title"
        data-tag_item="property_title"
        href={`/${listingSeoPath}`}
        itemProp="url"
        target="_blank"
      >
        <span itemProp="name">
          {propertyLabel}
        </span>
      </a>
    )
  }

  get unitAvail() {
    const { unitAvailText, theme } = this.props

    if (!unitAvailText) return null
    return (
      <div
        className={theme.Property_UnitsSpecials}
        data-tid="property-unitAvailText"
        key="unitAvail"
      >
        {unitAvailText}
      </div>
    )
  }

  get recentlyUpdated() {
    const { recentlyUpdated, theme } = this.props

    if (!recentlyUpdated) return null
    return (
      <div
        className={theme.Property_RecentChange}
        data-tid="property-recentlyUpdated"
        key="recentlyUpdated"
      >
        {recentlyUpdated}
      </div>
    )
  }

  get apartmentPropertyInfo() {
    return [
      this.unitAvail,
      this.recentlyUpdated,
    ]
  }

  get defaultPropertyInfo() {
    const { theme, neighborhoodInfo } = this.props
    return (
      <Text
        className={theme.Property_NeighborhoodInfo}
        data-tid="property-neighborhoodInfo"
      >
        {neighborhoodInfo}
      </Text>
    )
  }

  get propertyInfo() {
    const {
      theme,
      propertyType,
      beds,
      baths,
      isActive,
    } = this.props

    if (!isActive) return null

    return (
      <div
        className={theme.Property_Info}
        data-tid="property-info"
      >
        {isActive &&
        <div className={theme.Property_BedBath} data-tid="beds-baths">
          {`${beds} • ${baths}`}
        </div>
        }
        {propertyType === 'APARTMENTS' ?
          this.apartmentPropertyInfo :
          this.defaultPropertyInfo
        }
      </div>
    )
  }

  get rating() {
    const { theme, propertyType, numRatings, avgOverallRating } = this.props

    if (propertyType === 'APARTMENTS') {
      return (
        <AggregateRating
          data-tid="rating"
          listing={{ numRatings, avgOverallRating }}
        />
      )
    }
    return (
      <div
        className={theme.Property_Rating}
        data-tid="property-rating"
      >
       HOME FOR RENT
      </div>
    )
  }

  get contactInfo() {
    const { theme, isActive } = this.props
    return (
      <div data-nopdplink>
        <div className={theme.Property_BlankLine} />
        {isActive &&
        <button
          className={theme.Property_Contact}
          onClick={this.handleContactInfoClick}
          data-tid="contact-property-button"
          data-tag_item="check_availability_button"
        >
          <Text className={theme.ListingInfo_contactProperty_Text} >
           Contact Property
          </Text>
        </button>
        }
        {this.phoneInfo}
      </div>
    )
  }

  get phoneInfo() {
    const { theme, phone, isActive } = this.props

    if (!isActive) {
      return null
    }
    return phone ?
      <Text
        className={theme.Property_ContactNumber}
        data-tid="phone"
        data-tag_item="phone_number_link"
        data-tag_selection="phone"
      >
        {phone}
      </Text> :
      <Text
        className={theme.Property_AvailNow}
        data-tid="available-now"
      >
           Available Now
      </Text>
  }

  @autobind
  handleContactInfoClick(e) {
    const { onContactPropertyClick } = this.props

    // The link to the PDP is used for SEO purposes only,
    // so we don't actually want to follow the link.
    e.preventDefault()

    if (onContactPropertyClick) onContactPropertyClick(e)
  }

  render() {
    const { theme, priceText } = this.props
    return (
      <div className={this.props.theme.ListingInfo}>
        <div className={this.props.theme.ListingInfo_Content}>
          <div className={cn(theme.Property_Name, theme.Property_Price)} data-tid="price">
            {priceText}
          </div>
          {this.rating}
          {this.propertyLabel}
          {this.propertyInfo}
          {this.contactInfo}
        </div>
      </div>
    )
  }
}
