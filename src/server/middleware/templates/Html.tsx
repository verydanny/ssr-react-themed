import * as React from 'react'
import dingus from 'ui/smallTheme';

type CssT = {
  css: string,
  mediaQueries: string
}

export const HTML = ({ state, scripts, css, children }: { state: string, scripts: string[], css: CssT, children: string }) => {
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var myCSS = document.createElement("link");
              myCSS.rel = "stylesheet";
              myCSS.href = "/reactThemedstyles/main.css";
              document.head.insertBefore(myCSS, document.head.childNodes[
                document.head.childNodes.length - 1
              ].nextSibling)
            `
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
