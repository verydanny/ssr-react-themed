import App from 'ui/shared/themes/App.css'
import Typopgraphy from 'ui/shared/themes/typography'
import Button from 'ui/shared/themes/Button.css'
import Icon from 'ui/shared/themes/Icon.css'

// STOP!!!
// please check your page bundle to make sure we arent adding a theme twice
// this file will add CSS for ALL PAGES on large app
const applicationBundle = [
  App,
  Typopgraphy,
  Button,
  Icon,
]

export default applicationBundle
