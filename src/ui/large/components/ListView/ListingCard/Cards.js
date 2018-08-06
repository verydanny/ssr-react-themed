import React from 'react'
import { DfpAdSlot } from 'ui/shared/components/DfpAdSlot'
import { LARGE_SRP_CARD_AD_KEY } from 'config/dfpAds'
import Card from './Card'

// Insert ad after which card index (zero-based)
const AD_POSITION = 4
const LISTINGS_TO_SKIP_LAZYLOAD = 5

const Cards = ({
  listings,
  selectedListingId,
  openModal,
  onCardMouseEnter,
  onCardMouseLeave,
  favorites,
  toggleFavorite,
}) => listings.map((listing, index) => {
  const { listingId } = listing
  const showAdvertisement = index === AD_POSITION
  const shouldLazyLoadGallery = typeof index === 'number' && index >= LISTINGS_TO_SKIP_LAZYLOAD
  const isActiveCard = listingId === selectedListingId
  return [
    <Card
      listing={listing}
      key={listingId}
      isActiveCard={isActiveCard}
      isFavorite={favorites[listingId]}
      toggleFavorite={toggleFavorite}
      openModal={openModal}
      onMouseEnter={onCardMouseEnter}
      onMouseLeave={onCardMouseLeave}
      lazyLoadGallery={shouldLazyLoadGallery}
    />,
    (showAdvertisement && // injects ad after 5th listing
      <DfpAdSlot
        key="ad"
        adKey={LARGE_SRP_CARD_AD_KEY}
        tid="srp-list-ad"
      />
    ),
  ]
})

export default Cards
