import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import { DfpAdSlot } from 'ui/shared/components/DfpAdSlot'
import { SMALL_FOOTER_AD_KEY, SMALL_SEOCONTENT_AD_KEY } from 'config/dfpAds'

import Nearby from 'ui/shared/components/SeoContent/Nearby'
import LocalInfo from 'ui/shared/components/SeoContent/LocalInfo'
import LinkList from 'ui/shared/components/SeoContent/LinkList'

const linkPropTypes = PropTypes.arrayOf(PropTypes.shape({
  displayName: PropTypes.string.isRequired,
  tagItem: PropTypes.string,
  url: PropTypes.string.isRequired,
}))

// FIXME: Once SEO Priority Score features are removed, this code can be refactored and
// removed
const linkListPropTypes = PropTypes.shape({
  links: linkPropTypes,
  maxLinksShowing: PropTypes.number,
})

@themed(/^SeoContent/)

export default class SeoContent extends PureComponent {

  static propTypes = {
    localInfoBody: PropTypes.string,
    propertyType: PropTypes.string,
    neighborhoods: linkListPropTypes,
    colleges: PropTypes.array,
    militaryBases: PropTypes.array,
    apartmentLinks: linkListPropTypes,
    propertyTypeLinks: linkListPropTypes,
    cityLinks: linkListPropTypes,
    theme: PropTypes.object,
    locationName: PropTypes.string,
    shouldDisplayLocalInfo: PropTypes.bool,
    shouldDisplayNearbyColleges: PropTypes.bool,
    renderAd: PropTypes.func,
  }

  static defaultProps = {
    theme: {},
    locationName: '',
  }

  render() {
    const {
      apartmentLinks,
      localInfoBody,
      neighborhoods,
      colleges,
      militaryBases,
      propertyTypeLinks,
      locationName,
      theme,
      shouldDisplayLocalInfo,
      shouldDisplayNearbyColleges,
      renderAd,
      propertyType,
      cityLinks,
    } = this.props

    return (
      <div
        className={theme.SeoContent}
        data-tid="seo-content"
      >
        <LinkList header={`${locationName} Apartment Options`} {...apartmentLinks} />
        <LinkList links={propertyTypeLinks.links} header="Search by Property Type" />
        <DfpAdSlot
          adKey={SMALL_SEOCONTENT_AD_KEY}
          tid="ad-dfp-listview"
          onSlotRender={renderAd}
        />
        {
          shouldDisplayLocalInfo &&
          <LocalInfo
            body={localInfoBody}
          />
        }
        <Nearby
          header={`Find ${propertyType} in Nearby Cities`}
          linkTagSection="local_info"
          linkTagItem="by_nearby_cities"
          data={cityLinks.links}
        />
        <Nearby
          header={`Find ${propertyType} in Nearby Neighborhoods`}
          linkTagSection="local_info"
          linkTagItem="by_nearby_neighborhoods"
          data={neighborhoods.links}
        />
        {shouldDisplayNearbyColleges &&
          <Nearby
            header={`Find ${propertyType} Near Local Colleges`}
            linkTagSection="local_info"
            linkTagItem="by_nearby_colleges"
            maxLinks={10}
            data={colleges}
          />
        }
        <Nearby
          header={`Find ${propertyType} Near Local Military Bases`}
          linkTagSection="local_info"
          linkTagItem="by_nearby_military"
          data={militaryBases}
        />
        <DfpAdSlot
          key={`${SMALL_FOOTER_AD_KEY}`}
          adKey={SMALL_FOOTER_AD_KEY}
          tid="ad-bottom-list"
          onSlotRender={renderAd}
        />
      </div>
    )
  }
}
