import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PopularLinks from '../../PopularLinks'
import { linksType } from '../../const'

export default class NearbyAreas extends PureComponent {
  static propTypes = {
    content: PropTypes.shape({
      headline: PropTypes.string,
      subHeadline: PropTypes.string,
      apartmentsLinks: linksType,
      housesLinks: linksType,
    }),
  }

  render() {
    const {
      headline,
      subHeadline,
      apartmentsLinks,
      housesLinks,
    } = this.props.content

    return (
      <PopularLinks
        headline={headline}
        subHeadline={subHeadline}
        apartmentsLinks={apartmentsLinks}
        housesLinks={housesLinks}
        tagSection="nearby_areas"
        testId="home-nearby-areas"
      />
    )
  }
}
