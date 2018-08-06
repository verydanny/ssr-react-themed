import React from 'react'
import { storiesOf } from '@storybook/react'
import SmallTheme from 'ui/small/themes/SmallTheme'
import PDPAddress from '../PDPAddress'

const props = {
  theme: SmallTheme,
  streetAddress: '841 Memorial Drive SE',
  cityStateZip: 'Atlanta, GA 30318',
  neighborhood: 'Reynoldstown',
}

// Approx. width of iPhone 6/7/8
const MOBILE_WIDTH = '375px'

storiesOf('Small/PDP/PDPAddress', module)
  .add('full address (mobile width)', () => (
    <div style={{ width: MOBILE_WIDTH }}>
      <PDPAddress {...props} />
    </div>
  ))
  .add('line-wrapped address', () => (
    <div style={{ width: MOBILE_WIDTH }}>
      <PDPAddress {...props} streetAddress="1234 Super Duper Duper Crazy Seriously Long Address" />
    </div>
  ))
