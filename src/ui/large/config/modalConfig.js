import {
  LEAD_MODAL_ID,
  THANK_YOU_MODAL_ID,
  MORE_FILTERS_MODAL_ID,
  REGISTER_MODAL_ID,
} from 'ui/shared/config/modal-const'

export const modalDefinitions = {
  [LEAD_MODAL_ID]: {
    name: 'LeadModal',
    resolve: () => import('ui/large/components/LeadModal'),
    overlay: true,
  },
  [THANK_YOU_MODAL_ID]: {
    name: 'ThankYouModal',
    resolve: () => import('ui/large/components/ThankYouModal'),
    overlay: true,
  },
  [MORE_FILTERS_MODAL_ID]: {
    name: 'MoreFiltersModal',
    resolve: () => import('ui/large/components/MoreFiltersModal'),
    overlay: true,
  },
  [REGISTER_MODAL_ID]: {
    name: 'RegisterModal',
    resolve: () => import('ui/shared/components/RegistrationModal'),
    overlay: true,
  },
}
