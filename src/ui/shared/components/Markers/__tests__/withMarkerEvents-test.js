import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import { eventSubject } from '../events'
import withMarkerEvents from '../withMarkerEvents'

class BaseTestComponent extends Component {
  static propTypes = {
    markerObservable: PropTypes.object,
    callback: PropTypes.func,
  }

  componentDidMount() {
    const { markerObservable, callback } = this.props

    markerObservable.subscribe(callback)
  }

  render() {
    return null
  }
}

const TestComponent = withMarkerEvents(BaseTestComponent)

describe('ui/shared/components/Markers/withMarkerEvents', () => {
  it('passes through the eventSubject observable', () => {
    const callback = jest.fn()
    const event = { event: 'test' }
    const wrapper = mount(<TestComponent callback={callback} />)
    eventSubject.next(event)
    wrapper.unmount()
    expect(callback).toHaveBeenCalledWith(event)
  })

  it('unsubscribes when component is unmounted', () => {
    const callback = jest.fn()
    const firstEvent = { event: 'first test' }
    const secondEvent = { event: 'second test' }
    const thirdEvent = { event: 'third test' }
    const wrapper = mount(<TestComponent callback={callback} />)
    eventSubject.next(firstEvent)
    wrapper.unmount()
    eventSubject.next(secondEvent)
    wrapper.mount()
    eventSubject.next(thirdEvent)
    wrapper.unmount()
    expect(callback.mock.calls.length).toBe(2)
    expect(callback.mock.calls[0][0]).toBe(firstEvent)
    expect(callback.mock.calls[1][0]).toBe(thirdEvent)
  })
})
