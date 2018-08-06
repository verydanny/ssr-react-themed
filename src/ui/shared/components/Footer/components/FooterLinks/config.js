/**
 * Configuration for footer links
 */
const config = [
  {
    heading: 'Our Company',
    testId: 'our-company',
    links: [
      {
        text: 'About Us',
        tag: 'about_us',
        url: '/company/company-overview/',
      },
      {
        text: 'Press & Media',
        tag: 'media_contact',
        url: '/company/press/contacts/',
      },
      {
        text: 'Careers',
        tag: 'careers',
        url: '/careers/jobs/',
      },
      {
        text: 'Privacy Policy',
        tag: 'privacy_policy',
        url: '/company/privacy-full/',
      },
      {
        text: 'Terms of Service',
        tag: 'terms_of_service',
        url: '/company/legal/termsofservice/',
      },
    ],
  },
  {
    heading: 'Popular Searches',
    testId: 'popular-searches',
    links: [
      {
        text: 'Popular Cities',
        tag: 'popular_city',
        url: '/apartments-by-city',
      },
      {
        text: 'Search by State',
        tag: 'us_state',
        url: '/search-by-state',
      },
      {
        text: 'Rental Type',
        tag: 'rental_type',
        url: '/rentals-by-type',
      },
      {
        text: 'College & University',
        tag: 'college_university',
        url: '/off-campus-housing',
      },
      {
        text: 'Military Base',
        tag: 'military',
        url: '/housing-near-military-base',
      },
    ],
  },
  {
    heading: 'Let Us Help',
    testId: 'let-us-help',
    links: [
      {
        text: 'Help for Renters',
        tag: 'renter_help',
        url: '/company/renter-help/',
      },
      {
        text: 'Avoid Scams',
        tag: 'rental_safety',
        url: '/company/security/',
      },
      {
        text: 'List a Property',
        tag: 'list_a_property',
        url: '/manage',
      },
      {
        text: 'Contact Support',
        tag: 'contact_support',
        url: '/company/renter-help/',
      },
      {
        text: 'Site Map',
        tag: 'sitemap',
        url: '/sitemap',
      },
    ],
  },
]

export default config
