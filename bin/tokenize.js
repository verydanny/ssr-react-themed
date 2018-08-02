const tokenizer = require('simple-tokenizer')

const tokenize = new tokenizer()

console.log(
  tokenize.tree('.someThing__Button--3jjHn {\n  color: orange;\nfont-size: 72px;\n}\n\n.someThing__Foo--1z4Jj {\n  color: blue;\n}')
)