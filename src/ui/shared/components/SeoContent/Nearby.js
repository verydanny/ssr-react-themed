import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import CollapsibleSection from './CollapsibleSection'
import ClampLines from './ClampLines'

@themed(/^Nearby/)

export default class Nearby extends PureComponent {
  static propTypes = {
    header: PropTypes.string.isRequired,
    linkTagSection: PropTypes.string.isRequired,
    linkTagItem: PropTypes.string.isRequired,
    data: PropTypes.array,
    maxLinks: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    theme: PropTypes.object,
  }

  static defaultProps = {
    data: [],
    theme: {},
  }

  constructor(props) {
    super(props)
    this.state = { columns: this.calcColumns(props) }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ columns: this.calcColumns(nextProps) })
    }
  }

  sortDisplayName(a, b) {
    const nameA = a.displayName.toUpperCase()
    const nameB = b.displayName.toUpperCase()

    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  }

  calcColumns(props) {
    const { data, maxLinks } = props

    if (!data || !data.length) return {}

    // links come in sorted by property count.
    // take the first <maxLinks> number of links before sorting alphabetically
    const links = maxLinks ? data.slice(0, maxLinks) : data
    const sorted = links.sort(this.sortDisplayName)
    const midpoint = Math.ceil(sorted.length / 2)
    const colLeft = sorted.slice(0, midpoint)
    const colRight = sorted.slice(midpoint)

    return { colLeft, colRight }
  }

  nearbyList() {
    const {
      linkTagSection,
      theme,
    } = this.props

    const {
      colLeft,
      colRight,
    } = this.state.columns

    if (!colLeft || !colLeft.length) return null

    return (
      <div
        className={theme.Nearby}
        data-tag_section={linkTagSection}
      >
        <div className={theme['Nearby-leftColumn']}>
          {this.renderColumn(colLeft)}
        </div>
        <div className={theme['Nearby-rightColumn']}>
          {this.renderColumn(colRight)}
        </div>
      </div>
    )
  }

  renderColumn(data = []) {
    const { linkTagItem } = this.props

    return data.map(({ url, displayName }, idx) => (
      <a
        key={`column-${idx}`}
        href={url}
        data-tag_item={linkTagItem}
      >
        {displayName}
      </a>
    ))
  }

  render() {
    const {
      header,
      data,
    } = this.props

    if (!data || !data.length) return null

    return (
      <CollapsibleSection
        header={header}
        isOpen
        testId="nearby-links"
      >
        <ClampLines
          lineCount={5}
          lineHeight={29}
        >
          {this.nearbyList()}
        </ClampLines>
      </CollapsibleSection>
    )
  }
}
