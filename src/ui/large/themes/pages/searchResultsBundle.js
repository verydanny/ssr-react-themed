// WARNING - applicationBundle must be imported first
// until some brittle css around Icons has been refactored
// changing applicationBundles order could cause problems with
// icon class specificity
import { compose } from 'react-themed'
import applicationBundle from 'ui/large/themes/pages/appBundle'
import BreadCrumbs from 'ui/large/themes/BreadCrumbs.css'
import Card from 'ui/large/themes/Card.css'
import ClampLines from 'ui/large/themes/ClampLines.css'
import Collapsible from 'ui/large/themes/Collapsible.css'
import CollapsibleSection from 'ui/large/themes/CollapsibleSection.css'
import Dfp from 'ui/shared/themes/Dfp.css'
import Favorite from 'ui/shared/themes/Favorite.css'
import ListFilters from 'ui/large/themes/Filters.css'
import FiltersButton from 'ui/large/themes/FiltersButton.css'
import Footer from 'ui/large/themes/Footer'
import GalleryGlobal from 'ui/shared/themes/gallery.global.css'
import GalleryNav from 'ui/shared/themes/GalleryNav.css'
import HdOverlay from 'ui/shared/themes/HdOverlay.css'
import Header from 'ui/large/themes/Header.css'
import SearchResultsLayout from 'ui/large/themes/layouts/SearchResults.css'
import LeadForm from 'ui/large/themes/LeadForm.css'
import LeadModal from 'ui/large/themes/LeadModal.css'
import List from 'ui/large/themes/List.css'
import LoadingCard from 'ui/large/themes/LoadingCard.css'
import LocalInfo from 'ui/large/themes/LocalInfo.css'
import MapControlsTheme from 'ui/shared/themes/MapControls.css'
import MapView from 'ui/large/themes/MapView.css'
import MoreFilters from 'ui/large/themes/MoreFilters.css'
import MoveInDate from 'ui/large/themes/MoveInDate.css'
import MoveInDateGlobal from 'ui/large/themes/MoveInDate.global.css'
import Nearby from 'ui/large/themes/Nearby.css'
import Overlay from 'ui/large/themes/Overlay.css'
import Pagination from 'ui/large/themes/Pagination.css'
import PinPopUp from 'ui/large/themes/PinPopUp.css'
import PriceInput from 'ui/large/themes/PriceInput.css'
import RatingBar from 'ui/shared/themes/RatingBar.css'
import RecommendedOrNearby from 'ui/large/themes/RecommendedOrNearby.css'
import SearchInput from 'ui/large/themes/SearchInput.css'
import SearchResults from 'ui/large/themes/SearchResults.css'
import SeoContent from 'ui/large/themes/SeoContent.css'
import SeoLinkList from 'ui/large/themes/SeoLinkList.css'
import SortFilter from 'ui/large/themes/SortFilter.css'
import ThankYouModal from 'ui/large/themes/ThankYouModal.css'
import ZeroResultsCard from 'ui/large/themes/ZeroResultsCard.css'
import ZoomControls from 'ui/large/themes/ZoomControls.css'

// STOP!!!
// please check app bundle to make sure we arent adding a theme twice
// this file will only add CSS for large SRPs
const searchResultsPageBundle = [
  ...applicationBundle,
  BreadCrumbs,
  Card,
  ClampLines,
  Collapsible,
  CollapsibleSection,
  Dfp,
  Favorite,
  FiltersButton,
  Footer,
  GalleryGlobal,
  GalleryNav,
  HdOverlay,
  Header,
  LeadForm,
  LeadModal,
  List,
  ListFilters,
  LoadingCard,
  LocalInfo,
  MapControlsTheme,
  MapView,
  MoreFilters,
  MoveInDate,
  MoveInDateGlobal,
  Nearby,
  Overlay,
  Pagination,
  PinPopUp,
  PriceInput,
  RatingBar,
  RecommendedOrNearby,
  SearchInput,
  SearchResults,
  SearchResultsLayout,
  SeoContent,
  SeoLinkList,
  SortFilter,
  ThankYouModal,
  ZeroResultsCard,
  ZoomControls,
]

export default compose({}, ...searchResultsPageBundle)
