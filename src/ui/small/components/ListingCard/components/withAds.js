import React from 'react'
import curry from 'lodash/curry'
import { DfpAdSlot } from 'ui/shared/components/DfpAdSlot'
import { SMALL_LIST_VIEW_AD_KEY } from 'config/dfpAds'
import Card from './Card'

const LISTINGS_BEFORE_ADVERTISEMENT = 5

export const getIndexOfNthListing = (cards, n, listingComponent = Card) => {
  let listingCount = 0
  return cards.findIndex(element => {
    if (element.type.displayName !== listingComponent.displayName) return false
    listingCount += 1
    if (listingCount === n) return true
    return false
  })
}

const getAdIndex = cards => getIndexOfNthListing(cards, LISTINGS_BEFORE_ADVERTISEMENT)

const withAds = curry((shouldShowAds, onSlotRender, cards) => {
  if (!shouldShowAds) return cards
  const advertisement = (
    <DfpAdSlot
      key={`${SMALL_LIST_VIEW_AD_KEY}`}
      adKey={SMALL_LIST_VIEW_AD_KEY}
      tid="in-line-ad"
      onSlotRender={onSlotRender}
    />
  )
  const index = getAdIndex(cards) + 1
  const enhancedListings = [
    ...cards.slice(0, index),
    advertisement,
    ...cards.slice(index),
  ]
  return enhancedListings
})

export default withAds

