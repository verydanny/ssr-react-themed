import { compose } from 'react-themed'
import Collapsible from 'ui/large/themes/Collapsible.css'
import Footer from 'ui/large/themes/Footer'
import HomePopularLinks from 'ui/large/themes/HomePopularLinks.css'
import HomeSearchInput from 'ui/shared/themes/HomeSearchInput.css'
import Header from 'ui/large/themes/Header.css'
import HomeSections from 'ui/large/themes/HomeSections.css'
import Homepage from 'ui/large/themes/Homepage.css'
import SearchInput from 'ui/large/themes/SearchInput.css'
import applicationBundle from './appBundle'

// STOP!!!
// please check app bundle to make sure we arent adding a theme twice
// this file will only add CSS for large homepage
const homePageBundle = [
  ...applicationBundle,
  Collapsible,
  Footer,
  Header,
  HomePopularLinks,
  HomeSearchInput,
  HomeSections,
  Homepage,
  SearchInput,
]

export default compose({}, ...homePageBundle)
