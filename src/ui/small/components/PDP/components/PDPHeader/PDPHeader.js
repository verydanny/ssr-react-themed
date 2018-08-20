import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { Icon } from 'ui/shared/components/Icon'
import arrowLeft from 'ui/shared/components/Icon/svgs/arrowLeft.svg'
// TODO: whats wrong with this logo?
// import { pdpRentLogo } from 'ui/shared/components/Icon/svgs/pdp'
import rentComLogo from 'ui/shared/components/Icon/svgs/rentComLogo.svg'
import { buildSearchUrl } from 'lib/url'

class PDPHeader extends PureComponent {
  handleClickBack = () => {
    const {
      locationSlug,
      propertyType,
      pushState,
      refinementSlug,
      searchType,
      viewType,
    } = this.props

    const newPath = buildSearchUrl({
      locationSlug,
      propertyType,
      searchType,
      refinementSlug,
      viewType,
    })

    pushState(newPath)
  }

  render() {
    const {
      theme,
    } = this.props
    return (
      <div
        className={theme.PDPHeader}
        data-tid="pdpHeader"
      >
        <button
          className={theme.PDPHeader_Back}
          onClick={this.handleClickBack}
          data-tid="pdpHeader_Back"
        >
          <Icon svgs={{ arrowLeft }} />
        </button>
        <a
          className={theme.PDPHeader_Logo}
          href="/"
          data-tid="pdpHeader_Logo"
        >
          <Icon svgs={{ rentComLogo }} />
        </a>
      </div>
    )
  }
}

PDPHeader.propTypes = {
  locationSlug: PropTypes.string,
  propertyType: PropTypes.string,
  pushState: PropTypes.func,
  refinementSlug: PropTypes.string,
  searchType: PropTypes.string,
  theme: PropTypes.object,
  viewType: PropTypes.string,
}

PDPHeader.defaultProps = {
  theme: {},
}

export default themed(/^PDPHeader/, { pure: true })(PDPHeader)
