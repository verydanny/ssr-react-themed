import React from 'react'
import { compose } from 'react-themed'
import cn from 'classnames'
import { Button } from '@rentpath/react-ui-core'
import { Icon } from 'ui/shared/components/Icon'
import { email, map } from 'ui/shared/components/Icon/svgs/global'
import add from 'ui/shared/components/Icon/svgs/add.svg'
import subtract from 'ui/shared/components/Icon/svgs/subtract.svg'
import chevronRight from 'ui/shared/components/Icon/svgs/chevronRight.svg'
import { ToggleBar } from 'ui/small/components/View/ToggleBar'
import { views } from 'ui/small/components/View'
import buttonTheme from 'ui/shared/themes/Button.css'
import mapControlsTheme from 'ui/shared/themes/MapControls.css'
import viewToggleMenuTheme from 'ui/small/themes/ViewToggleMenu.css'
import styleguideTheme from './Buttons.css'

const theme = compose({},
  buttonTheme,
  mapControlsTheme,
  viewToggleMenuTheme,
  styleguideTheme,
)

const grouping1 = [
  {
    name: 'Raised-Primary',
    buttons: [{
      buttonName: 'Default',
      style: cn(theme.ButtonRaised),
    },
    {
      buttonName: 'Hover',
      style: cn(theme.ButtonRaised, theme['ButtonRaised-hover']),
    },
    {
      buttonName: 'Active',
      style: cn(theme.ButtonRaised, theme['ButtonRaised-active']),
    },
    {
      buttonName: 'Disabled',
      style: cn(theme.ButtonRaised, theme['ButtonRaised-disabled']),
    },
    ],
  },
  {
    name: 'Raised-Secondary',
    buttons: [{
      buttonName: 'Default',
      style: cn(theme.ButtonRaised, theme.ButtonRaised_Secondary),
    },
    {
      buttonName: 'Hover',
      style: cn(theme.ButtonRaised, theme['buttonRaised_Secondary-hover']),
    },
    {
      buttonName: 'Active',
      style: cn(theme.ButtonRaised, theme['ButtonRaised_Secondary-active']),
    },
    {
      buttonName: 'Disabled',
      style: cn(theme.ButtonRaised, theme['ButtonRaised_Secondary-disabled']),
    },
    ],
  },
  {
    name: 'Outline',
    buttons: [{
      buttonName: 'Default',
      style: cn(theme.ButtonRaised, theme.ButtonOutline),
    },
    {
      buttonName: 'Hover',
      style: cn(theme.ButtonRaised, theme['ButtonOutline-hover']),
    },
    {
      buttonName: 'Active',
      style: cn(theme.ButtonRaised, theme['ButtonOutline-active']),
    },
    {
      buttonName: 'Disabled',
      style: cn(theme.ButtonRaised, theme['ButtonOutline-disabled']),
    },
    ],
  },
  {
    name: 'Small-Raised',
    buttons: [{
      buttonName: 'Default',
      style: cn(theme.ButtonRaised, theme.ButtonSmall),
    },
    {
      buttonName: 'Hover',
      style: cn(theme.ButtonRaised, theme['ButtonSmall-hover']),
    },
    {
      buttonName: 'Active',
      style: cn(theme.ButtonRaised, theme['ButtonSmall-active']),
    },
    {
      buttonName: 'Disabled',
      style: cn(theme.ButtonRaised, theme['ButtonSmall-disabled']),
    },
    ],
  },
  {
    name: 'Float/Glyph',
    buttons: [{
      buttonDescription: 'Default',
      style: cn(theme.ButtonGlyph, theme['ButtonFloat-Circle']),
      icon: <Icon svgs={{ chevronRight }} className={theme.ForwardFill} />,
    },
    {
      buttonDescription: 'Active',
      style: cn(theme.ButtonGlyph, theme['ButtonFloat-Circle-active']),
      icon: <Icon svgs={{ chevronRight }} className={theme.ForwardFill} />,
    },
    {
      buttonDescription: 'Disabled',
      style: cn(theme.ButtonGlyph, theme['ButtonFloat-Circle-disabled']),
      icon: <Icon svgs={{ chevronRight }} className={theme.ForwardFill} />,
    },
    ],
  },
  {
    name: 'Small/Float/Glyph',
    buttons: [{
      buttonDescription: 'Default',
      style: cn(theme.ButtonGlyph, theme['ButtonFloat-Email']),
      icon: <Icon svgs={{ email }} className={theme.Email} />,
    },
    {
      buttonDescription: 'Active',
      style: cn(theme.ButtonGlyph, theme['ButtonFloat-Email-active']),
      icon: <Icon svgs={{ email }} className={theme['Email-active']} />,
    },
    ],
  },
  {
    name: 'Button Container Card',
    buttons: [{
      buttonName: 'Apply',
      style: cn(theme.ButtonRaised, theme['Container-Card']),
    },
    ],
  },
]

const grouping2 = [
  {
    name: 'View Toggle Menu',
    buttons: [{
      buttonDescription: 'List + Filter',
      buttonName1: 'map',
    },
    {
      buttonDescription: 'Map + Filter',
      buttonName1: 'list',
    },
    ],
  },
]

