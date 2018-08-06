import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import theme from './Spinner.css'

const Spinner = ({ className }) => (
  <span className={cn(theme.Spinner, className)} />
)

Spinner.propTypes = {
  className: PropTypes.string,
}

export default Spinner
