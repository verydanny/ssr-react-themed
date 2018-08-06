import React from 'react'
import { shallow } from 'enzyme'
import Header from '../sections/Header'
import Form from '../sections/Form'
import Footer from '../sections/Footer'
import ThemedFilterPanel from '../FilterPanel'

const FilterPanel = ThemedFilterPanel.WrappedComponent

describe('FilterPanel', () => {
  const props = {
    updateFilterCriteria: () => {},
    resetFilterCriteria: () => {},
    filterCriteria: {
      refinements: {
        '2beds': { value: 2, group: 'beds' },
        minPrice: { key: 'minPrice', value: 400, group: 'price' },
      },
    },
  }
  it('contains a Header', () => {
    const wrapper = shallow(<FilterPanel {...props} />)
    expect(wrapper.find(Header)).toHaveLength(1)
  })

  it('contains a Form', () => {
    const wrapper = shallow(<FilterPanel {...props} />)
    expect(wrapper.find(Form)).toHaveLength(1)
  })

  it('contains a Footer', () => {
    const wrapper = shallow(<FilterPanel {...props} />)
    expect(wrapper.find(Footer)).toHaveLength(1)
  })

  it('passes simplified refinements to the Form', () => {
    const wrapper = shallow(<FilterPanel {...props} />)
    expect(wrapper.find(Form).prop('refinementCriteria')).toEqual({
      beds: 2,
      minPrice: 400,
    })
  })
})
