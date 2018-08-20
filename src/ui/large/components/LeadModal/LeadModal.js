import React, { Component, Fragment } from 'react'
import PropTypes, { instanceOf } from 'prop-types'
import autobind from 'autobind-decorator'
import { Tagging } from '@rentpath/react-ui-tracking'
import { themed } from 'react-themed-too'
import { LeadModal as LeadModalUI } from '@rentpath/react-ui-rent'
import { Cookies } from 'react-cookie'
import { getLeadData } from 'lib/cookies/leadCookie'
import isoToLocaleDate from 'lib/utils/isoToLocaleDate'
import internalCookieBasedFields from 'lib/lead/cookieBasedFields'
import get from 'lodash/fp/get'
import camelCase from 'lodash/camelCase'
import formatPhone from 'lib/utils/formatPhone'
import { Icon } from 'ui/shared/components/Icon'
import { close } from 'ui/shared/components/Icon/svgs/global'
import Spinner from 'ui/shared/components/Spinner'
import { desktopRevenueMultiplier } from 'lib/lead/revenue'
import {
  ValidatedName,
  ValidatedEmail,
  ValidatedPhone,
  ValidatedMoveInDate,
} from './fields'

const DEFAULT_FIELD_VALUES = {
  message: '',
  name: '',
  email: '',
  phone: '',
  opt_in_newsletter: 0,
}

