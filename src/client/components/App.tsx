import * as React from 'react'
import style from './someThing.css'

console.log(JSON.stringify(style.toString()))

export default () => (
  <div className={style.someOtherThing}>Just testing</div>
)