import React from 'react'
import { storiesOf } from '@storybook/react'
import SmallTheme from 'ui/small/themes/SmallTheme'
import PDPAmenities from '../PDPAmenities'

const mockAmenities = {
  Pets: [
    'Pets',
    'Pet Park',
  ],
  Features: [
    'Air conditioning',
    'Ceiling Fan',
  ],
  Community: [
    'Trails for biking/jogging',
  ],
  Additional: [
    'additional1',
    'additional2',
    'additional3',
  ],
}

const longTitleAmenity = 'This is a really long name for an amenity, it should wrap'

const mockAmenitiesWithLongAmenity = {
  ...mockAmenities,
  Additional: [
    ...mockAmenities.Additional,
    longTitleAmenity,
  ],
}

const props = {
  amenities: mockAmenities,
  theme: SmallTheme,
}

// Approx. width of iPhone 6/7/8
const MOBILE_WIDTH = '375px'

storiesOf('Small/PDP/PDPAmenities', module)
  .add('base case', () => (
    <div style={{ width: MOBILE_WIDTH }}>
      <PDPAmenities {...props} />
    </div>
  ))
  .add('very long name with wrapping', () => (
    <div style={{ width: MOBILE_WIDTH }}>
      <PDPAmenities
        amenities={mockAmenitiesWithLongAmenity}
        theme={SmallTheme}
      />
    </div>
  ))

