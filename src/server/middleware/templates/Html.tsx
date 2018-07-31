import * as React from 'react'
import render from 'react-dom/server'

type State = object

export const HTML = ({ state, children }: { state: State, children: React.ReactElement<React.ReactChildren> }) => {
  const content = render.renderToString( children )
  return (
    <html lang="en">
      <head>
        
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      </body>
    </html>
  )
}