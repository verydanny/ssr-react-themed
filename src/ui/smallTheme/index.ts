import { compose, addGlobalCss } from 'react-themed-too'
import Header from './Header.scss'
import Footer from './Footer.scss'
import Dingus from './Dingus.scss'
import Something from './Something.css'
import normalize from './normalize.css'
import otherGlobal from './otherGlobal.css'

addGlobalCss(
  normalize,
  otherGlobal
)

const dingus = compose({},
  Something,
  Header,
  Footer,
  Dingus
)

export default dingus