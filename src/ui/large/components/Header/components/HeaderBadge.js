import React, { PureComponent } from 'react'
import themed from 'react-themed-too'
import PropTypes from 'prop-types'

@themed(/Header/)
class HeaderBadge extends PureComponent {

  static propTypes = {
    theme: PropTypes.object,
    numFavorites: PropTypes.number.isRequired,
  }

  static defaultProps = {
    theme: {},
  }

  render() {
    const { theme, numFavorites } = this.props

    return (
      <span className={theme.Header_Badge} data-tid="favorites-badge">
        {numFavorites}
      </span>
    )
  }
}

export default HeaderBadge
