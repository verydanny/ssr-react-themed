import React from 'react'
import * as colors from 'ui/shared/themes/colors'
import theme from './Colors.css'

const grouping = [
  {
    name: 'Primary',
    desc: 'For all visual elements',
    colors: {
      RentBlue: colors.RentBlue,
      UniversalGrey: colors.UniversalGrey,
    },
  },
  {
    name: 'Secondary',
    desc: 'To use in support of elements, create contrast or to create special emphasis',
    colors: {
      GoldYellow: colors.GoldYellow,
      RentBlue66: colors.RentBlue66,
      RentBlue33: colors.RentBlue33,
      DarkBlue: colors.DarkBlue,
      Gray1: colors.Gray1,
      Gray2: colors.Gray2,
      Gray3: colors.Gray3,
    },
  },
  {
    name: 'Accent',
    desc: 'For use only in specific circumstances. Should be used sparingly and for empasis only.',
    colors: {
      Green: colors.Green,
      Red: colors.Red,
    },
  },
]

export default () => (
  <div>
    <h1 className={theme.Header} data-tid="colors-header">Colors</h1>
    {grouping.map((group, index) => (
      <div key={`colors-${index}`} className={theme.Group}>
        <div className={theme.Group_detail}>
          <h2>{group.name}</h2>
          <p>{group.desc}</p>
        </div>
        <div className={theme.Row}>
          {Object.keys(group.colors).map(color => (
            <div key={color} className={theme.Col}>
              <div
                className={theme.Color_box}
                style={{ backgroundColor: colors[color] }}
              />
              <div className={theme.Color_detail}>
                <p className={theme.Color_name}>
                  {color}
                </p>
                <p className={theme.Color_value}>
                  {colors[color]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)
