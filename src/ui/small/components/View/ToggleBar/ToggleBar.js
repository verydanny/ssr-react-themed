import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { Button } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import { map, list, filters } from 'ui/shared/components/Icon/svgs/global'
import cn from 'classnames'

@themed(/^ViewToggleMenu/, { pure: true })

export default class ToggleBar extends PureComponent {

  static propTypes = {
    toggleView: PropTypes.func.isRequired,
    currentView: PropTypes.string.isRequired,
    filterCount: PropTypes.number.isRequired,
    theme: PropTypes.object,
    views: PropTypes.object,
    loadedViewKeys: PropTypes.array,
    featureClass: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
  }

  listItem(key) {
    const {
      theme,
      filterCount,
      currentView,
      toggleView,
      views,
    } = this.props

    const { name, tagItem } = views[key]
    const isActive = currentView === key

    const label = () => (
      key === 'filters' ? `${name} (${filterCount})` : name
    )

    return (
      <Button
        key={`view-${key}`}
        onClick={() => toggleView(key)}
        className={theme.ViewToggleMenu}
        hidden={isActive}
        data-tid={`${key}-toggle-button${(isActive) ? '-active' : ''}`}
        data-tag_item={tagItem}
      >
        <Icon svgs={{ map, list, filters }} name={name} className={theme.ViewToggleMenu_icons} />
        <span>{label()}</span>
      </Button>
    )
  }

  render() {
    const {
      theme,
      loadedViewKeys,
      featureClass,
    } = this.props

    return (
      <div
        className={cn(theme.ViewToggleMenu_Container, theme[`ViewToggleMenu_Container-${featureClass}`])}
        data-tag_section="footer"
        data-tid="sticky-button-footer"
      >
        {loadedViewKeys.map(key => this.listItem(key))}
      </div>
    )
  }
}
