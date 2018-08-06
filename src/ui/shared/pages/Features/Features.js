import env from 'config/env'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Cookies, withCookies } from 'react-cookie'
import PropTypes, { instanceOf } from 'prop-types'
import pipe from 'lodash/fp/pipe'
import {
  optimizelyExperiments,
  featureFlips,
} from 'config/experimentVariations'
import {
  runningExperiments as runningExperimentsSelector,
  activeFeatures as activeFeaturesSelector,
} from 'app/selectors/experiments'
import {
  setAdaptive,
  removeAdaptive,
  addFeaturesItems,
  removeFeatureItems,
  removeAllFeatures,
  setOptimizelyTestProfile,
  getOptimizelyTestProfile,
} from 'lib/cookies/cookieManager'
import autobind from 'autobind-decorator'
import theme from './Features.css'

const envDatafileUrl = env.APPLICATIONS_RENT_OPTIMIZELY_DATAFILE
const appEnv = env.APPLICATION_ENVIRONMENT
const isStagingDefault = envDatafileUrl.includes('9999604330')

// if adding a new experiment variation toggle,
// simply add it to config/experimentVariations

class Features extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    runningExperiments: PropTypes.array,
  }

  constructor(props) {
    super(props)

    this.state = {
      adaptive: true,
      features: {},
      profileName: null,
      showOverlay: true,
    }
  }

  componentDidMount() {
    // reset all inputs, including on back button
    /* eslint-disable no-param-reassign */
    this.deselectAll()
    this.fullStackProfileName()
    this.toggleOverlay()
    this.profileWasReset()
  }

  get stagingDatafileOption() {
    const { profileName } = this.state

    if (!isStagingDefault || profileName !== 'Staging') {
      return (
        <a href="/_features" onClick={this.useStagingDatafile}>Use [Staging Profile] on this Server</a>
      )
    }
    return null
  }

  get optimizelyFullStackExperiments() {
    const { runningExperiments } = this.props
    const { profileName } = this.state

    const experimentList = runningExperiments.map((experiment, index) => {
      const experimentName = experiment.experiment.name
      return (<li key={`${experimentName}-${index}`}>
        <b>{`${experiment.variation.name}`}</b> {`(${experimentName})`}
      </li>)
    })

    return (
      <div className={theme.FullStackGroup}>
        <span className={theme.Header}>
          Optimizely FullStack Profile: <b>{profileName}</b>
        </span>
        {experimentList.length !== 0 &&
          <span className={theme.Subheader}>
            These are the Optimizely FullStack experiments and
            <br /> variations this browser has been sampled in to.
          </span>
        }
        {experimentList.length === 0 &&
          <span className={theme.Subheader}>
            This browser is not being sampled into any
            experiments/variations. FullStack may be disabled.
          </span>
        }
        <ol className={theme.FullStackList}>
          {experimentList}
        </ol>
        <hr />
        { appEnv !== 'production' &&
          <div>
            { this.getOptimizelyTestProfileCookie === 'STAGING-DATAFILE' || profileName === 'Staging'
              ? <a href="/_features" onClick={this.disableStagingProfile}>Use [Default Profile] on this Server</a>
              : this.stagingDatafileOption
            }
          </div>
        }
        <hr />
        { this.getOptimizelyTestProfileCookie === 'NO-EXPERIMENT'
          ? <a href="/_features" onClick={this.resetDatafile}>[Enable] FullStack on this Browser</a>
          : <a href="/_features" onClick={this.disableFullStack}>[Disable] FullStack on this Browser</a>
        }
      </div>
    )
  }

  get optimizeExperimentToggles() {
    const experiments = Object.entries(optimizelyExperiments)
    const toggles = []

    experiments.forEach(
      ([experimentName, variations]) => {
        if (variations && variations.length) {
          toggles.push(
            <fieldset key={experimentName}>
              <legend>{experimentName}</legend>
              {variations.map(variation => this.labeledToggle(variation, experimentName))}
            </fieldset>
          )
        }
      }
    )
    return toggles
  }

  get featureFlipToggles() {
    const flips = Object.entries(featureFlips)
    const toggles = []

    flips.forEach(
      ([name, setting]) => toggles.push(this.labeledToggle(name, setting))
    )
    return toggles
  }

  get adaptiveMessage() {
    const { adaptive } = this.state
    const { cookies } = this.props

    if (adaptive) {
      setAdaptive('adaptive')(cookies)
      return (
        <div className={theme.AdaptiveMessage}>
          <span className={theme.Subheader}>{'Adaptive Mode'} <b>Enabled</b>. | <a href="#" onClick={this.disableAdaptive}>Disable it.</a></span>
        </div>
      )
    }
    return (
      <div className={theme.AdaptiveMessage}>
        <span className={theme.Subheader}>{'Adaptive Mode'} <b>Disabled</b>. | <a href="/_features">Enable it.</a></span>
      </div>
    )
  }

  get getOptimizelyTestProfileCookie() {
    const { cookies } = this.props
    return getOptimizelyTestProfile()(cookies)
  }

  @autobind
  disableFullStack() {
    const { cookies } = this.props
    setOptimizelyTestProfile('NO-EXPERIMENT')(cookies)
  }

  @autobind
  resetDatafile() {
    const { cookies } = this.props
    setOptimizelyTestProfile('RESET-DEFAULT-DATAFILE')(cookies)
  }

  @autobind
  profileWasReset() {
    const { cookies } = this.props

    if (this.getOptimizelyTestProfileCookie === 'RESET-DEFAULT-DATAFILE') {
      setOptimizelyTestProfile('')(cookies)
    }
  }

  @autobind
  useStagingDatafile() {
    const { cookies } = this.props
    setOptimizelyTestProfile('STAGING-DATAFILE')(cookies)
  }

  @autobind
  disableStagingProfile() {
    this.resetDatafile()
  }

  @autobind
  toggleOverlay() {
    this.setState(prevState => (
      { showOverlay: !prevState.showOverlay }
    ))
  }

  @autobind
  deselectAll() {
    const { cookies } = this.props
    // clear featureFlips cookie
    removeAllFeatures()(cookies)
    // untoggle all inputs
    Array.from(document.querySelectorAll('input')).forEach(input => { input.checked = false })
  }

  fullStackProfileName() {
    if (window === undefined) return false

    let profileName = null

    switch (
      window.__APPLICATION_CONTEXT__ &&
      window.__APPLICATION_CONTEXT__.activeExperiments.projectId) {
      case '9999604330':
        profileName = 'Staging'
        break
      case '10238401069':
        profileName = 'Dev'
        break
      case '10130860020':
        profileName = 'Production'
        break
      default:
        profileName = 'Unknown'
    }

    return this.setState({
      profileName,
    })
  }

  labeledToggle(key, value) {
    return (
      <label key={key} htmlFor={key} className={theme.Toggles}>
        <input
          type={typeof value === 'boolean' ? 'checkbox' : 'radio'}
          id={key}
          value={key}
          onChange={this.handleFeatureToggle}
          name={typeof value === 'boolean' ? null : value}
        /><b>{key}</b>
      </label>
    )
  }

  @autobind
  disableAdaptive(e) {
    const { cookies } = this.props
    removeAdaptive()(cookies)
    this.setState({ adaptive: false })
    e.preventDefault()
  }

  handleCookieChange(name, toggle) {
    const { cookies } = this.props

    if (toggle) {
      addFeaturesItems()(cookies)(name)
    } else {
      removeFeatureItems()(cookies)(name)
    }
  }

  @autobind
  handleFeatureToggle(e) {
    const { value, checked, type, name } = e.currentTarget
    const { features } = this.state

    if (type === 'radio') {
      const toAssign = {}
      const radioGroup = Array.from(document.querySelectorAll(`input[name=${name}]`))

      radioGroup.forEach(input => {
        toAssign[input.value] = input.checked
        this.handleCookieChange(input.value, input.checked)
      })

      this.setState({
        features: Object.assign(features, toAssign),
      })
    } else {
      this.setState({
        features: Object.assign(features, { [value]: checked }),
      })
      this.handleCookieChange(value, checked)
    }
  }

  render() {
    const { showOverlay } = this.state
    return (
      <div className={theme.Features}>
        { showOverlay && <div className={theme.Overlay} /> }
        <p>You are currently on <b>{appEnv}</b> environment.</p>
        <form>
          <p className={theme.Header}>Toggle Experiments</p>
          <span className={theme.Subheader}>
            Test your variations on this browser. <a href="#" onClick={this.deselectAll}>Clear All</a>
          </span>
          {this.optimizeExperimentToggles}
          <fieldset>
            <legend>Feature Flips</legend>
            {this.featureFlipToggles}
          </fieldset>
        </form>
        {this.optimizelyFullStackExperiments}
        <div className={theme.Footer}>
          {this.adaptiveMessage}
          <a className={theme.GoToSearch} href="/">Continue to Home</a>
          <a className={theme.GoToSearch} href="/georgia/atlanta-apartments">Continue to SRP</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeFeatures: activeFeaturesSelector(state),
  runningExperiments: runningExperimentsSelector(state),
})

export default pipe(withCookies, connect(mapStateToProps, {}))(Features)
