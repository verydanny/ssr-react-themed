import React from 'react'
import PropTypes from 'prop-types'
import { Counter } from '@rentpath/react-ui-core'
import CounterIcon from './CounterIcon'

const text = (value, min, max) => num => {
  if (value === max) {
    return `${num} +`
  } else if (!value || value === min) {
    return 'Any'
  }
  return `${num}`
}

const BathFilter = ({ onClick, label, max, min, value }) => (
  <Counter
    count={value}
    decrementOperator={
      <CounterIcon
        disabled={value === min || !value}
        name="subtract"
      />
    }
    incrementOperator={
      <CounterIcon
        disabled={value === max}
        name="add"
      />
    }
    label={label}
    text={text(value, min, max)}
    max={max}
    min={min}
    onClick={onClick}
    data-tid="baths-counter"
  />
)

BathFilter.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number,
}

BathFilter.defaultProps = {
  value: 0,
  min: 0,
  max: 3,
  label: 'Bathrooms',
}
export default BathFilter
