import PropTypes from 'prop-types'

export const linksType = PropTypes.arrayOf(PropTypes.shape({
  url: PropTypes.string,
  displayName: PropTypes.string,
}))
