import dataStyler from '../dataStyler'

const getFeature = (property, value) => ({
  getProperty: propertyName => propertyName === property && value,
})

describe('ui/shared/components/Map/dataStyler', () => {
  it('returns a non-empty style for shapes', () => {
    const expected = [
      'fillColor',
      'fillOpacity',
      'strokeWeight',
      'strokeColor',
      'cursor',
    ]
    const shapeMarker = getFeature('shapeType', true)
    const actual = Object.keys(dataStyler(shapeMarker))
    expect(actual).toEqual(expected)
  })

  it('returns empty object for non-shapes', () => {
    const expected = {}
    const noShapeMarker = getFeature('foo', true)
    const actual = dataStyler(noShapeMarker)
    expect(actual).toEqual(expected)
  })
})
