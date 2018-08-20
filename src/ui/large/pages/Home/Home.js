import React, { PureComponent } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { PageView } from '@rentpath/react-ui-tracking'
import { HomeHeader } from 'ui/large/components/Header'
import { container as SearchInput } from 'ui/shared/components/SearchInput'
import Footer from 'ui/shared/components/Footer'
import Layout from 'ui/large/components/Layout'
import theme from 'ui/large/themes/pages/homeBundle'
import PropertyTypeTabs from 'ui/shared/components/PropertyTypeTabs'
import { PopularCities, NearbyAreas } from 'ui/shared/components/Home'
import { ThemeProvider } from 'react-themed-too'
import { HomeSections } from 'ui/shared/components/HomeSections'
import { DfpAdSlot } from 'ui/shared/components/DfpAdSlot'
import { LARGE_HOMEPAGE_BOTTOM_AD_KEY } from 'config/dfpAds'

const DEFAULT_HEADLINE = 'A Home for Every Renter'
const DEFAULT_SUBHEADLINE = 'There\'s no such thing as one home fits all. Are you looking for something particular in your next rental?'
const DEFAULT_SEARCHBAR_HEADLINE = 'There are millions of homes out there. Let\'s find the one that\'s perfect for you.'

export default class Home extends PureComponent {

  static propTypes = {
    activeFeatures: PropTypes.array,
    headline: PropTypes.string,
    subHeadline: PropTypes.string,
    searchbarHeadline: PropTypes.string,
  }

  static defaultProps = {
    headline: DEFAULT_HEADLINE,
    subHeadline: DEFAULT_SUBHEADLINE,
    searchbarHeadline: DEFAULT_SEARCHBAR_HEADLINE,
  }

  constructor(props) {
    super(props)
    const allFirst = props.activeFeatures.includes('HME_v1_Apartments_First')
    const refinement = !allFirst ? 'apartments_condos_houses_townhouses' : 'apartments'
    this.state = { refinement, allFirst }
  }

  @autobind
  onSearchEnter() {
    if (window.eventTracker) {
      window.eventTracker.track('enter', {
        item: 'search_location_name',
        section: 'search_input',
      })
    }
  }

  @autobind
  onTabSelect(refinement) {
    this.setState({ refinement })
  }

  render() {
    const {
      allFirst,
      refinement,
    } = this.state
    const {
      headline,
      subHeadline,
      searchbarHeadline,
    } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Layout
          HeaderComponent={HomeHeader}
        >
          <PageView />
          <div className={theme.Home_Content}>
            <div className={theme.Home_Top}>
              <h1>{searchbarHeadline || DEFAULT_SEARCHBAR_HEADLINE}</h1>
              <div className={theme.Home_Background}>
                <div className={theme.Home_Search}>
                  <PropertyTypeTabs
                    theme={theme}
                    onTabSelect={this.onTabSelect}
                    allFirst={!allFirst}
                  />
                  <SearchInput
                    className={theme.LocationInput_form_home}
                    locationInputClassName={theme.LocationInput_home}
                    theme={theme}
                    showBorder
                    onSearchEnter={this.onSearchEnter}
                    placeholder="Enter Location"
                    showSearch
                    refinement={refinement}
                    showError
                  />
                </div>
                <h2>{headline || DEFAULT_HEADLINE}</h2>
                <h3>{subHeadline || DEFAULT_SUBHEADLINE}</h3>
              </div>
            </div>
            <HomeSections />
            <PopularCities />
            <NearbyAreas />
            <Footer />
            <DfpAdSlot
              adKey={LARGE_HOMEPAGE_BOTTOM_AD_KEY}
              tid="homepage-bottom-ad"
              className={theme.Homepage_Bottom_Ad}
            />
          </div>
        </Layout>
      </ThemeProvider>
    )
  }
}
