import { compose } from 'react-themed-too'
import applicationBundle from './appBundle'

// STOP!!!
// please check app bundle to make sure we arent adding a theme twice
// this file will add CSS for detail pages on large app
const detailPageBundle = [
  ...applicationBundle,
]

export default compose({}, ...detailPageBundle)
