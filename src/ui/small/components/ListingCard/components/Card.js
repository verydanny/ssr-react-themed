import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { Tagging } from '@rentpath/react-ui-tracking'
import AggregateRating from 'ui/shared/components/AggregateRating'
import cn from 'classnames'
import get from 'lodash/fp/get'
import formatPhone from 'lib/utils/formatPhone'
import { ImageGallery } from 'ui/shared/components/ImageGallery'
import FavoriteIcon from 'ui/shared/components/FavoriteIcon'
import HdOverlay from 'ui/shared/components/HdOverlay'
import CtaButton from './CtaButton'
import ListingInfo from './ListingInfo'

@themed('*')
export default class Card extends Component {

  static propTypes = {
    theme: PropTypes.object,
    listing: PropTypes.object,
    hasAdvertisement: PropTypes.bool,
    viewType: PropTypes.string,
    contactIcon: PropTypes.string,
    listHubId: PropTypes.string,
    emailIcon: PropTypes.string,
    isActiveCard: PropTypes.bool,
    selectListing: PropTypes.func,
    onEmailClick: PropTypes.func,
    isFavorite: PropTypes.bool,
    toggleFavorite: PropTypes.func,
    isListView: PropTypes.bool,
    lazyLoadGallery: PropTypes.bool,
    pushState: PropTypes.func,
    isReactPDP: PropTypes.bool,
    addViewToCriteria: PropTypes.func,
    criteria: PropTypes.object,
  }

  static defaultProps = {
    contactIcon: 'phone',
    emailIcon: 'email',
    sponsored: false,
    isActiveCard: true,
    isFavorite: false,
    theme: {},
  }

  get formatMDN() {
    return formatPhone(this.props.listing.mPhone)
  }

  get phoneCTA() {
    const {
      listing,
      viewType,
      contactIcon,
      listHubId,
    } = this.props

    if (listing.mPhone && !listing.noVacancy && listing.isPaid && listing.isActive) {
      return (
        <CtaButton
          data-tid="cta-phone"
          contactType="phone"
          link={`tel:${listing.mPhone}`}
          tags={this.ctaTags('phone')}
          onClick={this.ctaHandler}
          icon={contactIcon}
          data-listhub_id={listHubId}
          variation={viewType}
          nodeType="a"
        >
          {this.formatMDN}
        </CtaButton>
      )
    }

    return null
  }

  get ctaText() {
    const { listing } = this.props

    if (get('aggregates.totalAvailable')(listing) > 0) {
      return 'Contact Property'
    }
    return 'Check Availability'
  }

  get emailCTA() {
    const {
      listing,
      emailIcon,
      viewType,
    } = this.props

    if (!listing.isActive) return null

    let center = ''

    if (!(listing.mPhone && !listing.noVacancy && listing.isPaid)) {
      center = '-center'
    }

    return (
      <CtaButton
        data-tid="cta-email"
        contactType="email"
        itemProp="url"
        tags={this.ctaTags('email')}
        onClick={this.emailClickHandler}
        icon={emailIcon}
        variation={`${viewType}${center}`}
        nodeType="button"
      >
        {this.ctaText}
      </CtaButton>
    )
  }

  @autobind
  ctaHandler(event) {
    const { isActiveCard } = this.props

    if (!isActiveCard) event.preventDefault()
  }

  @autobind
  emailClickHandler(event) {
    const {
      isActiveCard,
      onEmailClick,
      listing,
    } = this.props

    // prevent link clicks
    event.preventDefault()

    // Note because we are using an <A> element, when the click
    // event bubbles up to the card, the card click handler will
    // ignore clicks on this and will not show the PDP

    if (!isActiveCard) return
    if (onEmailClick) onEmailClick(listing)
  }

  ctaTags(ctaType) {
    const { isActiveCard, listing } = this.props

    if (!isActiveCard) return {}

    const emailTagging = {
      'data-tag_item': 'check_availability_button',
    }

    const phoneTagging = {
      'data-tag_action': 'lead_submission',
      'data-tag_item': null,
      'data-tag_selection': 'phone',
      'data-tag_revenue': listing.revenue,
    }

    return ctaType === 'phone' ? phoneTagging : emailTagging
  }

