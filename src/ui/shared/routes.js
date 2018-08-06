import { dynamic } from '@rentpath/hive'

const Features = dynamic({
  resolve: () => import('ui/shared/pages/Features'),
})

const StyleGuide = dynamic({
  resolve: () => import('ui/shared/pages/StyleGuide/StyleGuide'),
})

const Iconography = dynamic({
  resolve: () => import('ui/shared/pages/StyleGuide/Iconography'),
})

const Colors = dynamic({
  resolve: () => import('ui/shared/pages/StyleGuide/Colors'),
})

const Typography = dynamic({
  resolve: () => import('ui/shared/pages/StyleGuide/Typography'),
})

const CardsStyleGuide = dynamic({
  resolve: () => import('ui/shared/pages/StyleGuide/Cards'),
})

const Buttons = dynamic({
  resolve: () => import('ui/shared/pages/StyleGuide/Buttons'),
})

const PaginationLarge = dynamic({
  resolve: () => import('ui/shared/pages/StyleGuide/PaginationLarge'),
})

export default [
  {
    path: '/_features',
    name: 'FEATURES',
    component: Features,
  },
  {
    path: '/_styleguide',
    name: 'STYLEGUIDE',
    component: StyleGuide,
  },
  {
    path: '/_styleguide/icons',
    name: 'STYLEGUIDE_ICONS',
    component: Iconography,
  },
  {
    path: '/_styleguide/colors',
    name: 'STYLEGUIDE_COLORS',
    component: Colors,
  },
  {
    path: '/_styleguide/typography',
    name: 'STYLEGUIDE_TYPOGRAPHY',
    component: Typography,
  },
  {
    path: '/_styleguide/cards',
    name: 'STYLEGUIDE_CARDS',
    component: CardsStyleGuide,
  },
  {
    path: '/_styleguide/buttons',
    name: 'STYLEGUIDE_BUTTONS',
    component: Buttons,
  },
  {
    path: '/_styleguide/pagination_large',
    name: 'STYLEGUIDE_PAGINATION_LARGE',
    component: PaginationLarge,
  },
]
