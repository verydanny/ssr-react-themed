import React, { PureComponent } from 'react'
import autobind from 'autobind-decorator'
import themed from 'react-themed'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import AggregateRating from 'ui/shared/components/AggregateRating'

const EVENT = 'scroll'

// Attribute to be added to document.body when scroll percentage is exceded.
// This attribute can be used to show or hide the footer using CSS only.
// Since this attribute is added outside of React it will not cause a re=render.
const ACTIVE_ATTRIBUTE = 'data-show-pdp-footer'

// Percentage of the viewport height where the footer should appear.
const SCROLL_PERCENTAGE = 25

// Avoid computing too much as the scroll event fires
const SCROLL_THROTTLE = 100

@themed(/^PDPFooter/, { pure: true })
class PDPFooter extends PureComponent {
  static propTypes = {
    listing: PropTypes.object.isRequired,
    phoneFormatted: PropTypes.string,
    phoneTel: PropTypes.string,
    price: PropTypes.string,
    theme: PropTypes.object,
    openLeadFormModal: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)
    this.handleScroll = throttle(this.handleScroll, SCROLL_THROTTLE)
  }

  componentDidMount() {
    window.addEventListener(EVENT, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(EVENT, this.handleScroll)
  }

  @autobind
  handleScroll() {
    const scrollY = window.scrollY
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const scrollPercentage = Math.round((scrollY / viewportHeight) * 100)
    const shouldShowFooter = scrollPercentage > SCROLL_PERCENTAGE

    // Add an attribute to the BODY element when the footer should be showing.
    // The attribute can be used in the CSS rules to show or hide the footer.
    // For example:
    //   .PDPFooter { /* hide */ }
    //   [data-show-pdp-footer] .PDPFooter { /* show */ }
    document.body[shouldShowFooter ? 'setAttribute' : 'removeAttribute'](ACTIVE_ATTRIBUTE, '')
  }

  @autobind
  handleEmailClick() {
    const { listing, openLeadFormModal } = this.props

    if (openLeadFormModal && listing) {
      openLeadFormModal(listing)
    }
  }

  hasPrice() {
    const { price } = this.props
    return Boolean(price)
  }

  hasRatings() {
    const { listing } = this.props
    return Boolean(listing.numRatings)
  }

  renderPrice() {
    const { price, theme } = this.props

    if (!price) return null

    return (
      <span
        key="price"
        data-tid="pdpFooter_price"
        className={theme.PDPFooter_Price}
      >
        {price}
      </span>
    )
  }

  renderRating() {
    const { listing } = this.props
    return (
      <AggregateRating
        key="rating"
        data-tid="pdpFooter_rating"
        listing={listing}
        label={`(${listing.numRatings})`}
      />
    )
  }

  renderInfo() {
    const { theme } = this.props

    const hasInfo = this.hasPrice() || this.hasRatings()

    if (!hasInfo) {
      return (
        <div
          data-tid="pdpFooter_infoContact"
          className={theme.PDPFooter_InfoContact}
        >
          Contact for Price
        </div>
      )
    }

    return [
      this.renderPrice(),
      this.renderRating(),
    ]
  }

  renderPhone() {
    const { phoneTel, phoneFormatted, theme } = this.props

    if (!phoneTel) return null

    // TODO: verify tagging requirements?
    // 'data-listhub_id': this.props.listHubId,
    // 'data-tag_action': 'lead_submission',
    // 'data-tag_item': null,
    // 'data-tag_revenue': this.props.revenue,
    // 'data-tag_selection': 'phone',

    return (
      <a
        data-tid="pdpFooter_phone"
        href={`tel://${phoneTel}`}
        className={theme.PDPFooter_Phone}
      >
        {phoneFormatted}
      </a>
    )
  }

  renderEmail() {
    const { theme } = this.props

    // TODO: verify tagging requirements?
    // data-tag_item="check_availability_button"

    return (
      <button
        data-tid="pdpFooter_contact"
        className={theme.PDPFooter_Contact}
        onClick={this.handleEmailClick}
      >
        Email Property
      </button>
    )
  }

  render() {
    const { theme } = this.props

    return (
      <footer data-tid="pdpFooter" className={theme.PDPFooter}>
        <div className={theme.PDPFooter_Info}>
          {this.renderInfo()}
        </div>
        <div className={theme.PDPFooter_CTA}>
          {this.renderPhone()}
          {this.renderEmail()}
        </div>
      </footer>
    )
  }
}

export default PDPFooter
