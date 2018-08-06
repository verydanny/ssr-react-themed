import React from 'react'
import { render } from 'enzyme'
import toJson from 'enzyme-to-json'
import ThemedLinkList from '../LinkList'

const LinkList = ThemedLinkList.WrappedComponent

const locationName = 'Foo City'

const linkData = [{
  displayName: 'Studio Apartments',
  tagItem: 'studio',
  url: '/california/santa-monica-apartments/studio',
}, {
  displayName: '1 Bedroom Apartments',
  tagItem: '1_bedroom',
  url: '/california/santa-monica-apartments/1-bedroom',
}, {
  displayName: '2 Bedroom Apartments',
  tagItem: '2_bedroom',
  url: '/california/santa-monica-apartments/2-bedroom',
}, {
  displayName: '3 Bedroom Apartments',
  tagItem: '3_bedroom',
  url: '/california/santa-monica-apartments/3-bedroom',
}, {
  displayName: 'Pet Friendly Apartments',
  tagItem: 'pet_friendly',
  url: '/california/santa-monica-apartments/pet-friendly',
}, {
  displayName: 'Furnished Apartments',
  tagItem: 'furnished',
  url: '/california/santa-monica-apartments/furnished',
}, {
  displayName: 'Cheap Apartments',
  tagItem: 'cheap',
  url: '/california/santa-monica-apartments/cheap',
}]

describe('ui/shared/components/SeoContent/LocalInfo', () => {
  it('renders the correct output for 7 items', () => {
    const wrapper = render(<LinkList links={linkData} header={`${locationName} Apartment Options`} />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the correct output for 7 items, with only one item being hidden (does not collapse)', () => {
    const wrapper = render(<LinkList links={linkData} maxLinksShowing={6} header={`${locationName} Apartment Options`} />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
