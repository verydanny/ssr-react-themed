import React from 'react'
import { mount } from 'enzyme'
import DropDownFilter from '../DropDownFilter'
import config from '../../config'

describe('ui/small/components/FilterPanel/DropDownFilter', () => {
  const dropDownProps = {
    id: 'PetsDropDown',
    options: config.petOptions,
    onChange: () => null,
    criteria: {
      pets: 'Select',
    },
  }
  const expected = 1

  it('selects "Select" when no value chosen', () => {
    const wrapper = mount(<DropDownFilter {...dropDownProps} />)
    const actual = wrapper.find('select[value="Select"]').length
    expect(actual).toBe(expected)
  })

  describe('With pet policy refinements', () => {
    const mountWithRefinement = refinement => {
      const propsWithRefinement = {
        ...dropDownProps,
        criteria: {
          [refinement]: {
            value: true,
          },
        },
      }
      return mount(<DropDownFilter {...propsWithRefinement} />)
    }

    it('selects "Cats OK" with catFriendly', () => {
      const wrapper = mountWithRefinement('catFriendly')
      const actual = wrapper.find('select[value="catFriendly"]').length
      expect(actual).toBe(expected)
    })

    it('selects "Dogs OK" with dogFriendly', () => {
      const wrapper = mountWithRefinement('dogFriendly')
      const actual = wrapper.find('select[value="dogFriendly"]').length
      expect(actual).toBe(expected)
    })

    it('selects "Cats & Dogs OK" with petFriendly', () => {
      const wrapper = mountWithRefinement('petFriendly')
      const actual = wrapper.find('select[value="petFriendly"]').length
      expect(actual).toBe(expected)
    })

    it('selects "No Pets" with noPets', () => {
      const wrapper = mountWithRefinement('noPets')
      const actual = wrapper.find('select[value="noPets"]').length
      expect(actual).toBe(expected)
    })
  })
})
