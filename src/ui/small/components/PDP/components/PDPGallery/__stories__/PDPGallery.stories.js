import React from 'react'
import { storiesOf } from '@storybook/react'
import { ThemeProvider } from 'react-themed-too'
import SmallTheme from 'ui/small/themes/SmallTheme'
import PDPGallery from '../PDPGallery'
import storyTheme from './PDPGallery.stories.css'

const photos = [
  {
    path: 'imgr/8aa71daad621b2ce5f37bf61a8b699d9/',
    caption: 'test',
  },
  {
    path: 'imgr/8aa71daad621b2ce5f37bf61a8b699d9/',
    caption: 'test',
  },
  {
    path: 'imgr/8aa71daad621b2ce5f37bf61a8b699d9/',
    caption: 'test',
  },
]

const propsGallery = {
  disableSwipe: false,
  viewType: 'pdpsmall',
  photos,
  disableArrowKeys: true,
}

storiesOf('Small/PDP', module)
.add('PDPGallery', () => (
  <ThemeProvider theme={SmallTheme}>
    <div className={storyTheme.Gallery}>
      <PDPGallery {...propsGallery} />
    </div>
  </ThemeProvider>
))
