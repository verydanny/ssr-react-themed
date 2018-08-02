declare module 'simple-tokenizer' {
  export interface Options {
    splitRules?: boolean
    ignoreErrors?: boolean 
    lessSyntax?: boolean 
    ruleModifiers?: string[]
  }

  export default class Tokenizer {
    constructor({ splitRules, ignoreErrors, lessSyntax, ruleModifiers }: Options)

    tree(css: string): object[]

    tokenize(css: string): object[]
  }
}