  cardTags() {
    const { isActiveCard } = this.props

    return !isActiveCard
  }

  @autobind
  handlePdpClick(e) {
    // TODO: isn't this handled with lib/ui/listingActions
    const {
      listing,
      isActiveCard,
      pushState,
      isReactPDP,
      addViewToCriteria,
      criteria,
      viewType,
    } = this.props
    let url = (listing && listing.listingSeoPath)

    // Determine if the click was within an A or Button element,
    // of within an element with a data-nopdplink attribute
    const nopdplink = e.target.closest('a,button,[data-nopdplink]')

    if (!isActiveCard) return
    if (nopdplink) return

    if (url) {
      if (window.localStorage) window.localStorage.setItem('uriListingId', listing.listingId)
      // Add starting slash if needed
      if (url.indexOf(0) !== '/') url = `/${url}`

      if (isReactPDP) {
        addViewToCriteria({ criteria, viewType })
        pushState(url)
      } else {
        window.location.assign(url)
      }
    }
  }

  @autobind
  handleMakeCardActiveClick() {
    const { listing, selectListing, isActiveCard } = this.props

    if (!isActiveCard && selectListing) {
      selectListing(listing.listingId)
    }
  }

  cardClickHandler() {
    return this.props.isActiveCard ? this.handlePdpClick : this.handleMakeCardActiveClick
  }

  @autobind
  toggleFavoriteHandler() {
    const { toggleFavorite, listing } = this.props
    toggleFavorite(listing.listingId)
  }

  render() {
    const {
      theme,
      listing,
      hasAdvertisement,
      viewType,
      isListView,
      isActiveCard,
      isFavorite,
      lazyLoadGallery,
    } = this.props

    const listingInfoProps = {
      listingId: listing.listingId,
      viewType,
      isActiveCard,
    }

    return (
      <div
        className={cn(theme[`ListingCard-${viewType}`], {
          [theme.ctaView]: listing.isCurrentSpotlight && isListView,
          [theme[`ListingCard-${viewType}Advertisement`]]: hasAdvertisement,
        })}
        data-tid="listing-section"
        data-tag_item="padding_box"
        data-tag_listing_id={listing.listingId}
        data-tag_tpl_source={listing.tplSource}
        role={'presentation'}
        onClick={this.cardClickHandler()}
        id={isListView ? `list-${listing.listingId}` : ''}
        data-tag_section={(listing.isCurrentSpotlight ? 'spotlight' : null)}
      >
        <span
          itemType="http://schema.org/ApartmentComplex"
          itemScope
        >
          {listing.isCurrentSpotlight &&
            <Tagging
              spotlight_listing_ids={listing.listingId}
            />
          }
          <div className={theme['ListingCard-overlay']}>
            <div className={cn(
              theme.CardInfo_contactIcons,
              theme[`CardInfo_contactIcons-${viewType}`])}
            >
              {this.phoneCTA}
              {this.emailCTA}
            </div>
            <div className={theme.CardInfo_infoOverPhoto}>
              <div className={cn({ [theme.CardInfo_sponsoredBanner]: listing.isCurrentSpotlight })}>
                <AggregateRating listing={listing} />
                {listing.isCurrentSpotlight && (
                  <span className={theme.CardInfo_sponsoredLabel} data-tid="sponsored-listing-banner">
                  Sponsored
                  </span>
                )}
              </div>
            </div>
          </div>
          <ImageGallery
            className={theme.ListingCard_Gallery}
            photos={listing.photos}
            dataTagItem={isActiveCard ? 'image' : null}
            lazyload={lazyLoadGallery}
          />
          <ListingInfo {...listingInfoProps} />
        </span>
        <FavoriteIcon isFavorite={isFavorite} onClick={this.toggleFavoriteHandler} />
        {listing.hasHdTour && <HdOverlay />}
      </div>
    )
  }
}
