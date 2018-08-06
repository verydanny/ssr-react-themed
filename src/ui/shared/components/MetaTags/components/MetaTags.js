import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Head } from '@rentpath/hive'

export default class MetaTags extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    robots: PropTypes.string,
    canonicalUrl: PropTypes.string,
    taggingRefinements: PropTypes.array,
    locationSlug: PropTypes.string,
    nextUrl: PropTypes.string,
    isDesktop: PropTypes.bool,
    previousUrl: PropTypes.string,
  }

  static defaultProps = {
    title: 'Apartments for Rent - Rent.com | Homes for Rent',
    description: 'Apartment rentals & houses for rent. ' +
      'Search millions of apartments for rent with Rent.com. ' +
      'Rent homes, cheap apartments, condos, and townhouses.',
    taggingRefinements: [],
  }

  get cityName() {
    const {
      locationSlug,
    } = this.props
    return locationSlug && locationSlug.split('/')[1]
  }

  get stateName() {
    const {
      locationSlug,
    } = this.props
    return locationSlug && locationSlug.split('/')[0]
  }

  render() {
    const {
      title,
      description,
      robots,
      canonicalUrl,
      taggingRefinements,
      locationSlug,
      isDesktop,
      nextUrl,
      previousUrl,
    } = this.props

    // We use an isDesktop Check here because we ran into timing issues
    // We should figure out a better way to approach this
    // TODO: Fix helmet, or find a replacement
    // Look more into running a portal into the head to populate our metatags
    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {
          isDesktop ?
            <meta name="viewport" content="width=1024" /> :
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            />
        }
        {robots &&
          <meta name="robots" content={robots} />
        }
        {taggingRefinements && taggingRefinements.length &&
          <meta name="refinement_array" content={taggingRefinements} />
        }
        {locationSlug &&
          <meta name="city" content={this.cityName} />
        }
        {locationSlug &&
          <meta name="state" content={this.stateName} />
        }
        {canonicalUrl &&
          <link rel="canonical" href={canonicalUrl} />
        }
        {nextUrl &&
          <link rel="next" href={nextUrl} />
        }
        {previousUrl &&
          <link rel="prev" href={previousUrl} />
        }
      </Head>
    )
  }
}
