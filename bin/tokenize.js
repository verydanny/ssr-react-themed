const tokenizer = require('simple-tokenizer')

const tokenize = new tokenizer()

console.log(
  tokenize.tokenize('.someThing__Button--3jjHn {\n  color: orange;\n  font-size: 92px;\n  font-weight: bold;\n}\n\n.someThing__Foo--1z4Jj {\n  color: blue;\n}\n\n@media (min-width: 765px) {\n  .someThing__Button--3jjHn {\n    color: pink;\n    font-size: 72px;\n    background: url(\'\') no-repeat center;\n  }\n}')
)