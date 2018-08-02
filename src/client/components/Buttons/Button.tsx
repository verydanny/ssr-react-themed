import * as React from 'react'
import themed from 'react-themed'
import styles from './someThing.css'
import tokenizeCss from 'simple-tokenizer'

const tokenize = new tokenizeCss({})
const theCssString = styles.toString()

const tokenizedCss = tokenize.tree(theCssString)

tokenizedCss.map((item) => console.log(item))

export default () => {
  return (
    <button>
      <h2>I'm one big dinger</h2>
    </button>
  )
}
