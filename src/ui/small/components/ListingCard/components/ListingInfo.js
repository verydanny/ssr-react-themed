import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import classnames from 'classnames'
import compact from 'lodash/compact'
import withInfo from 'ui/shared/components/withInfo'

@themed('*', { pure: true })

class ListingInfo extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    propertyLabel: PropTypes.string,
    viewType: PropTypes.string,
    isActiveCard: PropTypes.bool,
    unitAvailText: PropTypes.string,
    priceText: PropTypes.string,
    beds: PropTypes.string,
    baths: PropTypes.string,
    isActive: PropTypes.bool,
    listingSeoPath: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
    listingSeoPath: '',
  }

  get listCardInfo() {
    const {
      theme,
      unitAvailText,
      isActive,
    } = this.props

    if (!(unitAvailText && isActive)) return null

    return (
      <a className={theme.ListingInfo_availabilitylink} data-tid="available-units">
        {unitAvailText}
      </a>
    )
  }

  get mapCardInfo() {
    const {
      theme,
      unitAvailText,
      isActive,
    } = this.props

    if (!(unitAvailText && isActive)) return null

    return (
      <div className={theme.ListingInfo_availabilityText}>
        <span>
          <a className={theme.ListingInfo_availabilitylink} data-tid="available-units">
            {unitAvailText}
          </a>
        </span>
      </div>
    )
  }

  get priceInfo() {
    const {
      priceText,
      viewType,
      isActive,
    } = this.props

    if (!priceText) return ''
    const suffix = viewType === 'map' ? ' • ' : ''

    if (!isActive) return `Price Unavailable${suffix}`
    return `${priceText}${suffix}`
  }

  get break() {
    return (this.props.viewType === 'list' ? <br /> : '')
  }

  get bedsAndBaths() {
    const { beds, baths, isActive, theme } = this.props
    const roomText = compact([beds, baths]).join(' • ')

    if (!(roomText && isActive)) return null
    return (
      <div data-tid="beds-baths" className={theme.ListingInfo_bedbathText}>
        {roomText}
      </div>
    )
  }

  render() {
    const {
      propertyLabel,
      theme,
      isActiveCard,
      viewType,
      listingSeoPath,
    } = this.props

    const isListView = viewType === 'list'
    const NodeType = isListView ? 'div' : 'span'

    return (
      <div
        className={theme[`ListingInfo_${viewType}`]}
        role="presentation"
      >
        <NodeType
          className={classnames(theme.ListingInfo_title,
            theme[`ListingInfo_title_${viewType}`]
          )}
          data-tid="listing-title"
        >
          {/* TODO: move this rentals/lovely logic to api
              https://github.com/rentpath/rent/blob/master/app/models/listing.rb#L281
              https://www.pivotaltracker.com/n/projects/1946211/stories/151453020
          */}
          <span data-tid="listing-price" >
            {this.priceInfo}
          </span>
          {this.break}
          <a
            className={classnames({ [theme.ListingInfo_title]: true })}
            itemProp="url"
            href={`/${listingSeoPath}`}
            data-tag_item={isActiveCard ? 'property_title' : null}
            data-tid="property-title"
          >
            <span itemProp="name">
              {propertyLabel}
            </span>
          </a>
        </NodeType>
        <div className={classnames(theme.ListingInfo_bedbath,
          theme[`ListingInfo_bedbath-${viewType}`])}
        >
          {this.bedsAndBaths}
          {viewType === 'map' ? this.mapCardInfo : this.listCardInfo}
        </div>
      </div>
    )
  }
}

export default withInfo(ListingInfo)
