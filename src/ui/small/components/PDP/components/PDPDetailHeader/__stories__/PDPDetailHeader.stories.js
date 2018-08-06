import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SmallTheme from 'ui/small/themes/SmallTheme'
import PDPDetailHeader from '../PDPDetailHeader'

const props = {
  theme: SmallTheme,
  title: '$1,375+ Malino',
  onClick: action('clicked header button'),
}

// Approx. width of iPhone 6/7/8
const MOBILE_WIDTH = '375px'

storiesOf('Small/PDP/PDPDetailHeader', module)
  .add('title only', () => (
    <div style={{ width: MOBILE_WIDTH }}>
      <PDPDetailHeader {...props} />
    </div>
  ))
  .add('title and subtitle', () => (
    <div style={{ width: MOBILE_WIDTH }}>
      <PDPDetailHeader {...props} subtitle={'Floorplan A18'} />
    </div>
  ))
  .add('title and subtitle with max characters', () => (
    <div style={{ width: MOBILE_WIDTH }}>
      <PDPDetailHeader
        {...props}
        title={'This is a super long name and address on the detail header'}
        subtitle={'841 Southeast Memorial Day Drive SE, Atlanta, GA'}
        titleMax={25}
        subtitleMax={35}
      />
    </div>
  ))
