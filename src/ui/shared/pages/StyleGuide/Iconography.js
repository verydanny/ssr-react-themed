import React from 'react'
import Icon from 'ui/shared/components/Icon/Icon'
import * as svgs from 'ui/shared/components/Icon/svgs/map'
import theme from './Iconography.css'

const groups = [
  {
    name: 'Global',
  },
  {
    name: 'Amenities',
    icons: ['amenities', 'bathroom', 'bedroom'],
  },
  {
    name: 'Map',
    icons: ['layer', 'location', 'mapMarker', 'mapPoi', 'zoomIn', 'zoomOut'],
  },
]

const grouped = groups[1].icons.concat(groups[2].icons).reduce((acc, name) => {
  acc[name] = name
  return acc
}, {})

groups[0].icons = Object.keys(svgs).reduce((acc, name) => {
  if (grouped[name]) {
    return acc
  }
  return acc.concat(name)
}, [])

export default () => (
  <div>
    <h1 className={theme.Header} data-tid="icons-header">Icons</h1>
    {groups.map((group, index) => (
      <div key={index} fluid className={theme.Group}>
        <h4>{group.name}</h4>
        <div className={theme.Row}>
          {group.icons.sort().map(name => (
            <div key={name} className={theme.Icon_box}>
              <Icon svgs={svgs} className={theme.Icon} name={name} />
              <div className={theme.Icon_text}>{name}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)
