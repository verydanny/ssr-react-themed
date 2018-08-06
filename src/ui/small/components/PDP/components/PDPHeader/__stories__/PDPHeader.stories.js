import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SmallTheme from 'ui/small/themes/SmallTheme'
import PDPHeader from 'ui/small/components/PDP/components/PDPHeader/PDPHeader'
import storyTheme from './PDPHeader.stories.css'

const propsHeader = {
  theme: SmallTheme,
  onClickBack: action('clicked previous page'),
}

storiesOf('Small/PDP', module)
  .add('PDPHeader', () => <div className={storyTheme.Header}><PDPHeader {...propsHeader} /></div>)
