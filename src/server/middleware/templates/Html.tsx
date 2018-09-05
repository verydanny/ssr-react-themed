import * as React from 'react'

export const HTML = ({ state, scripts, css, children }: { state: string, scripts: string[], css: object, children: string }) => {
  
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
          dangerouslySetInnerHTML={{ __html: css.css }}
        />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: css.mediaQueries }}
        />
        <link  href="/styles/main.css" rel="prefetch stylesheet" />
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
