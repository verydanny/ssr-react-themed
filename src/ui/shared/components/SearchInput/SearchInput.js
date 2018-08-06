import React, { Component } from 'react'
import PropTypes, { instanceOf } from 'prop-types'
import classNames from 'classnames'
import { Cookies } from 'react-cookie'
import { setSearchTerm, removeSearchTerm } from 'lib/cookies/cookieManager'
import autobind from 'autobind-decorator'
import { Icon } from 'ui/shared/components/Icon'
import { close } from 'ui/shared/components/Icon/svgs/global'
import mapMarker from 'ui/shared/components/Icon/svgs/map/mapMarker.svg'

import Location from './Location'
// NOTE: these are actually the small styles!!! ahhh!
// remove in next PR
import defaultStyles from './SearchInput.css'

const ESC = 27
const ENTER = 13
const ARROW_UP = 38
const ARROW_DOWN = 40

// Placeholder to display if user pans the map
const PLACEHOLDER_ON_LOCATION_CHANGE = 'Map Location'

export default class SearchInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    locationInputClassName: PropTypes.string,
    cookies: instanceOf(Cookies).isRequired,
    currentSearch: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    refinementSlug: PropTypes.string,
    propertyType: PropTypes.string,
    selectLocation: PropTypes.func.isRequired,
    theme: PropTypes.object,
    suggestedLocations: PropTypes.array,
    onFocus: PropTypes.func,
    updateSearch: PropTypes.func.isRequired,
    clearSearch: PropTypes.func,
    queryParams: PropTypes.object,
    searchIconName: PropTypes.string,
    refinement: PropTypes.string,
    showSearch: PropTypes.bool,
    showBorder: PropTypes.bool,
    onSearchEnter: PropTypes.func,
    defaultSearch: PropTypes.shape({
      displayName: PropTypes.string,
      locationSlug: PropTypes.string,
    }),
    showError: PropTypes.bool,
    removeSpace: PropTypes.bool,
  }

  static defaultProps = {
    name: 'searchInput',
    placeholder: 'Neighborhood, Zip or City',
    theme: defaultStyles,
    searchIconName: 'close',
    defaultSearch: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      activeSearchLocation: props.defaultSearch.displayName || '',
      inputFocused: false,
      activeIndex: 0,
      errorMessage: '',
    }
  }

  componentDidMount() {
    // no locationSlug = no displayName
    const { queryParams, defaultSearch } = this.props

    if (queryParams.boundingbox) {
      this.updateSearchTermUI(PLACEHOLDER_ON_LOCATION_CHANGE, false)
    } else if (defaultSearch.locationSlug && defaultSearch.displayName) {
      this.updateSearchTermUI(defaultSearch.displayName, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { defaultSearch, queryParams } = nextProps

    if (queryParams.boundingbox) {
      this.updateSearchTermUI(PLACEHOLDER_ON_LOCATION_CHANGE, false)
    } else if (defaultSearch !== this.props.defaultSearch) {
      this.updateSearchTermUI(defaultSearch.displayName)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  @autobind
  onFocus() {
    this.setState({ inputFocused: true, activeSearchLocation: null })
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus()
    }
    document.addEventListener('click', this.handleOutsideClick, false)
  }

  @autobind
  onBlur() {
    // TODO:
    this.setState({ inputFocused: false })
  }

  @autobind
  onKeyDown(event) {
    const { onSearchEnter } = this.props
    const { activeIndex } = this.state

    switch (event.keyCode) {
      case ARROW_DOWN:
        this.activateLocation(activeIndex + 1)
        break
      case ARROW_UP:
        this.activateLocation(activeIndex - 1)
        break
      case ENTER:
        if (this.submitResult(this.suggestedLocationAt(activeIndex)) && onSearchEnter) {
          onSearchEnter()
        }
        break
      case ESC:
        this.resetLocations()
        break
      default:
    }
  }

  @autobind
  onSuggestionHover(event) {
    const key = Number(event.target.getAttribute('data-key'))
    this.activateLocation(key)
  }

  @autobind
  onSuggestionClick(event) {
    const key = Number(event.currentTarget.getAttribute('data-key'))
    this.submitResult(this.suggestedLocationAt(key))
  }

  @autobind
  onSubmit(event) {
    event.preventDefault()
    const { currentSearch, defaultSearch } = this.props

    if (!currentSearch) {
      this.submitResult(defaultSearch)
    } else {
      // if search button is pressed rather than selecting an
      // item from the suggestions, use the first suggestion
      const firstSuggestion = this.suggestedLocationAt(0)
      this.submitResult(firstSuggestion)
    }
  }

  get placeholder() {
    const { defaultSearch, queryParams, placeholder } = this.props

    if (queryParams.boundingbox) {
      return PLACEHOLDER_ON_LOCATION_CHANGE
    }
    return defaultSearch.displayName || placeholder || ''
  }

  @autobind
  setStoredTerm(term) {
    const { cookies } = this.props

    if (term) setSearchTerm(term)(cookies)
  }

  @autobind
  removeStoredTerm() {
    const { cookies } = this.props

    removeSearchTerm()(cookies)
  }

  @autobind
  handleOutsideClick(event) {
    if (this.input.contains(event.target)) return

    this.resetLocations()
  }

  @autobind
  submitResult(location) {
    this.setState({ errorMessage: '' })

    if (!(location && location.locationSlug) && this.props.currentSearch !== '') {
      if (this.props.showError) {
        this.setState({ errorMessage: 'Check your inquiry or try a different city or neighborhood' })
      }
      this.taggingError()
      return false
    }

    // quickly update search input
    if (location && location.displayName) {
      this.input.placeholder = location.displayName
      if (location.displayName) this.updateSearchTermUI(location.displayName)

      this.selectLocation(location)
      this.input.blur()
      this.setState({ inputFocused: false })
    }

    return true
  }

  taggingError() {
    const data = {
      validation_error: [this.props.currentSearch],
      selection: 'search_validation',
      section: 'search_input',
    }

    if (window.eventTracker) { window.eventTracker.track('error', data) }
  }

  @autobind
  clearSearchInput() {
    this.props.updateSearch()
    this.input.focus()
  }

  @autobind
  updateSearchTermUI(searchTerm, store = true) {
    this.setState({ activeSearchLocation: searchTerm })
    if (store) {
      this.setStoredTerm(searchTerm)
    }
  }

  @autobind
  resetLocations() {
    this.props.clearSearch()
  }

  activateLocation(key) {
    const location = this.suggestedLocationAt(key)

    if (location) {
      this.setState({
        activeIndex: key,
      })
    }
  }

  @autobind
  selectLocation(location) {
    if (!location) return

    this.clearSearchInput()

    const {
      propertyType,
      refinementSlug,
      selectLocation,
      queryParams,
      refinement,
    } = this.props

    const defaultRefinements =
      !propertyType && !refinementSlug
        ? 'apartments_condos_houses_townhouses'
        : ''

    const refinements = refinement || refinementSlug || defaultRefinements

    if (selectLocation && location) {
      selectLocation({
        ...location,
        propertyType,
        queryParams,
        refinementSlug: refinements,
      })
    }
  }

  suggestedLocationAt(index) {
    return this.props.suggestedLocations[index]
  }

  locations() {
    const {
      theme,
      suggestedLocations,
      showSearch,
      showBorder,
    } = this.props

    return (
      (suggestedLocations && !!suggestedLocations.length) &&
      <div className={(showSearch && !showBorder) ?
        classNames(theme.LocationResults, theme.LocationResults_home) : theme.LocationResults}
      >
        {suggestedLocations.map((item, key) =>
          (<span key={`wrapper${key}`} className={theme.LocationResults_itemWrapper}>
            <Icon key={`icon${key}`} svgs={{ mapMarker }} className={theme.LocationResults_itemIcon} />
            <Location
              key={key}
              data-key={key}
              data-tag_item="search_location_name"
              data-tag_selection={item.displayName}
              location={item}
              onClick={this.onSuggestionClick}
              onMouseEnter={this.onSuggestionHover}
              className={classNames({
                [theme.LocationResults_item]: true,
                [theme['LocationResults_item-active']]: key === this.state.activeIndex,
              })}
            />
          </span>)
        )}
      </div>
    )
  }

  render() {
    const {
      className,
      theme,
      name,
      updateSearch,
      currentSearch,
      searchIconName,
      showSearch,
      locationInputClassName,
      showError,
      removeSpace,
    } = this.props

    const { activeSearchLocation, inputFocused, errorMessage } = this.state
    const locationInput = locationInputClassName || theme.LocationInput
    const formClassName = className || theme.LocationInput_border
    const searchInputTheme = removeSpace ? '' : theme.SearchInput
    return (
      <div
        className={searchInputTheme}
      >
        <form
          action="?"
          onSubmit={this.onSubmit}
          className={formClassName}
          data-tag_section="search_input"
        >
          <input
            data-tid="search-location"
            type="search"
            name={name}
            ref={node => {
              this.input = node
            }}
            aria-label="Search"
            value={currentSearch}
            className={classNames(locationInput,
              { [theme.SearchInput_error]: errorMessage })
            }
            placeholder={this.placeholder}
            onChange={updateSearch}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            data-tag_item="search_bar"
            autoComplete="off"
            autoCorrect="off"
          />
          {this.locations()}
          {!showSearch && (
            <Icon
              svgs={{ close }}
              hidden={
                inputFocused || !activeSearchLocation
              }
              name={searchIconName}
              className={theme.LocationInput_searchIcon}
              data-test-id="search-button"
              data-tag_item="search_button"
              onClick={this.clearSearchInput}
            />
          )}
          {showSearch && (
            <button
              data-tid="home_search_button"
              data-tag_item="search_location_name"
              className={theme.LocationInput_submit}
              onClick={this.onSubmit}
            >
              Search
            </button>
          )}
        </form>
        {
          showError && errorMessage !== '' &&
          <div className={theme.Error_Message} data-tid="error_message">
            {errorMessage}
          </div>
        }
      </div>
    )
  }
}
