import React from 'react'
import themed from 'react-themed-too'
import PropTypes from 'prop-types'
import cn from 'classnames'

const FavoriteIcon = ({ theme, isFavorite, onClick }) => (
  <button
    data-tag_item="favorite_properties"
    data-tag_selection={isFavorite ? 'unsave' : 'save'}
    data-tid={`Favorite-${!isFavorite ? 'off' : 'on'}`}
    className={cn(theme.Favorite, isFavorite && theme['Favorite-on'])}
    onClick={onClick}
  />
)

FavoriteIcon.propTypes = {
  theme: PropTypes.object,
  isFavorite: PropTypes.bool,
  onClick: PropTypes.func,
}

export default themed(/^Favorite/)(FavoriteIcon)
