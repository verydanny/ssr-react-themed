import React from 'react'
import { mount } from 'enzyme'
import Pagination from '../Pagination'

// Providing a fake theme mapping, so classnames will be applied.
// We will use the classnames to find elements, and also to
// determine if the inactive classname has been applied when expected.
const theme = {
  Pagination_Count: 'themedclass1',
  Pagination_Next: 'themedclass2',
  Pagination_Prev: 'themedclass3',
  'Pagination_Next-inactive': 'themedclass4',
  'Pagination_Prev-inactive': 'themedclass5',
}

const URL_NEXT = '/next'
const URL_PREV = '/prev'

function setup(propsOverride) {
  const props = {
    theme,
    start: 1,
    end: 30,
    total: 75,
    hasMultiplePages: true,
    linkNext: URL_NEXT,
    linkPrevious: URL_PREV,
    ...propsOverride,
  }
  const wrapper = mount(<Pagination {...props} />)
  const next = wrapper.find(`.${theme.Pagination_Next}`).first()
  const previous = wrapper.find(`.${theme.Pagination_Prev}`).first()
  const countNode = wrapper.find(`.${theme.Pagination_Count}`)
  const text = countNode.length ? countNode.text() : ''
  return {
    wrapper,
    next,
    previous,
    text,
  }
}

describe('Pagination first page', () => {
  const test = setup({
    isFirstPage: true,
  })

  it('hides the previous link', () => {
    expect(test.previous).toHaveLength(0)
  })

  it('does not hide the next link', () => {
    expect(test.next).toHaveLength(1)
  })

  it('shows the expected count', () => {
    expect(test.text).toBe('1 - 30 of 75 Properties')
  })
})

describe('Pagination middle page', () => {
  const test = setup({
    start: 31,
    end: 60,
    total: 75,
  })

  it('does not hide the the previous link', () => {
    expect(test.previous).toHaveLength(1)
  })

  it('does not hide the next link', () => {
    expect(test.next).toHaveLength(1)
  })

  it('shows the expected count', () => {
    expect(test.text).toBe('31 - 60 of 75 Properties')
  })
})

describe('Pagination last page', () => {
  const test = setup({
    start: 61,
    end: 75,
    total: 75,
    isLastPage: true,
  })

  it('does not hide the previous link', () => {
    expect(test.previous).toHaveLength(1)
  })

  it('hides the next link', () => {
    expect(test.next).toHaveLength(0)
  })

  it('shows the expected count', () => {
    expect(test.text).toBe('61 - 75 of 75 Properties')
  })
})

describe('Pagination single page', () => {
  const test = setup({
    start: 1,
    isFirstPage: true,
    isLastPage: true,
    end: 20,
    total: 20,
    hasMultiplePages: false,
  })

  it('does not appear', () => {
    expect(test.wrapper.html()).toBeNull()
  })
})
