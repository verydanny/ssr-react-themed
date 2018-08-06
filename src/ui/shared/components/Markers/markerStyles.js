import {
  PinIcon,
  SelectedPinIcon,
  InactivePinIcon,
  PdpPinLogoIcon,
} from './icons'

const BIG_PIN = {
  url: PinIcon,
  anchor: { x: 8, y: 8 },
  scaledSize: { width: 16, height: 16 },
}

const SMALL_PIN = {
  url: PinIcon,
  anchor: { x: 5, y: 5 },
  scaledSize: { width: 11, height: 11 },
}

const INACTIVE_PIN = {
  url: InactivePinIcon,
  anchor: { x: 5, y: 5 },
  scaledSize: { width: 11, height: 11 },
}

const SELECTED_BIG_PIN = {
  url: SelectedPinIcon,
  anchor: { x: 8, y: 8 },
  scaledSize: { width: 16, height: 16 },
}

const SELECTED_SMALL_PIN = {
  url: SelectedPinIcon,
  anchor: { x: 5, y: 5 },
  scaledSize: { width: 11, height: 11 },
}

export const PDP_LOGO_PIN = {
  url: PdpPinLogoIcon,
  anchor: { x: 28, y: 32 },
  scaledSize: { width: 56, height: 64 },
}

export const markerNormalIcon = ({ isActive, isPaid }) => {
  if (!isActive) return INACTIVE_PIN
  return isPaid ? BIG_PIN : SMALL_PIN
}

export const markerSelectedIcon = isPaid => (isPaid ? SELECTED_BIG_PIN : SELECTED_SMALL_PIN)
