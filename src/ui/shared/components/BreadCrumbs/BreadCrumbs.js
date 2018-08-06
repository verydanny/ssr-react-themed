import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import themed from 'react-themed'
import { LIST_SKELETON } from 'app/store/types'

// NOTE: here is a QA example of custom headline returned for rentjs
// http://content-service.vip.qa.atl.primedia.com/api/v1/fetch?schema=all_city_srps&uri=georgia/wrens-apartments
// for `georgia/wrens-apartments`

@themed(/^BreadCrumbs/, { pure: true })

export default class BreadCrumbs extends PureComponent {
  static propTypes = {
    city: PropTypes.object,
    collapsed: PropTypes.bool,
    headingText: PropTypes.string,
    title: PropTypes.string,
    hood: PropTypes.object,
    legacyStateLanderUrl: PropTypes.string,
    hoodLanderUrl: PropTypes.string,
    singlePropertyType: PropTypes.bool,
    state: PropTypes.object,
    theme: PropTypes.object,
    zip: PropTypes.string,
    isSearchResultsPage: PropTypes.bool,
    loading: PropTypes.any,
    loadingOptions: PropTypes.object,
  }

  static defaultProps = {
    city: {},
    collapsed: true,
    headingText: '',
    hood: {},
    legacyStateLanderUrl: '',
    singlePropertyType: false,
    state: {},
    theme: {},
    zip: '',
  }

  constructor(props) {
    super(props)

    const {
      collapsed,
      loading,
      loadingOptions,
    } = this.props

    const isLoading = loading && loadingOptions && loadingOptions.skeleton !== LIST_SKELETON

    this.state = {
      collapsed: collapsed || isLoading,
    }
  }

  get expandCrumbsBtn() {
    if (this.state.collapsed) {
      return [
        <li
          className={this.props.theme.BreadCrumbs_Item}
          key="2"
        >
          <a role="presentation" onClick={this.expandCrumbs} data-tid="expand-crumbs">
            &hellip;
          </a>
        </li>,
      ]
    }
    return null
  }

  listProps = () => ({
    className: cn(this.props.theme.BreadCrumbs_Item, {
      [this.props.theme.BreadCrumbs_Item_Hidden]: this.state.collapsed,
    }),
    itemProp: 'itemListElement',
    itemScope: 'itemScope',
    itemType: 'https://schema.org/ListItem',
  })

  remainingCrumbs = () => {
    const { city, hood, state, zip, legacyStateLanderUrl, hoodLanderUrl } = this.props

    const zipOrHood = zip || hood.name

    const stateLanderUrl = legacyStateLanderUrl || state.slug

    const listProps = this.listProps()

    return [
      <li {...listProps} key="2">
        <meta itemProp="position" content="2" />
        <a href={`/${stateLanderUrl}`} itemProp="url">
          <span itemProp="name">{state.name}</span>
        </a>
      </li>,
      <li {...listProps} key="3">
        <meta itemProp="position" content="3" />
        {zipOrHood ? (
          <a href={`/${hoodLanderUrl}`} itemProp="url">
            <span itemProp="name">{city.name}</span>
          </a>
        ) : (
          <span itemProp="name">{city.name}</span>
        )}
      </li>,
      zipOrHood && (
        <li {...listProps} key="4">
          <meta itemProp="position" content="4" />
          <span itemProp="name">{zipOrHood}</span>
        </li>
      ),
    ]
  }

  expandCrumbs = () => {
    this.setState({ collapsed: false })
  }

  render() {
    const {
      theme,
      singlePropertyType,
      loading,
      loadingOptions,
      title,
      headingText,
      isSearchResultsPage,
    } = this.props

    const shouldRender = (!loading || loadingOptions.skeleton === LIST_SKELETON)
      && singlePropertyType

    if (!shouldRender) return null

    const schemaProps = isSearchResultsPage ? { itemScope: true, itemType: 'http://schema.org/SearchResultsPage' } : {}

    return (
      <div
        id="results"
        className={theme.BreadCrumbs} data-tid="breadcrumbs"
        {...schemaProps}
      >
        <ol
          itemProp="breadcrumb"
          itemScope="itemScope"
          itemType="https://schema.org/BreadcrumbList"
          data-tid="expandedBreadCrumbsText"
        >
          <li
            className={theme.BreadCrumbs_Item}
            itemProp="itemListElement"
            itemScope="itemScope"
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </li>
          { this.expandCrumbsBtn }
          { this.remainingCrumbs() }
        </ol>
        { headingText && <h1>{headingText}</h1> }
        { isSearchResultsPage && <meta itemProp="name" content={title} /> }
      </div>
    )
  }
}
