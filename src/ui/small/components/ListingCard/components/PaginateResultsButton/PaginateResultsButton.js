import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { Button } from '@rentpath/react-ui-core'
import { Link } from '@rentpath/react-redux-router'

@themed(/^Load/, { pure: true })
class PaginateResultsButton extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    count: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    more: PropTypes.bool.isRequired,
    children: PropTypes.any,
  }

  static defaultProps = {
    more: false,
    theme: false,
  }

  render() {
    const { count, theme, more, children, link } = this.props
    let label
    let dir
    let tagItem

    if (more) {
      label = `Show ${count} more`
      dir = 'More'
      tagItem = 'load_more_button'
    } else {
      label = `Show previous ${count}`
      dir = 'Prev'
      tagItem = 'previous'
    }

    return (
      <div className={theme[`Load${dir}Card-list`]}>
        <Link
          to={link}
          data-tid={`load-${dir.toLowerCase()}-list`}
          data-tag_item={tagItem}
        >
          <Button className={theme[`Load${dir}Button-list`]} >
            {label}
          </Button>
        </Link>
        {children}
      </div>
    )
  }
}

export default PaginateResultsButton
