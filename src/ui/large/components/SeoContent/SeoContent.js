import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed'
import Nearby from 'ui/shared/components/SeoContent/Nearby'
import LocalInfo from 'ui/shared/components/SeoContent/LocalInfo'
import LinkList from 'ui/shared/components/SeoContent/LinkList'
import seoConfig from 'ui/large/config/seoConfig'
import { DfpAdSlot } from 'ui/shared/components/DfpAdSlot'
import { LARGE_SRP_BOTTOM_AD_KEY, LARGE_SRP_BOTTOM_AD2_KEY } from 'config/dfpAds'

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

@themed(/^(SeoContent|SeoLinkList)/)

export default class SeoContent extends PureComponent {

  static propTypes = {
    localInfoBody: PropTypes.string,
    propertyType: PropTypes.string,
    neighborhoods: linkListPropTypes,
    colleges: PropTypes.array,
    militaryBases: PropTypes.array,
    apartmentLinks: linkPropTypes,
    propertyTypeLinks: linkListPropTypes,
    cityLinks: linkListPropTypes,
    theme: PropTypes.object,
    shouldDisplayLocalInfo: PropTypes.bool,
    shouldDisplayNearbyColleges: PropTypes.bool,
  }

  static defaultProps = {
    theme: {},
    locationName: '',
  }

  render() {
    const {
      neighborhoods,
      colleges,
      militaryBases,
      apartmentLinks,
      propertyTypeLinks,
      cityLinks,
      theme,
      propertyType,
      localInfoBody,
      shouldDisplayLocalInfo,
      shouldDisplayNearbyColleges,
    } = this.props

    return (
      <div className={theme.SeoContent_Footer} >
        <div
          className={theme.SeoContent}
          data-tid="seo-content"
        >
          <div className={theme.SeoLinkList_Content}>
            { !!apartmentLinks.length &&
              <div className={theme.SeoLinkList_Content_Left} >
                <LinkList
                  links={apartmentLinks}
                  maxLinksShowing={seoConfig.propertyLinks.maxLinks}
                  collapsibleSection={false}
                  header="Apartment Options"
                  testId="apartment-options"
                />
              </div>
            }
            { !!propertyTypeLinks.links.length &&
              <div className={theme.SeoLinkList_Content_Right}>
                <LinkList
                  links={propertyTypeLinks.links}
                  maxLinksShowing={propertyTypeLinks.maxLinksShowing}
                  collapsibleSection={false}
                  header="Property Type"
                />
              </div>
            }
          </div>
          <DfpAdSlot
            adKey={LARGE_SRP_BOTTOM_AD_KEY}
            tid="srp-bottom-ad"
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
            maxLinks={cityLinks.maxLinksShowing}
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
              maxLinks={seoConfig.nearbyLinks.maxLinks}
              data={colleges}
            />
          }
          <Nearby
            header={`Find ${propertyType} Near Local Military Bases`}
            linkTagSection="local_info"
            linkTagItem="by_nearby_military"
            data={militaryBases}
          />
        </div>
        <DfpAdSlot
          adKey={LARGE_SRP_BOTTOM_AD2_KEY}
          tid="srp-bottom-ad2"
        />
      </div>
    )
  }
}
