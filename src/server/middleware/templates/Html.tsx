import * as React from 'react'

export const HTML = ({ state, scripts, css, children }: { state: string, scripts: string[], css: string, children: string }) => {

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${ state }`
          }}
        />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: css }}
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
