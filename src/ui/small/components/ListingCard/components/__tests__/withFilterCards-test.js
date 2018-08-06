import React from 'react'
import { isElementOfType } from 'react-dom/test-utils'
import { createMockStore } from 'mocks'
import Card from '../Card'
import withFilterCards from '../withFilterCards'

import {
  InlinePriceFilterCard,
  InlineBedroomFilterCard,
  InlineBathroomFilterCard,
} from '../FilterCards'

describe('ListingCard/withFilterCards', () => {
  let mockListings
  let mockFilterCards
  let smallerMockListings

  const props = {
    updateFilterCriteriaWithChanges: () => {},
    pushState: () => {},
    store: createMockStore({}),
  }
  beforeEach(() => {
    mockListings = [
      <Card />, <Card />, <Card />, <Card />,
      <Card />, <Card />, <Card />, <Card />,
      <Card />, <Card />, <Card />, <Card />,
      <Card />, <Card />, <Card />, <Card />,
      <Card />, <Card />, <Card />, <Card />,
    ]
    smallerMockListings = [<Card />]

    mockFilterCards = [
      <InlinePriceFilterCard {...props} />,
      <InlineBedroomFilterCard {...props} />,
      <InlineBathroomFilterCard {...props} />,
    ]
  })

  it('inserts 3 filter cards after every 4 listings', () => {
    const enhancedListings = withFilterCards(true, mockFilterCards, mockListings)
    expect(enhancedListings).toHaveLength(23)

    expect(isElementOfType(enhancedListings[4], InlinePriceFilterCard)).toBe(true)
    expect(isElementOfType(enhancedListings[9], InlineBedroomFilterCard)).toBe(true)
    expect(isElementOfType(enhancedListings[14], InlineBathroomFilterCard)).toBe(true)
  })
  it('does nothing if isIFCActive is false', () => {
    const enhancedListings = withFilterCards(false, mockFilterCards, mockListings)
    expect(enhancedListings).toEqual(mockListings)
  })
  it('does nothing if there are less than 20 listings', () => {
    const enhancedListings = withFilterCards(true, mockFilterCards, smallerMockListings)
    expect(enhancedListings).toEqual(smallerMockListings)
  })
})
