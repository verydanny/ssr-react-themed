import React, { Component } from 'react'
import PropTypes from 'prop-types'
// TODO: move to selector
import formatPhone from 'lib/utils/formatPhone'
import { themed } from 'react-themed-too'
import get from 'lodash/fp/get'
import pick from 'lodash/fp/pick'
import autobind from 'autobind-decorator'
import cn from 'classnames'
import { handlePdpClick } from 'lib/ui/listingActions'
import withInfo from 'ui/shared/components/withInfo'
import {
  LEAD_MODAL_ID,
  LEAD_MODAL_PROPS,
} from 'ui/large/components/LeadModal/const'
import { CONTACT_FOR_PRICE } from 'ui/large/components/MapView/const'

const SERVER = 'https://image.rent.com/'
const VIEW_SIZE = '74-62' // only used if view size is not found

@themed('*')
export class BasePopUpCard extends Component {
  static propTypes = {
    theme: PropTypes.object,
    tplSource: PropTypes.string,
    photos: PropTypes.array,
    listingId: PropTypes.string,
    priceText: PropTypes.string,
    openModal: PropTypes.func,
    showPhone: PropTypes.bool,
    desktopPhone: PropTypes.string,
    propertyLabel: PropTypes.string,
    listingSeoPath: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    propertyType: PropTypes.string,
    isCurrentSpotlight: PropTypes.bool,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    theme: {},
    photos: [],
  }

  constructor(props) {
    super(props)
    this.divRef = React.createRef()
    this.hasClickHandler = false
  }

  componentDidMount() {
    const node = this.divRef.current

    if (node) {
      this.hasClickHandler = true
      node.addEventListener('click', this.handlePopUpClick, false)
    }
  }

  componentDidUpdate() {
    const node = this.divRef.current

    if (node && !this.hasClickHandler) {
      this.hasClickHandler = true
      node.addEventListener('click', this.handlePopUpClick, false)
    }
  }

  componentWillUnmount() {
    const node = this.divRef.current

    if (node && this.hasClickHandler) {
      node.removeEventListener('click', this.handlePopUpClick, false)
    }
  }

  onContactPropertyClick() {
    const data = {
      page: 'srp_map',
      section: 'map_listing',
      item: 'check_availability_button',
    }
    this.createEventType('click', data)
  }

  onPhoneClick() {
    const data = {
      page: 'srp_map',
      section: 'map_listing',
      item: 'check_availability_phone',
    }
    this.createEventType('click', data)
  }

  get propertyLabel() {
    const { theme, propertyType, isCurrentSpotlight, showPhone, priceText } = this.props

    if (propertyType !== 'APARTMENTS' && !isCurrentSpotlight && priceText !== CONTACT_FOR_PRICE) {
      const withPhone = showPhone ? 'with' : 'without'
      return (
        <div
          className={cn(theme.Property_Rating, theme[`PopUpCard_PropertyLabel-${withPhone}Phone`])}
        >
          HOME FOR RENT
        </div>
      )
    }
    return (
      isCurrentSpotlight && (
        <div className={cn(theme['PopUpCard_PropertyLabel-withPhone'], theme.PopUpCard_SponsoredText)} >
          SPONSORED
        </div>
      )
    )
  }

  get renderPropertyLabel() {
    const { isCurrentSpotlight } = this.props

    if (isCurrentSpotlight) {
      return (
        this.sponsoredLabel
      )
    }
    return this.propertyLabel
  }

  photo(path) {
    // Get the size for this viewType, or if that is not defined use a fallback
    // TODO: LF how are we falling back for failed image requests?
    // i've kicked the question to product, should we be supporting
    // caption text for these photos as well? (if available)
    if (path) {
      const size = VIEW_SIZE
      return `${SERVER}${path}${size}`
    }
    return ''
  }

  @autobind
  handlePopUpClick(e) {
    // Determine if the click was within an A or Button element,
    // of within an element with a data-nopdplink attribute
    const nopdplink = e.target.closest('a,button,[data-nopdplink]')

    if (nopdplink) {
      const listingProps = pick(LEAD_MODAL_PROPS)(this.props)

      const { openModal } = this.props

      if (openModal) openModal(LEAD_MODAL_ID, listingProps)
      if (e.target.textContent === 'Contact Property') {
        this.onContactPropertyClick()
      } else {
        this.onPhoneClick()
      }
    } else {
      handlePdpClick(e, this.props.listingSeoPath)
    }
  }

  createEventType(type, data) {
    window.eventTracker.track(type, data)
  }

  render() {
    const {
      theme,
      photos,
      priceText,
      tplSource,
      listingId,
      propertyLabel,
      showPhone,
      onMouseEnter,
      onMouseLeave,
      desktopPhone,
      isActive,
    } = this.props

    if (!listingId) return null

    const listingPhoto = get('path')(photos[0])
    const missingPhotos = photos.length === 0

    return (
      <div
        className={cn(theme.PopUpFrame, showPhone && theme['PopUpFrame-withPhone'])}
        data-tag_item="padding_box"
        data-tag_section="map_listing"
        data-tag_listing_id={listingId}
        data-tag_tpl_source={tplSource}
        data-tid="popup_card"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="presentation"
        ref={this.divRef}
      >
        <div
          className={cn(
            theme.PopUpImage,
            { [theme['PopUpImage-missing']]: missingPhotos }
          )}
          data-tag_item="image"
        >
          {!missingPhotos &&
            <img
              alt=""
              src={this.photo(listingPhoto)}
              key={this.photo(listingPhoto)}
            />
          }
        </div>
        <div className={theme.PopUpListingInfo}>
          <div className={theme.PopUpListingInfo_Header}>
            <div className={theme.PopUpListingInfo_Price} data-tid="popup-property-price" >
              {priceText}
            </div>
            {this.propertyLabel}
          </div>
          <div className={theme.PopUpListingInfo_PropertyName} data-tid="popup-property-name">
            {propertyLabel}
          </div>
          {isActive &&
            <div data-nopdplink className={theme.PopUpListingInfo_ContactRow} data-tid="popup-contact-row">
              <span
                className={theme.PopUpListingInfo_Contact}
                data-tag_item="check_availability_button"
              >
                Contact Property
              </span>
              {showPhone &&
                <span>
                  <span className={theme.PopUpListingInfo_Separator}>
                    &nbsp;•&nbsp;
                  </span>
                  <span
                    className={theme.PopUpListingInfo_Contact}
                    data-tag_item="check_availability_phone"
                  >
                    {formatPhone(desktopPhone)}
                  </span>
                </span>
              }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default withInfo(BasePopUpCard)
