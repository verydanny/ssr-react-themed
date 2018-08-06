import React, { PureComponent } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { PageView } from '@rentpath/react-ui-tracking'
import { HomeHeader, Layout } from 'ui/small/components/Layout'
import { container as SearchInput } from 'ui/shared/components/SearchInput'
import Footer from 'ui/shared/components/Footer'
import theme from 'ui/small/themes/SmallTheme'
import PropertyTypeTabs from 'ui/shared/components/PropertyTypeTabs'
import { PopularCities, NearbyAreas } from 'ui/shared/components/Home'
import { HomeSections } from 'ui/shared/components/HomeSections'

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
      <Layout headerComponent={<HomeHeader />}>
        <PageView />
        <div className={theme.Home_Content}>
          <div className={theme.Home_Top} data-tid="home-text">
            <h1>{searchbarHeadline || DEFAULT_SEARCHBAR_HEADLINE}</h1>
            <div className={theme.Home_Search}>
              <PropertyTypeTabs
                theme={theme}
                onTabSelect={this.onTabSelect}
                allFirst={!allFirst}
              />
              <SearchInput
                className={theme.LocationInput_form_home}
                locationInputClassName={theme.LocationInput_home}
                onSearchEnter={this.onSearchEnter}
                refinement={refinement}
                showSearch
                theme={theme}
                placeholder="Enter Location"
                showError
              />
            </div>
            <div className={theme.Home_Background} />
            <h2>{headline || DEFAULT_HEADLINE}</h2>
            <h3>{subHeadline || DEFAULT_SUBHEADLINE}</h3>
          </div>
          <HomeSections />
          <PopularCities />
          <NearbyAreas />
          <div className={theme.Home_Footer}>
            <Footer withAccordionLinks />
          </div>
        </div>
      </Layout>
    )
  }
}
