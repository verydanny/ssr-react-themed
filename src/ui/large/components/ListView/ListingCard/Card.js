import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import classnames from 'classnames'
import withInfo from 'ui/shared/components/withInfo'
import { ImageGallery } from 'ui/shared/components/ImageGallery'
import FavoriteIcon from 'ui/shared/components/FavoriteIcon'
import HdOverlay from 'ui/shared/components/HdOverlay'
import formatPhone from 'lib/utils/formatPhone'
import stringToNumber from 'lib/utils/stringToNumber'
import { handlePdpClick } from 'lib/ui/listingActions'
import { getShowPhone } from 'app/selectors/listings'
import autobind from 'autobind-decorator'
import { Text } from '@rentpath/react-ui-core'
import ListingInfo from './ListingInfo'

const WrappedListingInfo = withInfo(ListingInfo)

@themed('*')
export default class Card extends Component {

  static propTypes = {
    theme: PropTypes.object,
    listing: PropTypes.object.isRequired,
    isActiveCard: PropTypes.bool,
    isFavorite: PropTypes.bool,
    toggleFavorite: PropTypes.func,
    openModal: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    lazyLoadGallery: PropTypes.bool,
  }

  static defaultProps = {
    theme: {},
  }

  @autobind
  onContactPropertyClick() {
    const {
      listing,
      openModal,
    } = this.props

    if (openModal) openModal(listing)
  }

  get promoted() {
    const {
      listing: {
        isCurrentSpotlight,
        isCurrentFeatured,
      },
    } = this.props

    let info = { tagSection: null, text: null }

    if (isCurrentSpotlight) info = { tagSection: 'spotlight', text: 'Sponsored' }
    if (isCurrentFeatured) info = { tagSection: 'featured', text: 'Featured' }
    return info
  }

  @autobind
  neighborhoodInfo() {
    const neighborhoods = this.props.listing.neighborhoods
    return neighborhoods ? neighborhoods.slice(0, 2).join(', ') : null
  }

  recentlyUpdateInfo() {
    const currentDate = (new Date())
    const lastUpdate = new Date(this.props.listing.lastUpdate)
    const milliSeconds = currentDate.getTime() - lastUpdate.getTime()
    const days = stringToNumber(milliSeconds / (60 * 60 * 1000 * 24))
    const hours = stringToNumber(milliSeconds / (60 * 60 * 1000))

    if (days <= 7) {
      if (hours <= 24) {
        return hours <= 1 ? 'Updated 1 hour ago' : `Updated ${hours} hours ago`
      }
      return days === 1 ? `Updated ${days} day ago` : `Updated ${days} days ago`
    } else if (days <= 14) {
      return 'Updated 2 weeks ago'
    }
    return null
  }

  @autobind
  handleCardClick(e) {
    const { listing } = this.props
    handlePdpClick(e, listing.listingSeoPath)
  }

  @autobind
  handleMouseEnter(event) {
    const { onMouseEnter, listing } = this.props

    // Also pass the listing id up to the parent component's event handler
    if (onMouseEnter && listing && listing.listingId) {
      onMouseEnter(event, listing.listingId)
    }
  }

  @autobind
  handleMouseLeave(event) {
    const { onMouseLeave, listing } = this.props

    // Also pass the listing id up to the parent component's event handler
    if (onMouseLeave && listing && listing.listingId) {
      onMouseLeave(event, listing.listingId)
    }
  }

  @autobind
  toggleFavoriteHandler() {
    const { toggleFavorite, listing } = this.props
    toggleFavorite(listing.listingId)
  }

  render() {
    const {
      listing,
      isActiveCard,
      theme,
      isFavorite,
      lazyLoadGallery,
    } = this.props

    const listingInfoProps = {
      ...listing,
      neighborhoodInfo: this.neighborhoodInfo(),
      recentlyUpdated: this.recentlyUpdateInfo(),
      onContactPropertyClick: this.onContactPropertyClick,
      phone: getShowPhone(listing) ? formatPhone(listing.desktopPhone) : null,
    }

    return (
      <div
        className={classnames(
          theme.ListingCard,
          isActiveCard && theme['ListingCard-active']
        )}
        onClick={this.handleCardClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        role="presentation"
        data-tid="listing-section"
        data-tag_item="padding_box"
        data-tag_listing_id={listing.listingId}
        data-tag_tpl_source={listing.tplSource}
        data-tag_section={this.promoted.tagSection}
        data-active-card={isActiveCard || null}
        itemType="http://schema.org/ApartmentComplex"
        itemScope
      >
        <ImageGallery
          className={theme.ListingCard_Gallery}
          photos={listing.photos}
          disableArrowKeys
          showIndex
          dataTagItem="image"
          lazyload={lazyLoadGallery}
        />
        {this.promoted.text && (
          <div className={theme.CardInfo_Sponsored}>
            <Text className={theme.CardInfo_Sponsored_Text} data-tid={`${this.promoted.text.toLowerCase()}-listing-banner`}>
              {this.promoted.text}
            </Text>
          </div>
        )}
        <FavoriteIcon isFavorite={isFavorite} onClick={this.toggleFavoriteHandler} />
        {listing.hasHdTour && <HdOverlay />}
        <WrappedListingInfo {...listingInfoProps} />
      </div>
    )
  }
}
