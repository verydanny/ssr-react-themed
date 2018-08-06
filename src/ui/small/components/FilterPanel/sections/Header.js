import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed'
import { Text } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import { filters } from 'ui/shared/components/Icon/svgs/global'

@themed(/^FilterPanel_Header/)
export default class Header extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const {
      theme,
      onCancel,
    } = this.props

    return (
      <div className={theme.FilterPanel_Header}>
        <div className={theme.FilterPanel_Header_Text}>
          <Icon
            svgs={{ filters }}
            className={theme.FilterPanel_Header_Icon}
            name="filters"
            fill="#4A4A4A"
          />
          <span
            className={theme.FilterPanel_Header_FilterText}
            data-tid="filter-text"
          >
                Filters
          </span>
        </div>
        <Text
          className={theme.FilterPanel_Header_CancelButton}
          data-tid="cancel-button"
          data-tag_item="close"
          onClick={e => {
            e.preventDefault()
            onCancel()
          }}
        >
            Cancel
        </Text>
      </div>
    )
  }
}
