import React from 'react'
import LoadingCard from './LoadingCard'

const LoadingCards = ({
  listings,
}) => listings.map(listing => (
  <div
    key={`card-${listing.listingId}`}
  >
    <LoadingCard
      listing={listing}
      key={listing.listingId}
    />
  </div>
))

export default LoadingCards
