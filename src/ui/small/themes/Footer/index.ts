import { compose } from 'react-themed-too'
import Footer from './Footer.css'
import FooterLogo from './FooterLogo.css'
import FooterLinks from './FooterLinks.css'
import FooterSocial from './FooterSocial.css'
import FooterApps from './FooterApps.css'
import FooterCopyright from './FooterCopyright.css'
import FooterEqualHousing from './FooterEqualHousing.css'

const composed = compose({},
  FooterLogo,
  FooterLinks,
  FooterSocial,
  FooterApps,
  FooterCopyright,
  FooterEqualHousing,
  Footer
)

export default composed
