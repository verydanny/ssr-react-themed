import * as React from 'react'
import styles from './someThing.css'
import tokenizeCss from 'simple-tokenizer'
import { themed } from 'react-themed-too'

const Button = ({ theme, ...props }: { theme: any }) => (
  <button className={theme.Button}>
    <h2>Big ass button</h2>
  </button>
)

export default themed('Button')(Button)