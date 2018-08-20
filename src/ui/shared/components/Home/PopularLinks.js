import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import { Collapsible } from '@rentpath/react-ui-core'
import { linksType } from './const'

const NUM_INITIAL_VISIBLE_LINKS = 4

@themed(/^HomePopularLinks/, { pure: true })
export default class HomePopularLinks extends PureComponent {
  static propTypes = {
    headline: PropTypes.string,
    subHeadline: PropTypes.string,
    apartmentsLinks: linksType,
    housesLinks: linksType,
    initialVisibleLinks: PropTypes.number,
    tagSection: PropTypes.string,
    testId: PropTypes.string,
    theme: PropTypes.object,
  }

  static defaultProps = {
    initialVisibleLinks: NUM_INITIAL_VISIBLE_LINKS,
    theme: {},
  }

  state = {
    parsedApartmentsLinks: null,
    parsedHousesLinks: null,
  }

  listToLinks(col1, col2, tag) {
    const { testId, theme } = this.props

    if (!col1 || !col2 || !col1.length || !col2.length) return null

    const renderLink = (link, index) => (
      <a href={link.url} key={`link_${index}`} data-tag_item={`${tag}_link`}>
        {link.displayName}
      </a>
    )

    return (
      <div
        className={theme.HomePopularLinks_Links}
        data-tid={`${testId}-${tag}`}
      >
        <div className={theme.HomePopularLinks_LinksColumn}>
          {col1.map(renderLink)}
        </div>
        <div className={theme.HomePopularLinks_LinksColumn}>
          {col2.map(renderLink)}
        </div>
      </div>
    )
  }

  linksToColumns(links) {
    if (!links || !Array.isArray(links) || !links.length) return null

    const midPoint = Math.ceil(links.length / 2)

    return {
      left: links.slice(0, midPoint),
      right: links.slice(midPoint),
    }
  }

  renderLinksSection(links, tag) {
    const { initialVisibleLinks, theme } = this.props

    if (!links || !links.left || !links.right) return null

    const { left, right } = links

    const col1show = left.slice(0, initialVisibleLinks)
    const col1hide = left.slice(initialVisibleLinks)
    const col2show = right.slice(0, initialVisibleLinks)
    const col2hide = right.slice(initialVisibleLinks)
    const showLinks = this.listToLinks(col1show, col2show, tag)
    const hideLinks = this.listToLinks(col1hide, col2hide, tag)

    const viewButton = (text, tagItem) => (
      <span data-tag_item={tagItem} className={theme.HomePopularLinks_Button}>{text}</span>
    )

    return (
      <Collapsible
        className={theme.HomePopularLinks_Collapsible}
        showableItems={showLinks}
        nonshowableItems={hideLinks}
        hiddenText={viewButton('View More +', `view_more_${tag}`)}
        visibleText={viewButton('Show Less')}
      />
    )
  }

  renderLinks(heading, tag, links) {
    const { theme } = this.props
    const columnizedLinks = this.linksToColumns(links)

    return (
      <div className={theme.HomePopularLinks_Section}>
        <h4>{heading}</h4>
        {this.renderLinksSection(columnizedLinks, tag)}
      </div>
    )
  }

  renderApartmentsLinks() {
    return this.renderLinks('Apartments', 'apartments', this.props.apartmentsLinks)
  }

  renderHousesLinks() {
    return this.renderLinks('Houses', 'houses', this.props.housesLinks)
  }

  render() {
    const {
      headline,
      subHeadline,
      apartmentsLinks,
      housesLinks,
      tagSection,
      testId,
      theme,
    } = this.props

    const requiredContentAvailable = (
      headline &&
      apartmentsLinks &&
      apartmentsLinks.length &&
      housesLinks &&
      housesLinks.length
    )

    if (!requiredContentAvailable) {
      return null
    }

    return (
      <div
        className={theme.HomePopularLinks}
        data-tid={testId}
        data-tag_section={tagSection}
      >
        <h2>{headline}</h2>
        {subHeadline && <h3>{subHeadline}</h3>}
        {this.renderApartmentsLinks()}
        {this.renderHousesLinks()}
      </div>
    )
  }
}
