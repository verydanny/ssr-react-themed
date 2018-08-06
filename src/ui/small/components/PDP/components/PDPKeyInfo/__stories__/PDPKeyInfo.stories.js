import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeProvider } from 'react-themed'
import SmallTheme from 'ui/small/themes/SmallTheme'
import PDPKeyInfo from 'ui/small/components/PDP/components/PDPKeyInfo/PDPKeyInfo'
import storyTheme from './PDPKeyInfo.stories.css'

const propsKeyInfo = {
  bathText: '1-2 Br',
  bedsText: '1-2 Bd',
  favorites: {},
  listing: { avgOverallRating: 3.5 },
  listingId: '1234',
  numRatings: 4,
  priceText: '$1,500+',
  propertyLabel: 'Enso - Eco-friendly Community in East Atlanta',
  sqFt: '748-1,212 sqft',
  theme: SmallTheme,
  toggleFavorite: action('toggle favorite'),
  unitsAvailable: 'Available Now',
}

const propsRating = {
  listing: { avgOverallRating: 3.5, numRatings: 4 },
}

const propsFavorited = {
  favorites: { 1234: true },
}

storiesOf('Small/PDP/PDPKeyInfo', module)
  .addDecorator(story => (
    <ThemeProvider theme={SmallTheme}>
      {story()}
    </ThemeProvider>
  ))
  .add('KeyInfo', () => <div className={storyTheme.KeyInfo}><PDPKeyInfo {...propsKeyInfo} /></div>)
  .add('KeyInfo with Rating', () => <div className={storyTheme.KeyInfo}><PDPKeyInfo {...propsKeyInfo} {...propsRating} /></div>)
  .add('KeyInfo with Favorited', () => <div className={storyTheme.KeyInfo}><PDPKeyInfo {...propsKeyInfo} {...propsFavorited} /></div>)
