import {
  catchAllRoutes,
  hoodRoutes,
  zipRoutes,
  detailRoutes,
} from 'routeExamples'
import { match } from '@rentpath/react-redux-router'
import sharedRoutes from 'ui/shared/routes'
import routes from '../routes'

const appRoutes = routes[0].routes

describe('routing', () => {
  it('matches for hood', () => {
    const actual = 'HOOD'
    hoodRoutes.forEach(async path => {
      const result = (await match({ routes: appRoutes, location: path })) || {}
      const expected = result.route.type
      expect(expected).toEqual(actual)
    })
  })

  it('matches for catchall', () => {
    const actual = 'CATCHALL'
    catchAllRoutes.forEach(async path => {
      const result = (await match({ routes: appRoutes, location: path })) || {}
      const expected = result.route.type
      expect(expected).toEqual(actual)
    })
  })

  it('matches for zip', () => {
    const actual = 'ZIP'
    zipRoutes.forEach(async path => {
      const result = (await match({ routes: appRoutes, location: path })) || {}
      const expected = result.route.type
      expect(expected).toEqual(actual)
    })
  })

  it('matches for detail', () => {
    const actual = 'DETAIL'
    detailRoutes.forEach(async path => {
      const result = (await match({ routes: appRoutes, location: path })) || {}
      const expected = result.route.type
      expect(expected).toEqual(actual)
    })
  })

  it('matches for detail', () => {
    const actual = 'DETAIL'
    detailRoutes.forEach(async path => {
      const result = (await match({ routes: appRoutes, location: path })) || {}
      const expected = result.route.type
      expect(expected).toEqual(actual)
    })
  })

  it('includes shared routes', () => {
    const collectName = obj => obj.name
    const sharedRouteNames = sharedRoutes.map(collectName)
    const smallRouteNames = appRoutes.map(collectName)
    expect(smallRouteNames).toEqual(expect.arrayContaining(sharedRouteNames))
  })
})
