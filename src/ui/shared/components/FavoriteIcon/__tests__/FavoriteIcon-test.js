import React from 'react'
import { shallow } from 'enzyme'
import FavoriteIconThemed from '../FavoriteIcon'

const FavoriteIcon = FavoriteIconThemed.WrappedComponent

const theme = {
  Favorite: 'themedclass1',
  'Favorite-on': 'themedclass2',
}

const props = {
  theme,
  onClick: jest.fn(),
  isFavorite: false,
}

describe('FavoriteIcon', () => {
  describe('when user clicks the icon', () => {
    const component = shallow(<FavoriteIcon {...props} />)
    component.find('button').simulate('click')

    it('calls the onClick handler', () => {
      expect(props.onClick).toBeCalled()
    })
  })

  describe('when it is not a favorite', () => {
    const component = shallow(<FavoriteIcon {...props} />)

    it('has the expected data-tag_selection attribute', () => {
      const selection = component.find('button[data-tag_selection="save"]')
      expect(selection.length).toBe(1)
    })

    it('does not have the active classname', () => {
      expect(component.find('button').hasClass(theme['Favorite-on'])).toBe(false)
    })

    it('sets data-tid for e2e testing', () => {
      const selection = component.find('button[data-tid="Favorite-off"]')
      expect(selection.length).toBe(1)
    })
  })

  describe('when it is a favorite', () => {
    const overrideProps = { ...props, isFavorite: true }
    const component = shallow(<FavoriteIcon {...overrideProps} />)

    it('has the expected data-tag_selection attribute', () => {
      const selection = component.find('button[data-tag_selection="unsave"]')
      expect(selection.length).toBe(1)
    })

    it('has the active classname', () => {
      expect(component.find('button').hasClass(theme['Favorite-on'])).toBe(true)
    })

    it('sets data-tid for e2e testing', () => {
      const selection = component.find('button[data-tid="Favorite-on"]')
      expect(selection.length).toBe(1)
    })
  })
})
