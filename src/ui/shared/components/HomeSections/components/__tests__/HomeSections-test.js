import React from 'react'
import { shallow } from 'enzyme'
import HomeSections from '../HomeSections'

const testSections = [
  {
    headline: 'Test Headline 1',
    body: 'Test Body 1',
    links: 'Test Links 1',
  },
  {
    headline: 'Test Headline 2',
    body: 'Test Body 2',
    links: 'Test Links 2',
  },
  {
    headline: 'Test Headline 3',
    body: 'Test Body 3',
    links: 'Test Links 3',
  },
  {
    headline: 'Test Headline 4',
    body: 'Test Body 4',
    links: 'Test Links 4',
  },
  {
    headline: 'Test Headline 5',
    body: 'Test Body 5',
    links: 'Test Links 5',
  },
  {
    headline: 'Test Headline 6',
    body: 'Test Body 6',
    links: 'Test Links 6',
  },
]

const theme = {
  HomeSections_Section: 'section',
  HomeSections_SectionLinks: 'links',
}

const component = () => (
  <HomeSections
    sections={testSections}
    searchTerm="Atlanta, GA"
    petFriendlyLink="/georgia/atlanta-apartments/pet-friendly"
    studioLink="/georgia/atlanta-apartments/studio"
    oneBedLink="/georgia/atlanta-apartments/1-bedroom"
    twoBedLink="/georgia/atlanta-apartments/2-bedroom"
    threeBedLink="/georgia/atlanta-apartments/3-bedroom"
    cheapLink="/georgia/atlanta-apartments/cheap"
    theme={theme}
  />
)

describe('ui/shared/components/HomeSections', () => {
  it('matches the snapshot of sections rendered', () => {
    const wrapper = shallow(component())
    expect(wrapper.html()).toMatchSnapshot()
  })
})
