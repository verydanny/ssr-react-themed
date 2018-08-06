import React from 'react'
import { mount } from 'enzyme'
import SqftInput from '../SqftInput'
import PriceInput from '../PriceInput'
import BedFilter from '../BedFilter'
import BathFilter from '../BathFilter'
import ThemedForm from '../Form'

const Form = ThemedForm.WrappedComponent

describe('Form', () => {
  it('updates the sqftMin in the filterCriteria', () => {
    const updateFilterCriteria = jest.fn()
    const wrapper = mount(
      <Form
        refinementCriteria={{ sqftMin: 100 }}
        updateFilterCriteria={updateFilterCriteria}
      />
    )

    wrapper.instance().updateFilterCriteria = wrapper.instance().plainUpdateFilterCriteria
    wrapper.find(SqftInput).prop('onChange')(300)
    expect(updateFilterCriteria).toHaveBeenCalledWith({ sqftMin: 300 })
  })

  it('updates the price in the filterCriteria', () => {
    const updateFilterCriteria = jest.fn()
    const wrapper = mount(
      <Form
        refinementCriteria={{ sqftMin: 100 }}
        updateFilterCriteria={updateFilterCriteria}
      />
    )

    wrapper.instance().updateFilterCriteria = wrapper.instance().plainUpdateFilterCriteria
    wrapper.find(PriceInput).prop('onChange')({ min: 400, max: 1200 })
    expect(updateFilterCriteria).toHaveBeenCalledWith({ minPrice: 400, maxPrice: 1200 })
  })

  it('updates the beds in the filterCriteria', () => {
    const updateFilterCriteria = jest.fn()
    const wrapper = mount(
      <Form
        refinementCriteria={{ sqftMin: 100 }}
        updateFilterCriteria={updateFilterCriteria}
      />
    )

    wrapper.instance().updateFilterCriteria = wrapper.instance().plainUpdateFilterCriteria
    wrapper.find(BedFilter).prop('onClick')(3)
    expect(updateFilterCriteria).toHaveBeenCalledWith({ beds: 3 })
  })

  it('updates the baths in the filterCriteria', () => {
    const updateFilterCriteria = jest.fn()
    const wrapper = mount(
      <Form
        refinementCriteria={{ sqftMin: 100 }}
        updateFilterCriteria={updateFilterCriteria}
      />
    )

    wrapper.instance().updateFilterCriteria = wrapper.instance().plainUpdateFilterCriteria
    wrapper.find(BathFilter).prop('onClick')(2)
    expect(updateFilterCriteria).toHaveBeenCalledWith({ baths: 2 })
  })

  it('updates other amenities in the filterCriteria', () => {
    const updateFilterCriteria = jest.fn()
    const wrapper = mount(
      <Form
        refinementCriteria={{ sqftMin: 100 }}
        updateFilterCriteria={updateFilterCriteria}
      />
    )

    wrapper.instance().updateFilterCriteria = wrapper.instance().plainUpdateFilterCriteria
    wrapper.find('#washerDryerInUnit').simulate('change', { target: { name: 'washerDryerInUnit', checked: true } })
    expect(updateFilterCriteria).toHaveBeenCalledWith({ washerDryerInUnit: true })
  })
})
