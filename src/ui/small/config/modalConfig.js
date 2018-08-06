import {
  LEAD_MODAL_ID,
  THANK_YOU_MODAL_ID,
  GALLERY_MODAL_ID,
} from 'ui/shared/config/modal-const'

export const modalDefinitions = {
  [LEAD_MODAL_ID]: {
    name: 'LeadModal',
    resolve: () => import('ui/small/components/LeadModal'),
    overlay: true,
  },
  [THANK_YOU_MODAL_ID]: {
    name: 'ThankYouModal',
    resolve: () => import('ui/small/components/ThankYouModal'),
    overlay: true,
  },
  [GALLERY_MODAL_ID]: {
    name: 'GalleryModal',
    resolve: () => import('ui/small/components/GalleryModal'),
    overlay: true,
  },
}
