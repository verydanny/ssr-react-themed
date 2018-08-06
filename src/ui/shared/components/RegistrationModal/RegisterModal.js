import React, { Component } from 'react'
import { themed } from 'react-themed'
import cn from 'classnames'
import autobind from 'autobind-decorator'
import { Modal } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import close from 'ui/shared/components/Icon/svgs/global/close.svg'
import PropTypes from 'prop-types'
import Spinner from 'ui/shared/components/Spinner'
import UserModalForm from 'ui/shared/components/UserModal/components/UserModalForm'
import OauthButtons from 'ui/shared/components/UserModal/components/OauthButtons'
import { FIELD_MAP } from './const'

@themed('*')
export default class RegisterModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    theme: PropTypes.object,
    isCountryUS: PropTypes.bool,
  }

  static defaultProps = {
    theme: {},
    isCountryUS: false,
  }

  constructor(props) {
    super(props)
    const { isCountryUS } = this.props
    this.state = {
      isFetching: false,
      fieldStatus: {}, // This will be used when validation is wired up
      rememberMe: true,
      optInNewsletter: isCountryUS,
    }
  }

  @autobind
  onSubmit() {
    /* TODO: should be wired up later and remove console  */
    console.log('This is the form data', this.state) // eslint-disable-line no-console
  }

  get header() {
    const { theme } = this.props
    return (
      <div>
        <div className={theme.RegisterModal_SignUpMessage}>
          Welcome, Sign Up For Free
        </div>
        <div>
          Creating an account allows you to acccess
          your saved and contacted properties on any device.
        </div>
      </div>
    )
  }

  /**
   * Finish this during the wire up story.
   * TODO
   * Error handling from API as validation is done via Zutron.
   * Wire up callback success and failure actions
   * Complete spinner
   */
  get submitContent() {
    const { theme } = this.props

    if (this.state.isFetching) {
      return <Spinner className={theme.Spinner} />
    }

    return 'Sign Up'
  }

  /**
   * TODO
   * Refactor first name and last name css to stack on smaller screens for mobile
   */
  get registrationFields() {
    const { theme, isCountryUS } = this.props
    const { fieldStatus, rememberMe, optInNewsletter } = this.state

    const allFields = [
      {
        name: 'firstName',
        type: 'text',
        modal: 'register',
        placeholder: 'First Name',
        'data-tag_item': 'firstName',
        autoComplete: 'given-name',
        onChange: this.handleInputChange,
        className: theme.RegisterModal_FirstName,
        ...fieldStatus.firstName,
      },
      {
        name: 'lastName',
        type: 'text',
        modal: 'register',
        placeholder: 'Last Name',
        'data-tag_item': 'lastName',
        autoComplete: 'family-name',
        onChange: this.handleInputChange,
        className: theme.RegisterModal_LastName,
        ...fieldStatus.lastName,
      },
      {
        name: 'email',
        placeholder: 'Email Address',
        modal: 'register',
        'data-tag_item': 'emailAddress',
        onChange: this.handleInputChange,
        autoComplete: 'email',
        className: theme.RegisterModal_Email,
        ...fieldStatus.email,
      },
      {
        name: 'password',
        type: 'password',
        modal: 'register',
        'data-tag_item': 'password',
        placeholder: 'Password',
        onChange: this.handleInputChange,
        autoComplete: 'off',
        ...fieldStatus.password,
      },
      {
        name: 'passwordConfirmation',
        type: 'password',
        modal: 'register',
        'data-tag_item': 'passwordConfirmation',
        placeholder: 'Confirm Password',
        onChange: this.handleInputChange,
        autoComplete: 'off',
      },
      {
        name: 'submit',
        modal: 'register',
        'data-tag_item': 'signup_button',
        children: this.submitContent,
        className: theme.ButtonRaised,
      },
      {
        name: 'rememberMe',
        type: 'checkbox',
        modal: 'register',
        'data-tag_item': 'checkbox',
        label: 'Keep me signed in',
        checked: rememberMe,
        onChange: this.handleInputChange,
        className: theme.RegisterModal_Checkbox,
      },
      {
        name: 'optInNewsletter',
        type: 'checkbox',
        modal: 'register',
        'data-tag_item': 'checkbox',
        label: 'Simplify my search with helpful tips and rental recommendations.',
        checked: optInNewsletter,
        onChange: this.handleInputChange,
        className: theme.RegisterModal_Checkbox,
      },
    ]

    return allFields.filter(field => !(field.name === 'optInNewsletter' && isCountryUS))
  }

  get footer() {
    const { theme } = this.props

    return (
      <div className={theme.RegisterModal_Footer}>
        <p>
          Already have an Acount?
        </p>
        <button
          className={cn(theme.RegisterModal_AccountLink, theme.RegisterModal_Button)}
        >
          Sign In
        </button>
      </div>
    )
  }

  @autobind
  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({ [target.name]: value })
  }

  @autobind
  closeButton({ onClick }) {
    const { theme } = this.props

    return (
      <button
        tabIndex={0}
        className={cn(theme.RegisterModal_CloseButton, theme.RegisterModal_Button)}
        onClick={onClick}
        data-tag_item="x"
        data-tid="sign-in-close"
      >
        <Icon svgs={{ close }} />
      </button>
    )
  }

  render() {
    const {
      isOpen,
      onClose,
      theme,
    } = this.props

    return (
      <div
        className={cn(theme.LeadModal, theme.RegisterModal)}
        data-tag_section="register-modal"
      >
        <Modal
          CloseButton={this.closeButton}
          isOpen={isOpen}
          onClose={onClose}
          data-tid="register-modal"
        >
          <div>
            {this.header}
            <OauthButtons />
            <hr className={theme.RegisterModal_Orline} />
            <UserModalForm
              fields={this.registrationFields}
              onSubmit={this.onSubmit}
              fieldMap={FIELD_MAP}
              displayName="RegisterModalForm"
            />
            {this.footer}
          </div>
        </Modal>
      </div>
    )
  }
}
