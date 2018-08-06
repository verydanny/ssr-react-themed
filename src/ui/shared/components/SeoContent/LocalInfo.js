import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed'
import CollapsibleSection from './CollapsibleSection'

/* Turn off warning for dangerouslySetInnerHTML */
/* eslint-disable react/no-danger */

@themed(/^LocalInfo/)
export default class LocalInfo extends Component {
  static propTypes = {
    body: PropTypes.string,
    theme: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)
    this.state = { isPreRendered: false }
  }

  componentDidMount() {
    this.sections = this.parseBody(this.bodyRef)

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ isPreRendered: true })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.body !== nextProps.body) {
      // Need to render new raw content to DOM before converting to collapsible
      this.setState({ isPreRendered: false })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.body !== this.props.body) {
      this.sections = this.parseBody(this.bodyRef)

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isPreRendered: true })
    }
  }

  parseBody(body) {
    if (!body || !body.children || !body.children.length) return null

    const groups = []
    let section

    Array.from(body.children).forEach(element => {
      const name = (element.nodeName || '').toLowerCase()

      if (name === 'h2') {
        section = [element]
        groups.push(section)
      } else if (section) {
        section.push(element)
      }
    })

    return this.defineSections(groups)
  }

  defineSections(groups) {
    return groups.map(([header, ...body]) => ({
      header: (header.textContent || '').trim(),
      body: this.bodyDomToString(body),
    }))
  }

  bodyDomToString(body) {
    return (body || []).map(p => {
      this.addLinkTagging(p)
      return p.outerHTML
    }).join('')
  }

  addLinkTagging(element) {
    const links = element && element.getElementsByTagName('a')

    if (!links || !links.length) return

    Array.from(links).forEach(link => {
      link.setAttribute('data-tag_item', 'link')
    })
  }

  collapsibleSections() {
    if (!this.sections) return null

    const { theme } = this.props

    return (
      <div
        data-tid="local-info"
        data-tag_section="local_info"
      >
        {this.sections.map(({ header, body }, index) => (
          <CollapsibleSection
            key={`section_${index}`}
            header={header}
            isOpen
          >
            <div
              className={theme.LocalInfo}
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </CollapsibleSection>
        ))}
      </div>
    )
  }

  render() {
    const { body, theme } = this.props
    const { isPreRendered } = this.state

    // Render collapsible/foldable local info for user
    if (isPreRendered) {
      return this.collapsibleSections()
    }

    // Render local info as-is, server side for SEO
    return (
      <div
        className={theme.LocalInfo}
        dangerouslySetInnerHTML={{ __html: body }}
        ref={ref => { this.bodyRef = ref }}
      />
    )
  }
}
