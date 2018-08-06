import React from 'react'
import { storiesOf } from '@storybook/react'
import { ThemeProvider } from 'react-themed'
import SmallTheme from 'ui/small/themes/SmallTheme'
import PDPReview from 'ui/small/components/PDP/components/PDPReview/PDPReview'
import storyTheme from './PDPReview.stories.css'

const props = {
  rating: 3.5,
  date: 'July 5th, 2018',
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
  author: 'David T.',
  authorDescription: 'Certified Resident',
}

const propsNoDesc = {
  rating: 1.5,
  date: 'July 7th, 2018',
  text: 'Not a fan! I preferred the old property management.',
  author: 'John D.',
  authorDescription: null,
}

storiesOf('Small/PDP/PDPReview', module)
  .addDecorator(story => (
    <ThemeProvider theme={SmallTheme}>
      <div className={storyTheme.Review}>
        {story()}
      </div>
    </ThemeProvider>
  ))
  .add('Review With Description', () => <PDPReview {...props} />)
  .add('Review Without Description', () => <PDPReview {...propsNoDesc} />)
