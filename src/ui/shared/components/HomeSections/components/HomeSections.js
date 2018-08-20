import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import autobind from 'autobind-decorator'

@themed(/^HomeSections/, { pure: true })
export default class HomeSections extends PureComponent {
  static propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
      headline: PropTypes.string.isRequired,
      body: PropTypes.string,
      links: PropTypes.string.isRequired,
    })),
    searchTerm: PropTypes.string,
    petFriendlyLink: PropTypes.string,
    studioLink: PropTypes.string,
    oneBedLink: PropTypes.string,
    twoBedLink: PropTypes.string,
    threeBedLink: PropTypes.string,
    cheapLink: PropTypes.string,
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  @autobind
  firstTimeLinks() {
    const { searchTerm, studioLink, oneBedLink } = this.props

    if (!searchTerm || !studioLink || !oneBedLink) {
      return null
    }

    return [
      <a href={studioLink}>Find Studio Apartments in {searchTerm}</a>,
      <a href={oneBedLink}>Find 1 Bedroom Apartments in {searchTerm}</a>,
    ]
  }

  @autobind
  petOwnerLinks() {
    const { searchTerm, petFriendlyLink } = this.props

    if (searchTerm && petFriendlyLink) {
      return [
        <a href={petFriendlyLink}>Find Pet Friendly Apartments in {searchTerm}</a>,
      ]
    }

    return [
      <a href="/pet-friendly-apartments">Find Pet Friendly Apartments</a>,
    ]
  }

  @autobind
  studentLinks() {
    const { searchTerm, twoBedLink, threeBedLink } = this.props

    if (searchTerm && twoBedLink && threeBedLink) {
      return [
        <a href={twoBedLink}>Find 2 Bedroom Apartments in {searchTerm}</a>,
        <a href={threeBedLink}>Find 3 Bedroom Apartments in {searchTerm}</a>,
      ]
    }

    return [
      <a href="/off-campus-housing">Off Campus Housing</a>,
    ]
  }

  @autobind
  budgetLinks() {
    const { searchTerm, cheapLink } = this.props

    if (searchTerm && cheapLink) {
      return [
        <a href={cheapLink}>Find Cheap Apartments in {searchTerm}</a>,
      ]
    }

    return [
      <a href="/cheap-apartments-for-rent">Find Cheap Apartments</a>,
    ]
  }

  dynamicLinks(section) {
    const { theme } = this.props
    // These indices are hardcoded to correspond to specific sections of the SEO Fusion content.
    const linksFn = {
      0: this.firstTimeLinks,
      2: this.petOwnerLinks,
      3: this.studentLinks,
      4: this.budgetLinks,
    }
    const links = linksFn[section] ? linksFn[section]() : null

    if (!links) return null

    return (
      <ul className={theme.HomeSections_SectionDynamicLinks}>
        {links.map((link, index) => <li key={`link_${index}`}>{link}</li>)}
      </ul>
    )
  }

  renderSections() {
    const { sections, theme } = this.props

    /* eslint-disable react/no-danger */
    return sections.map(({ headline, body, links }, index) => (
      <div
        className={theme.HomeSections_Section}
        key={`HomeSection_${index}`}
        data-tid={`home-section-${index}`}
      >
        <h2>{headline}</h2>
        <p className={theme.HomeSections_SectionBody}>{body}</p>
        {this.dynamicLinks(index)}
        <div
          className={theme.HomeSections_SectionLinks}
          dangerouslySetInnerHTML={{ __html: links }}
        />
      </div>
    ))
  }

  render() {
    const { sections, theme } = this.props

    if (!sections || !sections.length) return null

    return (
      <div
        className={theme.HomeSections}
        data-tid="home-sections-container"
      >
        {this.renderSections()}
      </div>
    )
  }
}
