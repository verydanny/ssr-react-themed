import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import Spinner from 'ui/shared/components/Spinner'
import { Link } from '@rentpath/react-redux-router'
import cn from 'classnames'

// TODO: Clean this up, so it doesn't have some of the old data, or split out the spinner card
const PaginateResultsCard = ({ theme, link, more, onClick, loading }) => {
  let dir
  let tagItem

  if (more) {
    dir = 'More'
    tagItem = 'load_more_button'
  } else {
    dir = 'Prev'
    tagItem = 'previous'
  }

  const cardBody = loading ? (
    <div data-tid="spinner-card">
      <div className={theme[`Load${dir}Button`]}>
        <Spinner className={theme.Spinner} />
      </div>
    </div>
  ) : (
    <Link
      to={link}
      data-tid={`load-${dir.toLowerCase()}-map`}
      data-tag_item={tagItem}
      onClick={onClick}
    >
      <div data-tid="spinner-link-card" className={theme[`Load${dir}Button`]}>
        <Spinner className={theme.Spinner} />
      </div>
    </Link>
  )

  return (
    <div
      className={cn(theme['ListingCard-map'], theme[`Load${dir}Card-map`])}
      role="presentation"
    >
      {cardBody}
    </div>
  )
}

PaginateResultsCard.propTypes = {
  theme: PropTypes.object,
  link: PropTypes.string,
  more: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.any,
}

PaginateResultsCard.defaultProps = {
  more: false,
  theme: {},
}

export default themed('*')(PaginateResultsCard)
