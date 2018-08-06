import 'rxjs'
import pickBy from 'lodash/pickBy'
import camelCase from 'lodash/camelCase'
import * as events from '../events'
import * as types from '../eventTypes'

const eventSubject = events.eventSubject

const mapEmitters = pickBy(events, (_, key) => /^emitMap/.test(key))
const mapEventNames = Object.keys(types).filter(key => /^MAP_/.test(key)).sort()
const mapEventEmitters = mapEventNames.map(name => camelCase(`emitMap${name.replace(/^MAP_/, '')}`))

const dataEmitters = pickBy(events, (_, key) => /^emitData/.test(key))
const dataEventNames = Object.keys(types).filter(key => /^DATA_/.test(key)).sort()
const dataEventEmitters = dataEventNames.map(name => camelCase(`emitData${name.replace(/^DATA_/, '')}`))

describe('ui/shared/components/Map/events', () => {
  describe('Map Events', () => {
    mapEventEmitters.forEach((emitName, index) => {
      describe(emitName, () => {
        const typeName = mapEventNames[index]

        it(`sends ${typeName} event`, done => {
          eventSubject.first().toPromise()
            .then(event => expect(event.type).toBe(types[typeName]))
            .then(() => done())

          mapEmitters[emitName]()
        })
      })
    })
  })

  describe('Data Layer Events', () => {
    dataEventEmitters.forEach((emitName, index) => {
      describe(emitName, () => {
        const typeName = dataEventNames[index]

        it(`sends ${typeName} event`, done => {
          eventSubject.first().toPromise()
            .then(event => expect(event.type).toBe(types[typeName]))
            .then(() => done())

          dataEmitters[emitName]()
        })
      })
    })
  })
})
