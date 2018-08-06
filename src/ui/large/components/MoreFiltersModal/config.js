import identity from 'lodash/identity'
import always from 'lodash/constant'
import getOr from 'lodash/fp/getOr'
import get from 'lodash/fp/get'

const petsTagMap = {
  catFriendly: 'cats_ok',
  dogFriendly: 'dogs_ok',
  petFriendly: 'cats_dogs_ok',
  noPets: 'no_pets',
}

const bedsTagMap = {
  '0beds': 0,
  '1beds': 1,
  '2beds': 2,
  '3beds': 3,
  '4beds': 4,
}

const bathsTagMap = {
  '0baths': 0,
  '1baths': 1,
  '2baths': 2,
  '3baths': 3,
}

export const tagMap = {
  propertyTypes: identity,
  pets: name => get(name)(petsTagMap),
  amenities: always('amenities'),
  baths: name => get(name)(bathsTagMap),
  beds: name => get(name)(bedsTagMap),
}

export const getTagItem = (group, name) => getOr(always(''), group)(tagMap)(name)

export default {
  propertyTypes: [
    { label: 'Apartments', name: 'apartments', tagItem: 'apartments' },
    { label: 'Townhouses', name: 'townhouses', tagItem: 'townhouses' },
    { label: 'Condos', name: 'condos', tagItem: 'condos' },
    { label: 'Houses', name: 'houses', tagItem: 'houses' },
  ],
  amenities: [
    { label: 'Air Conditioning', name: 'airConditioning', tagItem: 'amenities' },
    { label: 'Balcony, Patio, Deck', name: 'patio', tagItem: 'amenities' },
    { label: 'Cable Ready', name: 'cableReady', tagItem: 'amenities' },
    { label: 'Controlled Access', name: 'controlledLimitedAccess', tagItem: 'amenities' },
    { label: 'Dishwasher', name: 'dishwasher', tagItem: 'amenities' },
    { label: 'Elevator', name: 'elevator', tagItem: 'amenities' },
    { label: 'Extra Storage', name: 'extraStorage', tagItem: 'amenities' },
    { label: 'Disability Access', name: 'handicapAccess', tagItem: 'amenities' },
    { label: 'Hardwood Floors', name: 'hardwoodFloor', tagItem: 'amenities' },
    { label: 'Laundry Facility', name: 'laundryFacility', tagItem: 'amenities' },
    { label: 'Onsite Personnel', name: 'onsitePersonnel', tagItem: 'amenities' },
    { label: 'Pool', name: 'pool', tagItem: 'amenities' },
    { label: 'Fitness Center', name: 'fitnessCenter', tagItem: 'amenities' },
    { label: 'Some Utilities Covered', name: 'someUtilitiesCovered', tagItem: 'amenities' },
    { label: 'Walk-in Closets', name: 'walkInClosets', tagItem: 'amenities' },
    { label: 'W/D Connections', name: 'washerDryerConnections', tagItem: 'amenities' },
    { label: 'Washer/Dryer in Unit', name: 'washerDryerInUnit', tagItem: 'amenities' },
    { label: 'Income Restricted', name: 'incomeRestricted', tagItem: 'amenities' },
    { label: 'Senior Living', name: 'seniorLiving', tagItem: 'amenities' },
  ],
  pets: [
    { label: 'Cats OK', name: 'catFriendly', tagItem: 'cats_ok' },
    { label: 'Dogs OK', name: 'dogFriendly', tagItem: 'dogs_ok' },
    { label: 'Cats & Dogs OK', name: 'petFriendly', tagItem: 'cats_dogs_ok' },
    { label: 'No Pets', name: 'noPets', tagItem: 'no_pets' },
  ],
  baths: [
    { label: '1 Bath', value: 1, tagItem: 'bathrooms' },
    { label: '2 Baths', value: 2, tagItem: 'bathrooms' },
    { label: '3+ Baths', value: 3, tagItem: 'bathrooms' },
  ],
}
