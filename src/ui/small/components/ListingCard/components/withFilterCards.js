import pipe from 'lodash/fp/pipe'
import chunk from 'lodash/fp/chunk'
import curry from 'lodash/curry'
import zip from 'lodash/fp/zip'
import flattenDeep from 'lodash/fp/flattenDeep'
import compact from 'lodash/fp/compact'
import __ from 'lodash/fp/__'

const insertCards = (cards, interval) => pipe(chunk(interval), zip(__, cards), flattenDeep, compact)

export default curry((isInlineFilterCardsEnabled, filterCards, deck) => {
  // TODO make this more functional after Rambda is added
  if (!isInlineFilterCardsEnabled || deck.length < 20) return deck
  return insertCards(filterCards, 4)(deck)
})
