import React from 'react'
import { Link } from '@rentpath/react-redux-router'
import theme from './StyleGuide.css'

export default () => (
  <div className={theme.LinkList} data-tid="style-guide-header">
    <h1>Style Guide</h1>
    <Link to="/_styleguide/icons" data-tid="icons-link">Icon Style Guide</Link>
    <Link to="/_styleguide/colors">Colors Style Guide</Link>
    <Link to="/_styleguide/typography">Typography Style Guide</Link>
    <Link to="/_styleguide/cards">Cards Style Guide</Link>
    <Link to="/_styleguide/buttons">Buttons Style Guide</Link>
    <Link to="/_styleguide/pagination_large">Pagination Large Style Guide</Link>
  </div>
)
