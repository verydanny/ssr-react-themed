import React from 'react'
import { mount } from 'enzyme'
import { initFilters, getPricesAreClose } from 'app/selectors/filters'
import PriceInput from '../PriceInput'

// Providing a fake theme mapping, so classnames will be applied.
// We will use the classnames to find elements
const theme = {
  PriceInput_Grid: 'style1',
  PriceInput_GridItem: 'style2',
  PriceInput_MinLabel: 'style3',
  PriceInput_MaxLabel: 'style4',
  'PriceInput-spreadLabels': 'style5',
}

function setup(propsOverride) {
  const props = {
    theme,
    price: initFilters.price,
    onChangeMax: () => { },
    onChangeMin: () => { },
    ...propsOverride,
  }
  const wrapper = mount(<PriceInput {...props} />)
  const minLabel = wrapper.find('[data-tid="priceinput-label"]').at(1)
  const maxLabel = wrapper.find('[data-tid="priceinput-label"]').at(2)
  const minLabelText = minLabel.length ? minLabel.text() : ''
  const maxLabelText = maxLabel.length ? maxLabel.text() : ''
  const grid = wrapper.find(`.${theme.PriceInput_Grid}`).first()
  const gridItems = grid.find(`.${theme.PriceInput_GridItem}`)
  const gridText = grid.length ? grid.text() : ''
  return {
    wrapper,
    minLabel,
    maxLabel,
    minLabelText,
    maxLabelText,
    grid,
    gridItems,
    gridText,
  }
}

describe('PriceInput with default values', () => {
  const test = setup()

  it('starts with the correct min and max labels', () => {
    expect(test.minLabelText).toBe('$0')
    expect(test.maxLabelText).toBe('$5,100+')
  })

  it('has the expected grid values', () => {
    expect(test.gridText).toBe('$500$1,000$2,000$3,000$4,000$5,000+')
  })
})

describe('PriceInput with min=1050', () => {
  const test = setup({ price: { minPrice: { value: 1050 } } })

  it('starts with the correct min and max labels', () => {
    expect(test.minLabelText).toBe('$1,050')
    expect(test.maxLabelText).toBe('$5,100+')
  })
})

describe('PriceInput with max=1050', () => {
  const test = setup({ price: { maxPrice: { value: 1050 } } })

  it('starts with the correct min and max labels', () => {
    expect(test.minLabelText).toBe('$0')
    expect(test.maxLabelText).toBe('$1,050')
  })
})

describe('PriceInput with min=1050 and max=2050', () => {
  const test = setup({ price: { minPrice: { value: 1050 }, maxPrice: { value: 2050 } } })

  it('starts with the correct min and max labels', () => {
    expect(test.minLabelText).toBe('$1,050')
    expect(test.maxLabelText).toBe('$2,050')
  })
})

describe('PriceInput prevents overlapping labels', () => {
  const test = setup({ price: { minPrice: { value: 1000 }, maxPrice: { value: 2000 } } })

  it('starts with the correct min and max labels', () => {
    expect(test.minLabelText).toBe('$1,000')
    expect(test.maxLabelText).toBe('$2,000')
  })

  it('adds classname for MinLabel and MaxLabel so they can be styled', () => {
    expect(test.minLabel.hasClass(theme.PriceInput_MinLabel)).toBe(true)
    expect(test.maxLabel.hasClass(theme.PriceInput_MaxLabel)).toBe(true)
  })

  it('does not spread the labels when values are far apart', () => {
    const el = test.wrapper.find(`.${theme['PriceInput-spreadLabels']}`)
    expect(el.length).toBe(0)
  })

  it('spreads the labels when values move close together', () => {
    const newPrice = {
      minPrice: { value: 1000 },
      maxPrice: { value: 1300 },
    }
    test.wrapper.setProps({
      price: newPrice,
      spreadPrice: getPricesAreClose(newPrice),
    }, () => {
      const el = test.wrapper.find(`.${theme['PriceInput-spreadLabels']}`)
      expect(el.length).toBe(1)
    })
  })

  it('stops spreading the labels when values move farther apart', () => {
    const newPrice = {
      minPrice: { value: 1000 },
      maxPrice: { value: 1350 },
    }
    test.wrapper.setProps({
      price: newPrice,
      spreadPrice: getPricesAreClose(newPrice),
    }, () => {
      const el = test.wrapper.find(`.${theme['PriceInput-spreadLabels']}`)
      expect(el.length).toBe(0)
    })
  })
})