const grouping3 = [
  {
    name: 'Zoom/Location',
    buttons: [{
      buttonDescription: 'Default State',
      style1: theme.MapControls,
      style2: theme.MapControls,
      icon1: <Icon svgs={{ add }} className={theme.MapControls_ZoomLevel} />,
      icon2: <Icon svgs={{ subtract }} className={theme.MapControls_ZoomLevel} />,
      container: theme.MapControls_Container,
      zoomContainer: theme.MapControls_ZoomContainer,
      position: theme.MapControls_CurrentPositionContainer,
      separator: theme.MapControls_Separator,
    },
    {
      buttonDescription: 'Disabled State',
      style1: theme.MapControls,
      style2: cn(theme.MapControls, theme['MapControls-disabled']),
      icon1: <Icon svgs={{ add }} className={theme.MapControls_ZoomLevel} />,
      icon2: <Icon svgs={{ subtract }} className={theme.MapControls_ZoomLevel} />,
      container: theme.MapControls_Container,
      zoomContainer: theme.MapControls_ZoomContainer,
      position: theme.MapControls_CurrentPositionContainer,
      separator: theme.MapControls_Separator,
    },
    {
      buttonDescription: 'Active State',
      style1: theme.MapControls,
      style2: cn(theme.MapControls, theme['MapControls-active']),
      icon1: <Icon svgs={{ add }} className={theme.MapControls_ZoomLevel} />,
      icon2: <Icon svgs={{ subtract }} className={theme.MapControls_ZoomLevel} />,
      container: theme.MapControls_Container,
      zoomContainer: theme.MapControls_ZoomContainer,
      position: theme.MapControls_CurrentPositionContainer,
      separator: theme.MapControls_Separator,
    },
    ],
  },
]

export default () => (
  <div>
    <h1 className={theme.header}>Buttons Style Guide</h1>
    <div className={theme.groupingContainer}>
      {grouping1.map((group, index) => (
        <div key={`Buttons-${index}`}>

          <div>
            <h4 className={theme.primary}>
              {group.name}:
            </h4>
            <p className={theme.description}>
              {group.desc}
            </p>
          </div>
          <div className={theme.Row}>
            {group.buttons.map((button, buttonIndex) => (
              <div className={theme.Col} key={buttonIndex} >
                <Button className={button.style}>
                  <span>{button.icon}</span>
                  <span>
                    {button.buttonName}
                  </span>
                </Button>
                <p>
                  {button.buttonDescription}
                </p>
              </div>
            ))}
          </div>

        </div>
      ))}
      {grouping2.map((group, index) => (
        <div key={`Buttons-${index}`}>

          <div>
            <h4 className={theme.primary}>
              {group.name}:
            </h4>
            <p className={theme.description}>
              {group.desc}
            </p>
          </div>
          <div className={theme.Row}>
            {group.buttons.map((button, buttonIndex) => (
              <div className={cn(theme.Col, theme.toggleGroupCol)} key={buttonIndex} >
                <ToggleBar
                  views={views}
                  onClick={() => {}}
                  activeView={button.buttonName1}
                  filterCount={3}
                  currentView="list"
                  toggleView={() => { }}
                  loadedViewKeys={['map', 'list', 'filters']}
                  theme={viewToggleMenuTheme}
                />
                <p>
                  {button.buttonDescription}
                </p>
              </div>
            ))}
          </div>
          <div className={theme.toggleGroupCol}>
            <p>
                Hover State
            </p>
            <div className={cn(theme.ViewToggleMenu_Container)}>
              <Button className={cn(theme.Button, theme['ViewToggleMenu-hover'])}>
                <Icon svgs={{ map }} className={theme.ViewToggleMenu_icons} />
                <span>Map</span>
              </Button>
            </div>
          </div>
          <div className={theme.toggleGroupCol}>
            <p>
                Disabled State
            </p>
            <div className={cn(theme.ViewToggleMenu_Container)}>
              <Button className={cn(theme.Button, theme.ViewToggleMenu)} disabled>
                <Icon svgs={{ map }} className={theme.ViewToggleMenu_icons} />
                <span>Map</span>
              </Button>
            </div>
          </div>

        </div>
      ))}
      {grouping3.map((group, index) => (
        <div key={`Buttons-${index}`}>

          <div>
            <h4 className={theme.primary}>
              {group.name}:
            </h4>
            <p className={theme.description}>
              {group.desc}
            </p>
          </div>
          <div className={theme.Row}>
            {group.buttons.map((button, buttonIndex) => (
              <div className={theme.Col} key={buttonIndex} >
                <div className={button.container}>
                  <div className={button.zoomContainer}>
                    <Button className={button.style1}>
                      <span>{button.icon1}</span>
                    </Button>
                    <div className={button.separator} />
                    <Button className={button.style1}>
                      <span>{button.icon2}</span>
                    </Button>
                  </div>
                  <div className={button.position}>
                    <Button className={button.style2}>
                      <span>{button.icon3}</span>
                    </Button>
                  </div>
                </div>
                <p>
                  {button.buttonDescription}
                </p>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  </div>
)
