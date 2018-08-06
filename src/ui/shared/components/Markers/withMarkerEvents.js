import React, { PureComponent } from 'react'
import { Subject } from 'rxjs/Subject'
import { takeUntil } from 'rxjs/operators'
import { eventSubject } from './events'

export default function(BaseComponent) {
  class Container extends PureComponent {
    static displayName = `withMarkerEvents(${BaseComponent.displayName || BaseComponent.name || 'Component'})`

    constructor(props) {
      super(props)
      this.destroy = new Subject()
      this.observable = eventSubject.pipe(takeUntil(this.destroy))
    }

    componentWillUnmount() {
      this.destroy.next(true)
      this.destroy.unsubscribe()
    }

    render() {
      return (
        <BaseComponent
          markerObservable={this.observable}
          {...this.props}
        />
      )
    }
  }

  return Container
}
