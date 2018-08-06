import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { themed } from 'react-themed'
import capitalize from 'lodash/capitalize'
import { Icon } from 'ui/shared/components/Icon'
import chevronRight from 'ui/shared/components/Icon/svgs/chevronRight.svg'
import chevronLeft from 'ui/shared/components/Icon/svgs/chevronLeft.svg'
import autobind from 'autobind-decorator'

@themed('*', { pure: true })

export default class GalleryNav extends PureComponent {
  static propTypes = {
    direction: PropTypes.oneOf(['prev', 'next']),
    theme: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    direction: 'next',
    theme: {},
  }

  @autobind
  handleClick(e) {
    const { onClick } = this.props
    e.preventDefault()
    onClick()
  }

  render() {
    const { direction, theme, className } = this.props
    const name = `chevron${direction === 'next' ? 'Right' : 'Left'}`

    return (
      <div
        className={classnames(
          className,
          theme.GalleryNavBG,
          theme[`GalleryNavBG_${capitalize(direction)}`]
        )}
      >
        <span
          className={classnames(
            className,
            theme.GalleryNav,
            theme[`GalleryNav_${capitalize(direction)}`]
          )}
          onClick={this.handleClick}
          role="button"
          tabIndex={0}
          data-nopdplink
          data-tag_item={direction === 'next' ? 'right_arrow' : 'left_arrow'}
        >
          <Icon svgs={{ chevronRight, chevronLeft }} name={name} data-nopdplink />
        </span>
      </div>
    )
  }
}
