import * as React from 'react'
import tokenizeCss from 'simple-tokenizer'
import { themed } from 'react-themed-too'
import styles from './someThing.css'

const Button = ({ theme, ...props }: { theme: any }) => {
  return (
    <button className={theme.FooterLogo}>
      <h2>Big ass button</h2>
    </button>
  )
}

export default themed(/Footer/)(Button)