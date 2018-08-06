import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'ui/shared/components/Icon'
import { chevronDown } from 'ui/shared/components/Icon/svgs/global'
import { RentBlue } from 'ui/shared/themes/colors'
import FieldTheme from 'app/themes/form/Field.css'

export default class DropDownFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    criteria: PropTypes.object,
  }

  getValue(criteria) {
    return (criteria.catFriendly && 'catFriendly') ||
      (criteria.dogFriendly && 'dogFriendly') ||
      (criteria.petFriendly && 'petFriendly') ||
      (criteria.noPets && 'noPets')
  }

  get options() {
    const { options } = this.props
    const children = options.map(opt => (
      <option
        data-tag_item={opt.item || ''}
        data-tag_section={opt.section || ''}
        data-tag_selection={opt.selection || ''}
        data-tid={opt.value}
        key={opt.value} value={opt.value}
        className={FieldTheme.Option}
      >
        {opt.label}
      </option>
    ))

    return children
  }

  render() {
    const {
      onChange,
      criteria,
      ...restProps
    } = this.props

    return (
      <div>
        <select
          className={FieldTheme.Select}
          onChange={onChange}
          value={criteria.pets || this.getValue(criteria)}
          {...restProps}
        >
          {this.options}
        </select>
        <Icon
          svgs={{ chevronDown }}
          className={FieldTheme.MenuArrow}
          fill={RentBlue}
        />
      </div>
    )
  }
}
