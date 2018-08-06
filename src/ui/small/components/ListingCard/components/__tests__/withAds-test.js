import React from 'react'
import { renderAd } from 'app/store/shared/actions'
import { DfpAdSlot } from 'ui/shared/components/DfpAdSlot'
import Card from '../Card'
import withAds, { getIndexOfNthListing } from '../withAds'

const NotCard = () => (
  <div />
)

describe('ListingCard/withFilterCards', () => {
  let mockCards

  beforeEach(() => {
    mockCards = [
      <Card />,
      <Card />,
      <Card />,
      <Card />,
      <NotCard />,
      <Card />,
      <Card />,
      <Card />,
      <NotCard />,
      <Card />,
      <Card />,
    ]
  })

  describe('getIndexOfNthListing', () => {
    it('finds the index of the specified Listing', () => {
      expect(getIndexOfNthListing(mockCards, 5)).toEqual(5)
      expect(getIndexOfNthListing(mockCards, 8)).toEqual(9)
    })
  })

  describe('withAds', () => {
    it.only('inserts an advertisement after the 5th listing if showAds is true', () => {
      const enhancedCards = withAds(true, renderAd, mockCards)
      expect(enhancedCards).toHaveLength(12)
      expect(enhancedCards[6].type).toEqual(DfpAdSlot)
    })
    it('does not return an advertisement if showAds is false', () => {
      expect(withAds(false, renderAd, mockCards)).toHaveLength(11)
    })
  })
})
