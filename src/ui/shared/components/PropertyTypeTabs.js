import React, { Component } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

export default class PropertyTypeTabs extends Component {

  static propTypes = {
    theme: PropTypes.object,
    onTabSelect: PropTypes.func,
    allFirst: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    const tab = props.allFirst ? 'all' : 'apartments'
    this.state = { activeTab: { [tab]: true } }
  }

  setActiveTab(tab) {
    const { onTabSelect } = this.props
    this.setState({ activeTab: { [tab]: true } })
    switch (tab) {
      case 'all' :
        onTabSelect('apartments_condos_houses_townhouses')
        break
      case 'apartments' :
        onTabSelect('apartments')
        break
      case 'houses' :
        onTabSelect('houses')
        break

      default :
        break
    }
  }

  render() {
    const { theme, allFirst } = this.props
    return (<div className={theme.btnGroup} >
      {allFirst && <button
        type="button"
        data-tid="all_tab_homepage"
        data-tag_item="all_tab"
        data-tag_section="search_input"
        onClick={() => this.setActiveTab('all')}
        className={this.state.activeTab.all ? cn(
          theme.btnItem,
          theme.active
        ) : theme.btnItem}
      >ALL</button>}
      <button
        type="button"
        data-tid="apartments_tab_homepage"
        data-tag_item="apartments_tab"
        data-tag_section="search_input"
        onClick={() => this.setActiveTab('apartments')}
        className={this.state.activeTab.apartments ? cn(
          theme.btnItem,
          theme.active
        ) : theme.btnItem}
      >APARTMENTS</button>
      <button
        type="button"
        data-tid="houses_tab_homepage"
        data-tag_item="houses_tab"
        data-tag_section="search_input"
        onClick={() => this.setActiveTab('houses')}
        className={this.state.activeTab.houses ? cn(
          theme.btnItem,
          theme.active
        ) : theme.btnItem}
      >HOUSES</button>
      {!allFirst && <button
        type="button"
        data-tid="all_tab_homepage"
        data-tag_item="all_tab"
        data-tag_section="search_input"
        onClick={() => this.setActiveTab('all')}
        className={this.state.activeTab.all ? cn(
          theme.btnItem,
          theme.active
        ) : theme.btnItem}
      >ALL</button>}
    </div>)
  }
}
