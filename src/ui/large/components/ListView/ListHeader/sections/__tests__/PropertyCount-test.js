import React from 'react'
import { mount } from 'enzyme'
import PropertyCount from '../PropertyCount'

describe('Property Count', () => {
  function setup(total) {
    return mount(
      <PropertyCount total={total} />
    ).find('PropertyCount')
  }

  it('Property Count Label - more than 1 Property', () => {
    expect(setup(45).text()).toContain('45 Properties')
  })
  it('Property Count Label - Only 1 Property', () => {
    expect(setup(1).text()).toContain('1 Property')
  })
  it('Property Count Label - 0 Property', () => {
    expect(setup(0).text()).toContain('0 Properties')
  })
})
