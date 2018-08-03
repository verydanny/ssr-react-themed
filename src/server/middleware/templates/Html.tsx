import * as React from 'react'

export const HTML = ({ state, scripts, children }: { state: string, scripts: string[], children: string }) => {
  console.log(scripts)
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${ state }`
          }}
        />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.map((src) => {
          return <script key={src} src={src} />;
        })}
      </body>
    </html>
  )
}