import React from 'react'
import { mount } from 'enzyme'
import Nearby from '../Nearby'

const testLinks = [
  { displayName: 'Blandtown', url: '/georgia/atlanta-apartments/blandtown-neighborhood' },
  { displayName: 'Buckhead', url: '/georgia/atlanta-apartments/buckhead-neighborhood' },
  { displayName: 'Atkins Park', url: '/georgia/atlanta-apartments/atkins-park-neighborhood' },
  { displayName: 'Buford Highway', url: '/georgia/brookhaven-apartments/buford-highway-neighborhood' },
  { displayName: 'Capitol Gateway', url: '/georgia/atlanta-apartments/capitol-gateway-neighborhood' },
  { displayName: 'Chastain Park', url: '/georgia/atlanta-apartments/chastain-park-neighborhood' },
  { displayName: 'Virginia Highland', url: '/georgia/atlanta-apartments/virginia-highland-neighborhood' },
  { displayName: 'Colonial', url: '/georgia/atlanta-apartments/colonial-neighborhood' },
  { displayName: 'Westside', url: '/georgia/atlanta-apartments/westside-neighborhood' },
  { displayName: 'Eastside', url: '/georgia/atlanta-apartments/eastside-neighborhood' },
  { displayName: 'Downtown', url: '/georgia/atlanta-apartments/downtown-neighborhood' },
  { displayName: 'Lake Claire', url: '/georgia/atlanta-apartments/lake-claire-neighborhood' },
  { displayName: 'Brookhaven Fields', url: '/georgia/brookhaven-apartments/brookhaven-fields-neighborhood' },
  { displayName: 'Lenox', url: '/georgia/atlanta-apartments/lenox-neighborhood' },
  { displayName: 'Lindbergh - Morosgo', url: '/georgia/atlanta-apartments/lindbergh-morosgo-neighborhood' },
  { displayName: 'Kirkwood', url: '/georgia/atlanta-apartments/kirkwood-neighborhood' },
  { displayName: 'Midtown', url: '/georgia/atlanta-apartments/midtown-neighborhood' },
  { displayName: 'Morningside - Lenox Park', url: '/georgia/atlanta-apartments/morningside-lenox-park-neighborhood' },
  { displayName: 'Northyards', url: '/georgia/atlanta-apartments/northyards-neighborhood' },
  { displayName: 'Oakland', url: '/georgia/atlanta-apartments/oakland-neighborhood' },
  { displayName: 'North Druid Woods', url: '/georgia/north-decatur-apartments/north-druid-woods-neighborhood' },
  { displayName: 'Pine Hills', url: '/georgia/atlanta-apartments/pine-hills-neighborhood' },
  { displayName: 'Peachtree Battle', url: '/georgia/atlanta-apartments/peachtree-battle-neighborhood' },
  { displayName: 'Piedmont Heights', url: '/georgia/atlanta-apartments/piedmont-heights-neighborhood' },
  { displayName: 'Northeast Atlanta', url: '/georgia/atlanta-apartments/northeast-atlanta-neighborhood' },
  { displayName: 'English Avenue', url: '/georgia/atlanta-apartments/english-avenue-neighborhood' },
  { displayName: 'Sherwood Forest', url: '/georgia/atlanta-apartments/sherwood-forest-neighborhood' },
  { displayName: 'South Downtown', url: '/georgia/atlanta-apartments/south-downtown-neighborhood' },
  { displayName: 'Vine City', url: '/georgia/atlanta-apartments/vine-city-neighborhood' },
  { displayName: 'West Paces Ferry', url: '/georgia/atlanta-apartments/west-paces-ferry-neighborhood' },
]

const theme = {
  'Nearby-leftColumn': 'leftColumn',
  'Nearby-rightColumn': 'rightColumn',
}

const props = {
  header: 'Nearby Header',
  linkTagSection: 'tag_section',
  linkTagItem: 'tag_item',
  data: testLinks,
  theme,
}

describe('ui/shared/components/SeoContent/Nearby', () => {
  it('matches snapshot', () => {
    const wrapper = mount(<Nearby {...props} />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sets a header', () => {
    const wrapper = mount(<Nearby {...props} />)
    const header = wrapper.find('h2')
    expect(header.text()).toBe(props.header)
  })

  it('has a left column of links', () => {
    const wrapper = mount(<Nearby {...props} />)
    const leftColumn = wrapper.find('.leftColumn')
    expect(leftColumn.length).toBe(1)
    const links = leftColumn.find('a')
    expect(links.length).toBe(15)
    expect(links.at(0).text()).toBe('Atkins Park')
  })

  it('has a right column of links', () => {
    const wrapper = mount(<Nearby {...props} />)
    const rightColumn = wrapper.find('.rightColumn')
    expect(rightColumn.length).toBe(1)
    const links = rightColumn.find('a')
    expect(links.length).toBe(15)
    expect(links.at(0).text()).toBe('Midtown')
  })

  it('can limit the number of links', () => {
    const wrapper = mount(<Nearby {...props} maxLinks={10} />)
    const leftColumn = wrapper.find('.leftColumn')
    expect(leftColumn.length).toBe(1)
    let links = leftColumn.find('a')
    expect(links.length).toBe(5)
    expect(links.at(0).text()).toBe('Atkins Park')

    const rightColumn = wrapper.find('.rightColumn')
    expect(rightColumn.length).toBe(1)
    links = rightColumn.find('a')
    expect(links.length).toBe(5)
    expect(links.at(0).text()).toBe('Capitol Gateway')
  })
})
