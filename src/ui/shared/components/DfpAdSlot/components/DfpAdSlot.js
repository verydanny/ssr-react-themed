import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { AdSlot, DFPManager } from 'react-dfp'
import themed from 'react-themed-too'
import cn from 'classnames'
import DfpAds from 'config/dfpAds'
import { stateAbbreviation } from 'lib/geo/states'

@themed(/^Dfp/)

export default class DfpAdSlot extends PureComponent {
  static propTypes = {
    adKey: PropTypes.string.isRequired,
    customTargeting: PropTypes.object,
    doNotRefresh: PropTypes.bool,
    onSlotRender: PropTypes.func,
    className: PropTypes.string,
    city: PropTypes.object,
    state: PropTypes.object,
    zip: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    targetCode: PropTypes.string,
    tid: PropTypes.string,
    theme: PropTypes.object,
    bypass: PropTypes.bool,
  }

  static defaultProps = {
    customTargeting: null,
    doNotRefresh: false,
    bypass: false,
    city: {},
    state: {},
    theme: {},
  }

  static contextTypes = {
    dfp: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = { ready: false, mounted: false }
  }

  componentDidMount() {
    if (!this.props.bypass) DFPManager.load()

    this.updateMountState()
  }

  get mappings() {
    const { city, state, zip, lat, lng, targetCode } = this.props

    return {
      city: city.name,
      state: stateAbbreviation(state.name),
      zip,
      latitude: lat,
      longitude: lng,
      targetCode,
    }
  }

  get slotRenderCallback() {
    const { onSlotRender, adKey } = this.props
    const { setDisplayReady } = this.context.dfp || {}

    return (gpt = { event: {} }) => {
      // googletag fires slot render event even if ad is empty,
      // so explicit check is needed here
      if (!gpt.event.isEmpty) {
        this.setState({ ready: true })
        if (onSlotRender) onSlotRender(adKey)
        if (setDisplayReady) setDisplayReady()
      }
    }
  }

  get ads() {
    return DfpAds.ads || {}
  }

  get isDisabled() {
    return DfpAds.isDisabled()
  }

  get baseTargeting() {
    const baseObj = {}
    const { adKey } = this.props
    const { targets = [] } = this.ads[adKey]

    if (targets.length) {
      targets.forEach(key => {
        baseObj[key] = this.mappings[key]
      })
    }

    return baseObj
  }

  get targetingArguments() {
    const tArgs = this.filterObject({
      ...this.baseTargeting,
      ...this.props.customTargeting,
    })

    return Object.keys(tArgs).length ? tArgs : null
  }

  updateMountState() {
    this.setState({ mounted: true })
  }

  filterObject(obj) {
    const filtered = Object.assign({}, obj)
    Object.keys(filtered).forEach(key => {
      const val = filtered[key]

      if (val === null || val === undefined) {
        delete filtered[key]
      }
    })
    return filtered
  }

  render() {
    const { adKey, doNotRefresh, className, theme, tid, bypass } = this.props

    if (!this.ads[adKey]) return null

    const { sizes, network, adUnit, mute } = this.ads[adKey]

    if (!this.state.mounted || mute || this.isDisabled || bypass) return null
    return (
      <div
        className={cn({
          [theme.Dfp]: true,
          [theme['Dfp-centered']]: true,
          [theme['Dfp-ready']]: this.state.ready,
          [className]: className,
        })}
        data-tid={tid}
        id={adKey}
      >
        <AdSlot
          sizes={sizes}
          dfpNetworkId={network}
          adUnit={adUnit}
          shouldRefresh={() => !doNotRefresh}
          targetingArguments={this.targetingArguments}
          onSlotRender={this.slotRenderCallback}
        />
      </div>
    )
  }
}
