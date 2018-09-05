import * as React from 'react'
import { themed } from 'react-themed-too'

@themed('*')
export default class Footer extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { theme } = this.props

    return (
      <div className={theme.Footer}>
        <div className={theme.Text}>This is the footer</div>
      </div>
    )
  }
}
