import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class GeoCircle extends PureComponent {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    radius: PropTypes.number,
  }

  render() {
    const {
      lat, lng, radius,
    } = this.props

    return (
      <div itemProp="circle" itemScope itemType="http://schema.org/GeoCircle">
        <div itemProp="geoMidpoint" itemScope itemType="http://schema.org/GeoCoordinates">
          <meta itemProp="latitude" content={lat} />
          <meta itemProp="longitude" content={lng} />
        </div>
        <meta itemProp="geoRadius" content={radius} />
      </div>
    )
  }
}
