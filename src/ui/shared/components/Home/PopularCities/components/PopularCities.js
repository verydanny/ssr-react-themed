import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed'
import PopularLinks from '../../PopularLinks'

@themed(/^HomePopularCities/, { pure: true })
export default class PopularCities extends PureComponent {
  static propTypes = {
    content: PropTypes.shape({
      headline: PropTypes.string,
      subHeadline: PropTypes.string,
      apartmentsLinks: PropTypes.string,
      housesLinks: PropTypes.string,
    }),
    theme: PropTypes.object,
  }

  static defaultProps = {
    content: {},
    theme: {},
  }

  state = {
    parsedApartmentsLinks: null,
    parsedHousesLinks: null,
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      parsedApartmentsLinks: this.parseLinks(this.apartmentsRef),
      parsedHousesLinks: this.parseLinks(this.housesRef),
    })
  }

  get apartmentsLinks() {
    const { content } = this.props

    return this.renderLinksSection('apartmentsRef', content.apartmentsLinks)
  }

  get housesLinks() {
    const { content } = this.props

    return this.renderLinksSection('housesRef', content.housesLinks)
  }

  parseLinks(ref) {
    if (!ref) return null

    const elements = ref.querySelectorAll('a')

    return Array.from(elements).map(anchor => ({
      url: anchor.href,
      displayName: anchor.textContent,
    }))
  }

  renderLinksSection(id, html) {
    /* eslint-disable react/no-danger */
    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        ref={ref => { this[id] = ref }}
      />
    )
  }

  renderLinks(heading, links) {
    const { theme } = this.props

    return (
      <div className={theme.HomePopularCities_Section}>
        <h4>{heading}</h4>
        {links}
      </div>
    )
  }

  render() {
    const { content, theme } = this.props
    const {
      headline,
      subHeadline,
      apartmentsLinks,
      housesLinks,
    } = content
    const { parsedApartmentsLinks, parsedHousesLinks } = this.state

    if (!headline || !apartmentsLinks || !housesLinks) return null

    if (parsedApartmentsLinks || parsedHousesLinks) {
      return (
        <PopularLinks
          headline={headline}
          subHeadline={subHeadline}
          apartmentsLinks={parsedApartmentsLinks}
          housesLinks={parsedHousesLinks}
          tagSection="popular_cities"
          testId="home-popular-cities"
        />
      )
    }

    // This needs to rendered as raw HTML, once server-side (for SEO) and once
    // client-side so we can parse the links and transform into our current design.
    return (
      <div
        className={theme.HomePopularCities}
        data-tid="home-popular-cities"
        data-tag_section="popular_cities"
      >
        <h2>{headline}</h2>
        {subHeadline && <h3>{subHeadline}</h3>}
        {this.renderLinks('Apartments', this.apartmentsLinks)}
        {this.renderLinks('Houses', this.housesLinks)}
      </div>
    )
  }
}
