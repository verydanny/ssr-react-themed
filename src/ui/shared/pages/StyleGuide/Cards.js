import React from 'react'
import Card from 'ui/small/components/ListingCard/components/Card'
import PaginateResultsCard from 'ui/small/components/ListingCard/components/PaginateResultsCard'
import PaginateResultsButton from 'ui/small/components/ListingCard/components/PaginateResultsButton'
import cardTheme from 'ui/small/themes/ListingCard.css'
import theme from './Cards.css'

const listing = {
  propertyLabel: 'Da Vinci',
  listingId: '100050308',
  aggregates: {
    beds: {
      high: 3,
    },
    baths: {
      high: 3,
    },
    totalAvailable: 14,
  },
  mPhone: '3109753879',
  photos: [
    { caption: 'some caption', path: 'imgr/e2ddf0f87c02189bda025db50425b73c/' },
    { caption: 'some caption', path: 'imgr/7c267ae5b4202ae0048a31e47e70c218/' },
    { caption: 'some caption', path: 'imgr/16c55e5097512da4bdf8cfaec58ab037/' },
    { caption: 'some caption', path: 'imgr/f3c961d377f53cf18cd8792963811a74/' },
    { caption: 'some caption', path: 'imgr/1c0a661c2cda611a2641350cb2293569/' },
  ],
}

export default() => (
  <div className={theme.Container}>
    <h1 className={theme.Header} data-tid="cards-header">
      Cards
    </h1>

    <h2>Cards: Levels Shadow Base and Hover</h2>
    <div className={theme.WrapCard}>
      <ul className={theme.StyleReference}>
        <li>base: X 0 Y 2 Blur 2 Spread 0 Color Black 20%</li>
        <li>hover: X 1 Y 3 Blur 4 Spread 1 Color Black 24%</li>
      </ul>
    </div>

    <hr />

    <h2>Map View</h2>
    <div className={theme.WrapCard}>
      <Card
        theme={cardTheme}
        listing={listing}
        viewType={'map'}
      />
      <ul className={theme.StyleReference}>
        <li>image height: 128px</li>
        <li>content height: 72px</li>
        <li>total height: 200px</li>
        <li>width: 280px</li>
        <li>corner radius: 4</li>
      </ul>
    </div>

    <hr />

    <h2>List View</h2>
    <div className={theme.WrapCard}>
      <Card
        theme={cardTheme}
        listing={listing}
        viewType={'list'}
      />

      <ul className={theme.StyleReference}>
        <li>image height: 158px</li>
        <li>content height: 72px</li>
        <li>total height: 230px</li>
        <li>width: 100%</li>
        <li>corner radius: 4</li>
      </ul>
    </div>

    <div className={theme.WrapCard}>
      <Card
        theme={cardTheme}
        listing={listing}
        viewType={'list'}
        sponsored
      />

      <ul className={theme.StyleReference}>
        <li>image height: 158px</li>
        <li>content height: 122px</li>
        <li>total height: 280px</li>
        <li>width: 100%</li>
        <li>corner radius: 4</li>
      </ul>
    </div>

    <hr />

    <h2>Additional Content: Map View</h2>
    <div className={theme.WrapCard}>
      <div className={theme.ListingCardMap}>
        <PaginateResultsCard
          theme={cardTheme}
          count={20}
          link="foo"
          more
        />
      </div>
      <ul className={theme.StyleReference}>
        <li>hover/tap text</li>
      </ul>
    </div>

    <hr />

    <h2>Additional Content: List w/ Accordian</h2>
    <div className={theme.WrapCard}>
      <div className={theme.ListingCardList}>
        <PaginateResultsButton
          theme={cardTheme}
          count={20}
          city="Atlanta"
          link="foo"
          more
        />
      </div>
      <ul className={theme.StyleReference}>
        <li>with accordian dropdown</li>
      </ul>
    </div>

  </div>
)
