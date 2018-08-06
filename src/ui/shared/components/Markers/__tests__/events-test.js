import 'rxjs'
import pickBy from 'lodash/pickBy'
import camelCase from 'lodash/camelCase'
import * as events from '../events'
import * as types from '../eventTypes'

const eventSubject = events.eventSubject
const emitters = pickBy(events, (_, key) => /^emitMarker/.test(key))

const eventNames = Object.keys(types).filter(key => /^MARKER_/.test(key)).sort()
const eventEmitters = eventNames.map(name => camelCase(`emitMarker${name.replace(/^MARKER_/, '')}`))

describe('ui/shared/components/Markers/events', () => {
  eventEmitters.forEach((emitName, index) => {
    describe(emitName, () => {
      const typeName = eventNames[index]
      const testMarker = Math.floor(Math.random() * 1000)

      it(`sends ${typeName} event`, done => {
        eventSubject.first().toPromise()
          .then(event => {
            expect(event.type).toBe(types[typeName])
            expect(event.marker).toBe(testMarker)
          })
          .then(() => done())

        emitters[emitName](null, null, testMarker)
      })
    })
  })
})
