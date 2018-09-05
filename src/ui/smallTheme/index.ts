import { compose } from 'react-themed-too'
import Header from './Header.scss'
import Footer from './Footer.scss'
import Dingus from './Dingus.scss'
import Something from './Something.css'

const dingus = compose({},
  Something,
  Header,
  Footer,
  Dingus
)

export default dingus