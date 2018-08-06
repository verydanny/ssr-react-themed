import React from 'react'
import { shallow, mount } from 'enzyme'
import ThemedBreadCrumbs from '../BreadCrumbs'

const BreadCrumbs = ThemedBreadCrumbs.WrappedComponent

describe('BreadCrumbs', () => {
  const defaultProps = {
    state: {
      name: 'New York',
      slug: 'new-york',
    },
    city: {
      name: 'New York',
      slug: 'new-york',
    },
    headingText: 'Aliens have arrived',
    singlePropertyType: true,
  }

  it('is collapsed by default', () => {
    const wrapper = mount(<BreadCrumbs {...defaultProps} />)
    const expected = true
    const actual = wrapper.state().collapsed
    expect(actual).toBe(expected)
  })

  it('requires propertyType to render', () => {
    const wrapper = mount(<BreadCrumbs />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('is un-collapsed when expand-crumbs btn clicked', () => {
    const wrapper = mount(<BreadCrumbs {...defaultProps} />)
    const crumb = wrapper.find('[data-tid="expand-crumbs"]')
    crumb.simulate('click')
    const expected = false
    const actual = wrapper.state().collapsed
    expect(actual).toEqual(expected)
  })

  describe('state+city, college, or military search', () => {
    const props = {
      ...defaultProps,
      hoodLanderUrl: defaultProps.city.slug,
    }
    it('renders collapsed', () => {
      const wrapper = shallow(<BreadCrumbs {...props} />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders exapanded', () => {
      const wrapper = shallow(<BreadCrumbs
        {...props}
        collapsed={false}
      />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('zip search', () => {
    const props = {
      ...defaultProps,
      zip: '12345',
      hoodLanderUrl: defaultProps.city.slug,
    }

    it('renders collapsed', () => {
      const wrapper = shallow(<BreadCrumbs
        {...props}
      />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders exapanded', () => {
      const wrapper = shallow(<BreadCrumbs
        {...props}
        collapsed={false}
      />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('hood search', () => {
    const props = {
      ...defaultProps,
      hood: {
        name: 'Greenwich Village',
        slug: 'greenwich-village',
      },
      hoodLanderUrl: defaultProps.city.slug,
    }

    it('renders collapsed', () => {
      const wrapper = shallow(<BreadCrumbs
        {...props}
      />)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders exapanded', () => {
      const wrapper = shallow(<BreadCrumbs
        {...props}
        collapsed={false}
      />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
