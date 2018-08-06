import { ShapeFill, ShapeStroke } from 'ui/shared/themes/colors'

// this function styles map "data" features added via map.data
// e.g. city/hood shapes for now...
export default feature => {
  const isShape = feature.getProperty('shapeType')

  if (isShape) {
    return {
      fillColor: ShapeFill,
      fillOpacity: 0.05,
      strokeWeight: 1.85,
      strokeColor: ShapeStroke,
      cursor: 'auto',
    }
  }

  return {}
}
