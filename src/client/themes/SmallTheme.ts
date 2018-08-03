import { compose } from 'react-themed-too'
import * as Colors from 'ui/shared/themes/colors'
import Icon from 'ui/shared/themes/Icon.css'
import App from 'ui/shared/themes/App.css'
import GalleryNav from 'ui/shared/themes/GalleryNav.css'
import GalleryGlobal from 'ui/shared/themes/gallery.global.css'
import Typopgraphy from 'ui/shared/themes/typography'
import Button from 'ui/shared/themes/Button.css'
import MapControlsTheme from 'ui/shared/themes/MapControls.css'
import ViewToggleMenuTheme from 'ui/small/themes/ViewToggleMenu.css'
import DfpShared from 'ui/shared/themes/Dfp.css'
import RatingBar from 'ui/shared/themes/RatingBar.css'
import RatingSummary from 'ui/shared/themes/RatingSummary.css'
import Favorite from 'ui/shared/themes/Favorite.css'
import HdOverlay from 'ui/shared/themes/HdOverlay.css'
import HomeSearchInput from 'ui/shared/themes/HomeSearchInput.css'
import ToolTip from 'ui/shared/themes/ToolTip.css'
import ZoomInBanner from 'ui/shared/themes/ZoomInBanner.css'
import Overlay from './Overlay.css'
import HdOverlaySmall from './HdOverlaySmall.css'
import FilterPanel from './FilterPanel.css'
import ContentGallery from './ContentGallery.css'
import Form from './form/Form.css'
import RangeSlider from './form/RangeSlider.css'
import Counter from './form/Counter.css'
import Collapsible from './form/Collapsible.css'
import Checkboxes from './form/Checkboxes.css'
import RecommendedOrNearby from './RecommendedOrNearby.css'
import LeadForm from './LeadForm.css'
import LeadModal from './LeadModal.css'
import MoveInDate from './MoveInDate.css'
import ListingCard from './ListingCard.css'
import LoadingBanner from './LoadingBanner.css'
import Menu from './Menu.css'
import PDPAddress from './PDP/PDPAddress.css'
import PDPAmenities from './PDP/PDPAmenities.css'
import PDPRatings from './PDP/PDPRatings.css'
import PDPMap from './PDP/PDPMap.css'
import PDPSection from './PDP/PDPSection.css'
import PDPReview from './PDP/PDPReview.css'
import PDPReviewGallery from './PDP/PDPReviewGallery.css'
import PDPSectionList from './PDP/PDPSectionList.css'
import PDPToolTip from './PDP/PDPToolTip.css'
import ThankYouModal from './ThankYouModal.css'
import TotalCountBanner from './TotalCountBanner.css'
import Views from './Views.css'
import CollapsibleSection from './CollapsibleSection.css'
import SeoContent from './SeoContent.css'
import LocalInfo from './LocalInfo.css'
import ClampLines from './ClampLines.css'
import Nearby from './Nearby.css'
import SeoLinkList from './SeoLinkList.css'
import CtaButton from './CtaButton.css'
import BreadCrumbs from './BreadCrumbs.css'
import MarkerSelector from './MarkerSelector.css'
import Homepage from './Homepage.css'
import HomeSections from './HomeSections.css'
import HomePopularLinks from './HomePopularLinks.css'
import Header from './Header.css'
import Footer from './Footer'
import CategoryRatings from './CategoryRatings.css'
import PDPView from './PDP/PDPView.css'
import PDPFooter from './PDP/PDPFooter.css'
import PDPHeader from './PDP/PDPHeader.css'
import PDPDetailHeader from './PDP/PDPDetailHeader.css'
import PDPKeyInfo from './PDP/PDPKeyInfo.css'
import PDPMapToggleButton from './PDP/PDPMapToggleButton.css'
import PDPGallery from './PDP/PDPGallery.css'
import PDPPetPolicy from './PDP/PDPPetPolicy.css'
import PDPLeasingTerms from './PDP/PDPLeasingTerms.css'
import GalleryModal from './GalleryModal.css'
import PDPFloorplans from './PDP/PDPFloorplans.css'
import { PriceFilterCard, FilterCard, Card, RadioButton, RadioGroup, ApplyButton } from './FilterCards'

export default compose({},
  App,
  // TODO: remove me in next pr
  // https://github.com/rentpath/rent-js/pull/1203
  Icon,
  Typopgraphy,
  Overlay,
  Views,
  Button,
  MapControlsTheme,
  ViewToggleMenuTheme,
  FilterPanel,
  Header,
  Footer,
  Form,
  Counter,
  Collapsible,
  Checkboxes,
  ContentGallery,
  RangeSlider,
  DfpShared,
  RecommendedOrNearby,
  GalleryGlobal,
  GalleryNav,
  GalleryModal,
  LeadForm,
  LeadModal,
  MoveInDate,
  ListingCard,
  LoadingBanner,
  Menu,
  PDPAddress,
  PDPAmenities,
  PDPRatings,
  PDPMap,
  PDPPetPolicy,
  PDPSection,
  PDPSectionList,
  ThankYouModal,
  ToolTip,
  TotalCountBanner,
  CollapsibleSection,
  SeoContent,
  LocalInfo,
  ClampLines,
  Nearby,
  SeoLinkList,
  Colors,
  BreadCrumbs,
  CtaButton,
  RatingBar,
  RatingSummary,
  CategoryRatings,
  MarkerSelector,
  Favorite,
  Homepage,
  HomeSections,
  HomePopularLinks,
  HdOverlay,
  HdOverlaySmall,
  PDPView,
  PDPFooter,
  PDPHeader,
  PDPDetailHeader,
  PDPKeyInfo,
  PDPReview,
  PDPReviewGallery,
  PDPMapToggleButton,
  PDPGallery,
  PDPLeasingTerms,
  HomeSearchInput,
  PDPFloorplans,
  PDPToolTip,
  ZoomInBanner,
  PriceFilterCard,
  FilterCard,
  Card,
  RadioButton,
  RadioGroup,
  ApplyButton,
)
