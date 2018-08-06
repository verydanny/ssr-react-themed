import React from 'react'
import { shallow, mount } from 'enzyme'
import PopularCities from '../PopularCities'

const apartmentsTestLinks = [
  { url: '/georgia/atlanta-apartments', text: 'Atlanta, GA' },
  { url: '/north-carolina/charlotte-apartments', text: 'Charlotte, NC' },
  { url: '/illinois/chicago-apartments', text: 'Chicago, IL' },
  { url: '/california/los-angeles-apartments', text: 'Los Angeles, CA' },
  { url: '/new-york/new-york-apartments', text: 'New York, NY' },
  { url: '/michigan/detroit-apartments', text: 'Detroit, MI' },
  { url: '/california/san-diego-apartments', text: 'San Diego, CA' },
  { url: '/texas/dallas-apartments', text: 'Dallas, TX' },
]

const housesTestLinks = [
  { url: '/georgia/atlanta-houses', text: 'Atlanta, GA' },
  { url: '/north-carolina/charlotte-houses', text: 'Charlotte, NC' },
  { url: '/illinois/chicago-houses', text: 'Chicago, IL' },
  { url: '/california/los-angeles-houses', text: 'Los Angeles, CA' },
  { url: '/new-york/new-york-houses', text: 'New York, NY' },
  { url: '/michigan/detroit-houses', text: 'Detroit, MI' },
  { url: '/california/san-diego-houses', text: 'San Diego, CA' },
  { url: '/texas/dallas-houses', text: 'Dallas, TX' },
]

const apartmentsLinks = `
  <ul>
    <li><a href="${apartmentsTestLinks[0].url}">${apartmentsTestLinks[0].text}</a></li>
    <li><a href="${apartmentsTestLinks[1].url}">${apartmentsTestLinks[1].text}</a></li>
    <li><a href="${apartmentsTestLinks[2].url}">${apartmentsTestLinks[2].text}</a></li>
    <li><a href="${apartmentsTestLinks[3].url}">${apartmentsTestLinks[3].text}</a></li>

    <li><a href="${apartmentsTestLinks[4].url}">${apartmentsTestLinks[4].text}</a></li>
    <li><a href="${apartmentsTestLinks[5].url}">${apartmentsTestLinks[5].text}</a></li>
    <li><a href="${apartmentsTestLinks[6].url}">${apartmentsTestLinks[6].text}</a></li>
    <li><a href="${apartmentsTestLinks[7].url}">${apartmentsTestLinks[7].text}</a></li>
  </ul>
`

const housesLinks = `
  <ul>
    <li><a href="${housesTestLinks[0].url}">${housesTestLinks[0].text}</a></li>
    <li><a href="${housesTestLinks[1].url}">${housesTestLinks[1].text}</a></li>
    <li><a href="${housesTestLinks[2].url}">${housesTestLinks[2].text}</a></li>
    <li><a href="${housesTestLinks[3].url}">${housesTestLinks[3].text}</a></li>

    <li><a href="${housesTestLinks[4].url}">${housesTestLinks[4].text}</a></li>
    <li><a href="${housesTestLinks[5].url}">${housesTestLinks[5].text}</a></li>
    <li><a href="${housesTestLinks[6].url}">${housesTestLinks[6].text}</a></li>
    <li><a href="${housesTestLinks[7].url}">${housesTestLinks[7].text}</a></li>
  </ul>
`

const content = {
  headline: 'Popular Cities Headline',
  subHeadline: 'Popular Cities SubHeadline',
  apartmentsLinks,
  housesLinks,
}

const props = {
  content,
  initialVisibleLinks: 2,
}

const context = {
  theme: {
    HomePopularCities_Section: 'section',
    HomePopularLinks_Section: 'section',
  },
}

describe('ui/shared/components/Home/PopularCities', () => {
  it('server renders apartments HTML', () => {
    const wrapper = shallow(<PopularCities {...props} />, { context })
    const apartments = wrapper.render().find('.section').eq(0)
    expect(apartments.html()).toMatchSnapshot()
  })

  it('server renders houses HTML', () => {
    const wrapper = shallow(<PopularCities {...props} />, { context })
    const houses = wrapper.render().find('.section').eq(1)
    expect(houses.html()).toMatchSnapshot()
  })

  it('parses correct apartments links', () => {
    const wrapper = mount(<PopularCities {...props} />, { context })
    const apartments = wrapper.find('.section').at(0)
    expect(apartments.html()).toMatchSnapshot()
  })

  it('parses correct houses links', () => {
    const wrapper = mount(<PopularCities {...props} />, { context })
    const houses = wrapper.find('.section').at(1)
    expect(houses.html()).toMatchSnapshot()
  })
})
