import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'app/store/reducer'
import { storiesOf } from '@storybook/react'
import { ThemeProvider } from 'react-themed-too'
import SmallTheme from 'ui/small/themes/SmallTheme'
import times from 'lodash/times'
import omit from 'lodash/omit'
import PDPFooter from '../PDPFooter'
import storyTheme from './PDPFooter.stories.css'

const initialState = {}

const store = createStore(
  reducer,
  initialState
)

const propsComplete = {
  price: '$1,350',
  phoneTel: '555-555-5555',
  phoneFormatted: '(555) 555-5555',
  listing: {
    numRatings: 11,
    avgOverallRating: 3.7,
  },
}

const propsNoRating = { ...propsComplete, ...{ listing: {} } }

const propsNoPrice = omit(propsComplete, 'price')

const propsNoPriceNoRating = omit(propsNoRating, 'price')

const propsNoPhone = omit(propsComplete, 'phoneTel', 'phoneFormatted')

const content = []

const heading = i => (
  <h1 key={i}>
    Scroll Down
  </h1>
)

times(30, i => {
  content.push(heading(i))
})

content.push(<div key="end">End of Content</div>)

const PageForceFooter = props => (
  <div data-show-pdp-footer="" className={storyTheme.body}>
    <PDPFooter {...props} />
  </div>
)

const PageScrollFooter = props => (
  <div className={storyTheme.body}>
    <section className={storyTheme.section}>{content}</section>
    <PDPFooter {...props} />
  </div>
)

storiesOf('Small/PDP/Footer', module)
  .addDecorator(story => (
    <Provider store={store}>
      <ThemeProvider theme={SmallTheme}>
        {story()}
      </ThemeProvider>
    </Provider>
  ))
  .add('all parts', () => (
    <PageForceFooter {...propsComplete} />
  ))
  .add('no rating', () => (
    <PageForceFooter {...propsNoRating} />
  ))
  .add('no price', () => (
    <PageForceFooter {...propsNoPrice} />
  ))
  .add('no price or rating', () => (
    <PageForceFooter {...propsNoPriceNoRating} />
  ))
  .add('no phone', () => (
    <PageForceFooter {...propsNoPhone} />
  ))
  .add('scrolling', () => (
    <PageScrollFooter {...propsComplete} />
  ))
