// NOTE: some items require a custom label and name. It is required that
// the value of name should always be the camelCase of the refinments slug
// TODO: drive this from config so the rules are obvious
export default {
  propertyTypes: {
    title: 'Property Type',
    showableItems: [
      { label: 'Apartments', name: 'apartments' },
      { label: 'Townhouses', name: 'townhouses' },
      { label: 'Condos', name: 'condos' },
      { label: 'Houses', name: 'houses' },
    ],
  },
  amenities: {
    title: 'Amenities',
    showableItems: [
      { label: 'Air Conditioning', name: 'airConditioning' },
      { label: 'Balcony, Patio, Deck', name: 'patio' },
      { label: 'Cable Ready', name: 'cableReady' },
      { label: 'Controlled Access', name: 'controlledLimitedAccess' },
    ],
    nonshowableItems: [
      { label: 'Dishwasher', name: 'dishwasher' },
      { label: 'Elevator', name: 'elevator' },
      { label: 'Extra Storage', name: 'extraStorage' },
      { label: 'Disability Access', name: 'handicapAccess' },
      { label: 'Hardwood Floors', name: 'hardwoodFloor' },
      { label: 'Laundry Facility', name: 'laundryFacility' },
      { label: 'Onsite Personnel', name: 'onsitePersonnel' },
      { label: 'Pool', name: 'pool' },
      { label: 'Fitness Center', name: 'fitnessCenter' },
      { label: 'Some Utilities Covered', name: 'someUtilitiesCovered' },
      { label: 'Walk-in Closets', name: 'walkInClosets' },
      { label: 'W/D Connections', name: 'washerDryerConnections' },
      { label: 'Washer/Dryer in Unit', name: 'washerDryerInUnit' },
      { label: 'Income Restricted', name: 'incomeRestricted' },
      { label: 'Senior Living', name: 'seniorLiving' },
    ],
  },
  pets: {
    cats: { name: 'catFriendly', value: 'Cats OK' },
    dogs: { name: 'dogFriendly', value: 'Dogs OK' },
    pets: { name: 'petFriendly', value: 'Cats & Dogs OK' },
    none: { name: 'noPets', value: 'No Pets' },
    default: 'Select',
  },
  petOptions: [
    { label: 'Select', value: 'Select', item: 'pets_dropdown', section: 'more_filters', selection: '' },
    { label: 'Cats OK', value: 'catFriendly', item: 'pets_dropdown', section: 'more_filters', selection: 'cats_ok' },
    { label: 'Dogs OK', value: 'dogFriendly', item: 'pets_dropdown', section: 'more_filters', selection: 'dogs_ok' },
    { label: 'Cats & Dogs OK', value: 'petFriendly', item: 'pets_dropdown', section: 'more_filters', selection: 'cats_dogs_ok' },
    { label: 'No Pets', value: 'noPets', item: 'pets_dropdown', section: 'more_filters', selection: 'no_pets' },
  ],
  // TODO: wire up hoods
  // neighborhoods: {
  //   title: 'Neighborhoods',
  //   showableItems: [
  //     'Atlantic Station',
  //     'Downtown',
  //     'Brookhaven',
  //     'Druid Hills',
  //   ],
  //   nonshowableItems: [
  //     'Dunwoody',
  //     'Sandy Springs',
  //     'Alpharetta',
  //     'Cumming',
  //     'Roswell',
  //     'Johns Creek',
  //     'Norcross',
  //   ],
  // },
}
