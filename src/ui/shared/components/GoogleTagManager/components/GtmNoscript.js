import React from 'react'
import { gtmIframe } from '@rentpath/event-tracker'
import config from 'config/tagging'

/* Turn off warning for dangerouslySetInnerHTML */
/* eslint-disable react/no-danger */

/**
 * Google Tag Manager requires a noscript element on the page
 * containing an iframe that loads a page from Google.
 * This noscript element must be rendered on the server
 * since the client will not run when javascript is disabled.
 */
const GtmNoscript = () => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: gtmIframe(config.googleTagManager),
    }}
  />
)

export default GtmNoscript
