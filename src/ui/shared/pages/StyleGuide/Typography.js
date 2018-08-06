import React from 'react'
import theme from 'ui/shared/themes/typography'
import guideTheme from './Typography.css'

const typography = [
  {
    name: 'h1',
    desc: 'Nunitosans-Extrabold / 28 px / 34 px Leading',
    tag: 'h2',
  },
  {
    name: 'h2',
    desc: 'Nunitosans - Bold / 18 px / 22 px Leading / Universal Grey',
    tag: 'h2',
  },
  {
    name: 'h3',
    desc: 'Nunitosans - Light / 18 px / 22 px Leading / Grey 1',
    tag: 'h3',
  },
  {
    name: 'h4',
    desc: 'Nunitosans - Semibold / 15 px / 18 px Leading / Universal Grey',
    tag: 'h4',
  },
  {
    name: 'Title 1',
    desc: 'Nunitosans-Regular / 14 px / 34 px Leading / Universal Grey',
    style: theme['Title-sm-semibold'],
  },
  {
    name: 'Title 2',
    desc: 'Nunitosans-Semibold / 12 px / 15 px Leading / Universal Grey',
    style: theme['Title-md-light'],
  },
  {
    name: 'Title 3',
    desc: 'Nunitosans-Semibold / 12 px / 14 px Leading / Black (40%)',
    style: theme['Title-md-semilight'],
  },
  {
    name: 'Button',
    desc: 'Nunitosans-Bold / 15 px / 18 px Leading / Rent.com Blue',
    style: theme['Button-lg-bold'],
  },
  {
    name: 'Button 2',
    desc: 'Nunitosans-Semibold / 14 px / 18 px Leading / Rent.com Blue',
    style: theme['Button-lg-semibold'],
  },
  {
    name: 'Text 1',
    desc: 'Nunitosans-Regular / 14 px / 18 px Leading / Universal Grey',
    style: theme['Text-md-semibold'],
  },
  {
    name: 'Text 2',
    desc: 'Nunitosans-Light / 14 px / 17 px Leading / Universal Grey',
    style: theme['Text-sm-light'],
  },
  {
    name: 'Text 3',
    desc: 'Nunitosans-Regular / 13 px / 18 px Leading / Grey 1',
    style: theme['Text-md-light'],
  },
  {
    name: 'Text 4',
    desc: 'Nunitosans-Regular / 13 px / 16 px Leading / Universal Grey',
    style: theme['Text-md-semilight'],
  },
  {
    name: 'link',
    desc: 'Nunitosans-Regular / 13 px / 16 px Leading / Rent.com Blue',
    style: theme.Link,
  },
  {
    name: 'Text 6',
    desc: 'Nunitosans-Regular / 12 px / 14 px Leading / Universal Grey',
    style: theme['Text-md-light'],
  },
  {
    name: 'Text 7',
    desc: 'Nunitosans-Regular / 15 px / 18 px Leading / Universal Grey',
    style: theme['Text-md-bold'],
  },
  {
    name: 'caption',
    desc: 'Nunitosans-Semibold / 10 px / 12 px Leading / Black (50%)',
    style: theme.Caption,
  },
]

const TagName = (tag = 'div', children) => React.createElement(tag, null, children)

export default () => (
  <div>
    <h1 className={guideTheme.Header} data-tid="typography-header">Typography</h1>
    <div fluid>
      {typography.map(type => (
        <div key={type.name} className={guideTheme.Row}>
          <div className={guideTheme.Name}>
            <div className={type.style}>
              {TagName(type.tag, type.name)}
            </div>
          </div>
          <div className={guideTheme.Desc}>
            <div className={type.style}>
              {TagName(type.tag, type.desc)}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
