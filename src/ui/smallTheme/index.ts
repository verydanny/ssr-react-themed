import { compose } from 'react-themed-too'
import Header from './Header.scss'
import Footer from './Footer.scss'
import Dingus from './Dingus.scss'

const dingus = compose({},
  Header,
  Footer,
  Dingus
)

console.log(dingus)

export default dingus