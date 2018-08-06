import React from 'react'
import Card from './Card'

const Cards = ({
  listings,
  viewType,
  selectListing,
  selectedListingId,
  onEmailClick,
  listHubId,
  favorites,
  toggleFavorite,
  isListView = viewType === 'list',
  pushState,
  isReactPDP,
  addViewToCriteria,
  criteria,
}) => listings.map(listing => {
  const isActiveCard = isListView || listing.listingId === selectedListingId

  return (
    <Card
      listing={listing}
      viewType={viewType}
      key={listing.listingId}
      selectListing={selectListing}
      isActiveCard={isActiveCard}
      onEmailClick={onEmailClick}
      listHubId={listHubId}
      isFavorite={favorites[listing.listingId]}
      toggleFavorite={toggleFavorite}
      isListView={isListView}
      pushState={pushState}
      isReactPDP={isReactPDP}
      addViewToCriteria={addViewToCriteria}
      criteria={criteria}
    />

  )
})

export default Cards
