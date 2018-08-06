import React from 'react'
import PropTypes from 'prop-types'
import { Counter } from '@rentpath/react-ui-core'
import CounterIcon from './CounterIcon'

const text = (value, min, max) => num => {
  if (value === max) {
    return `${num} +`
  } else if (value === 0) {
    return 'Studio'
  } else if (value > 1) {
    return `${num}`
  } else if (!value || value === min) {
    return 'Any'
  }
  return `${num}`
}

const BedFilter = ({ onClick, label, max, min, value }) => (
  <Counter
    count={value}
    decrementOperator={
      <CounterIcon
        disabled={value === min || (value < 0)}
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
    data-tid="beds-counter"
  />
)

BedFilter.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number,
}

BedFilter.defaultProps = {
  value: -1,
  min: -1,
  max: 4,
  label: 'Bedrooms',
}

export default BedFilter
