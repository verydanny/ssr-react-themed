import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import {
  List,
  Collapsible,
} from '@rentpath/react-ui-core'
import CollapsibleSection from './../CollapsibleSection'

@themed(/^SeoLinkList/, { pure: true })

export default class LinkList extends PureComponent {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      tagItem: PropTypes.string,
    })),
    header: PropTypes.string,
    theme: PropTypes.object,
    maxLinksShowing: PropTypes.number,
    resultsDisplayMode: PropTypes.string,
    collapsibleSection: PropTypes.bool,
    testId: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
    links: [],
    maxLinksShowing: 5,
    collapsibleSection: true,
    testId: 'link-list',
  }

  get linksLength() {
    return this.props.links.length
  }

  get sliceLength() {
    const {
      maxLinksShowing,
    } = this.props

    const maxPlus1 = maxLinksShowing + 1

    // don't collapse links if we only hide 1
    return this.linksLength === maxPlus1 ? maxPlus1 : maxLinksShowing
  }

  get showingLinks() {
    const {
      links,
    } = this.props

    if (!this.linksLength) return false

    return this.list(this.links(
      links.slice(0, this.sliceLength)
    ))
  }

  get hiddenLinks() {
    const {
      links,
    } = this.props

    if (this.sliceLength >= this.linksLength) return false

    return this.list(this.links(
      links.slice(this.sliceLength)
    ))
  }

  links(links) {
    const {
      resultsDisplayMode,
    } = this.props

    const displayModeQuery = resultsDisplayMode ? `?display-mode=${resultsDisplayMode}` : ''

    return links.map(link => (
      <a
        href={`${link.url}${displayModeQuery}`}
        data-tag_item={link.tagItem}
      >
        {link.displayName}
      </a>
    ))
  }

  list(linkArray) {
    const {
      theme,
    } = this.props

    return (
      <List
        className={theme.SeoLinkList_LinkGroup}
        items={linkArray}
      />
    )
  }

  linkSection() {
    const {
      header,
      theme,
      collapsibleSection,
      testId,
    } = this.props

    if (collapsibleSection) {
      return (
        <div
          data-tid={testId}
          data-tag_section="local_info"
          className={theme.SeoLinkList_Container}
        >
          <CollapsibleSection
            header={header}
            isOpen
          >
            <Collapsible
              className={theme.SeoLinkList_Collapsible}
              showableItems={this.showingLinks}
              nonshowableItems={this.hiddenLinks}
              hiddenText={<span className={theme.SeoLinkList_CollapsibleToggle}>More</span>}
              visibleText={<span className={theme.SeoLinkList_CollapsibleToggle}>Less</span>}
            />
          </CollapsibleSection>
        </div>
      )
    }

    return (
      <div
        data-tid={testId}
        data-tag_section="local_info"
        className={theme.SeoLinkList_Container}
      >
        <h2
          className={theme.SeoLinkList_Header}
          data-tag_item={'header'}
        >
          {header}
        </h2>
        <div >
          <Collapsible
            className={theme.SeoLinkList_Collapsible}
            showableItems={this.showingLinks}
            nonshowableItems={this.hiddenLinks}
            hiddenText={<span className={theme.SeoLinkList_CollapsibleToggle}>More</span>}
            visibleText={<span className={theme.SeoLinkList_CollapsibleToggle}>Less</span>}
          />
        </div>
      </div>
    )
  }

  render() {
    return this.linksLength ?
      this.linkSection()
      : null
  }
}