@themed('*')
export default class LeadModal extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    isOpen: PropTypes.bool,
    leadData: PropTypes.object.isRequired,
    listingId: PropTypes.string.isRequired,
    listHubId: PropTypes.string,
    endecaId: PropTypes.string,
    desktopPhone: PropTypes.string,
    isPaid: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    propertyLabel: PropTypes.string.isRequired,
    revenue: PropTypes.string,
    submitLead: PropTypes.func,
    submitLeadSuccess: PropTypes.func,
    submitLeadFailure: PropTypes.func,
    theme: PropTypes.object,
    tagSection: PropTypes.string,
    tplSource: PropTypes.string,
    isCountryUS: PropTypes.bool,
  }

  static defaultProps = {
    theme: {},
    tagSection: 'lead_submission_form',
    isCountryUS: false,
  }

  constructor(props) {
    super(props)

    const { cookies, isCountryUS } = this.props

    const cookieData = getLeadData(cookies)

    const optInNewsletter = isCountryUS ? 1 : 0

    this.state = {
      isFetching: false,
      fieldStatus: {},
      leadData: {
        ...DEFAULT_FIELD_VALUES,
        opt_in_newsletter: optInNewsletter,
        ...cookieData,
      },
    }
  }

  get desktopRevenue() {
    return desktopRevenueMultiplier(
      this.props.revenue,
      this.cookieBasedFields.campaignId
    )
  }

  get header() {
    const { theme, desktopPhone, isPaid } = this.props

    const phoneStr = this._phone || (this._phone = formatPhone(desktopPhone))
    const phone = phoneStr && isPaid ?
      (<a
        href={`tel:${phoneStr}`}
        className={theme.Modal_Header}
        data-tag_item="phone_number_link"
        data-tid="lead_form_phone_header"
      >
        {phoneStr}
      </a>)
      : null
    return (
      <span data-tid="contact-property-text">Contact Property {phone}</span>
    )
  }

  get subHeader() {
    const {
      propertyLabel,
      theme,
    } = this.props

    return (
      <span data-tid="to-text">
        To:{' '}
        <span className={theme.Modal_SubHeader_PropertyTitle} data-tid="lead-form-listing-name">
          {propertyLabel}
        </span>
      </span>
    )
  }

  get cookieBasedFields() {
    const { cookies, endecaId } = this.props
    return internalCookieBasedFields(cookies, endecaId)
  }

  get messagePlaceholder() {
    const {
      propertyLabel,
    } = this.props

    return [
      `Hello, I'm interested in ${propertyLabel}.`,
      'Please send me current availability and additional details.',
      'Thanks!',
    ].join(' ')
  }

  get submitContent() {
    const { theme } = this.props

    if (this.state.isFetching) {
      return <Spinner className={theme.Spinner} />
    }

    return 'Send'
  }

  get leadFields() {
    const { theme, isCountryUS } = this.props
    const { fieldStatus, leadData } = this.state

    const allFields = [
      {
        name: 'message',
        'data-tag_item': 'text',
        placeholder: this.messagePlaceholder,
        value: leadData.message,
        onChange: this.handleInputChange,
      },
      {
        name: 'name',
        field: ValidatedName,
        'data-tag_item': 'name',
        autoComplete: 'name',
        value: leadData.name,
        onChange: this.handleInputChange,
        ...fieldStatus.name,
      },
      {
        name: 'email',
        field: ValidatedEmail,
        'data-tag_item': 'email',
        autoComplete: 'email',
        value: leadData.email,
        onChange: this.handleInputChange,
        ...fieldStatus.email,
      },
      {
        name: 'phone',
        field: ValidatedPhone,
        placeholder: 'Phone (optional)',
        'data-tag_item': 'phone_number',
        autoComplete: 'tel-national',
        value: leadData.phone,
        onChange: this.handleInputChange,
        ...fieldStatus.phone,
      },
      {
        name: 'move_date',
        field: ValidatedMoveInDate,
        'data-tag_item': 'move_in_date',
        defaultValue: isoToLocaleDate(leadData.move_date),
        ...fieldStatus.moveDate,
      },
      {
        name: 'submit',
        'data-tag_item': 'send_button',
        children: this.submitContent,
        className: theme.ButtonRaised,
      },
      {
        name: 'opt_in_newsletter',
        'data-tag_item': 'checkbox',
        checked: leadData.opt_in_newsletter,
        onChange: this.handleInputChange,
        className: theme.LeadForm_Checkbox,
      },
      { name: 'terms_of_service' },
    ]

    return allFields.filter(field => !(field.name === 'opt_in_newsletter' && isCountryUS))
  }

  @autobind
  setFieldStatus(apiErrors) {
    if (!apiErrors || !apiErrors.length) return

    const checkFields = {
      name: 'Name',
      email: 'Email address',
      phone: 'Phone number',
      moveDate: 'Move in date',
    }

    /* eslint-disable no-param-reassign */
    const fieldStatus = apiErrors.reduce((accum, error) => {
      if (error && error.name && error.message) {
        accum[error.name] = {
          validation: 'invalid',
          validationMessage: `${checkFields[error.name]} ${error.message}`,
        }
      }
      return accum
    }, {})
    /* eslint-enable no-param-reassign */

    Object.keys(checkFields).forEach(input => {
      if (!fieldStatus[input]) {
        fieldStatus[input] = { validation: 'valid' }
      }
    })

    this.setState({ fieldStatus })
  }

  @autobind
  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({
      leadData: {
        ...this.state.leadData,
        [target.name]: value,
      },
    })
  }

  @autobind
  closeButton({ onClick }) {
    const { theme } = this.props

    return (
      <div
        className={theme.CloseButton}
        onClick={onClick}
        role="button"
        tabIndex={0}
        data-tag_item="x"
      >
        <Icon svgs={{ close }} />
      </div>
    )
  }

  @autobind
  submitLeadResult(result) {
    this.setState({ isFetching: false })

    const errors = get('data.lead.errors')(result)
    const status = get('data.lead.status')(result)

    const {
      submitLeadSuccess,
      submitLeadFailure,
    } = this.props

    switch (status) {
      case 'FIELD_ERROR':
        this.trackLead(
          'error', {
            selection: 'validation',
            validation_error: errors.map(error => error.name),
          }
        )
        this.setFieldStatus(errors)
        break
      case 'ACCEPTED':
        if (submitLeadSuccess) submitLeadSuccess(this.props.listingId)
        this.trackLead(
          'lead_submission', {
            selection: 'email',
            revenue: this.desktopRevenue,
          }
        )
        break
      case 'FAILED':
        if (submitLeadFailure) submitLeadFailure(this.props.listingId)
        break
      default:
        // TODO: Need a generic error message for API failure
    }
  }

  @autobind
  submitLeadError() {
    this.setState({ isFetching: false })
    // TODO: Need a generic error message for connection failure
  }

  trackLead(action, data) {
    window.eventTracker.track(action, data)
  }

  @autobind
  submitLead(event, formData) {
    const {
      leadData,
      listingId,
      endecaId,
      submitLead,
      tplSource,
      isCountryUS,
    } = this.props

    if (this.state.isFetching) return

    const optInNewsletter = isCountryUS || formData.opt_in_newsletter === 'on'

    const mergedData = {
      ...formData,
      message: formData.message || this.messagePlaceholder,
      opt_in_newsletter: optInNewsletter,
      move_date: formData.move_date,
      endecaId,
      listingId,
      tplSource,
      ...this.cookieBasedFields,
      ...leadData,
    }

    const variables = Object.keys(mergedData)
      .filter(k => mergedData[k] !== null)
      .reduce((acc, key) => {
        acc[camelCase(key)] = mergedData[key]
        return acc
      }, {})

    const promise = { resolve: this.submitLeadResult, reject: this.submitLeadError }

    this.setState({ isFetching: true, fieldStatus: {} })
    submitLead(variables, promise)
  }

  render() {
    const {
      isOpen,
      onClose,
      theme,
      listingId,
      listHubId,
      tagSection,
      tplSource,
    } = this.props

    return (
      <Fragment>
        <Tagging
          key="lead_tagging"
          listing_id={listingId}
          listhub_id={listHubId}
          section={tagSection}
          tpl_source={tplSource}
        />
        <div
          className={theme.LeadModal}
        >
          <LeadModalUI
            data-tag_section={tagSection}
            CloseButton={this.closeButton}
            fields={this.leadFields}
            header={this.header}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={this.submitLead}
            serialize
            subHeader={this.subHeader}
          />
        </div>
      </Fragment>
    )
  }
}
