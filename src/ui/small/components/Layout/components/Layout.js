import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'react-themed'
import classNames from 'classnames'
import theme from 'ui/small/themes/SmallTheme'
import ModalStack from 'ui/shared/components/ModalStack'
import { modalDefinitions } from 'ui/small/config/modalConfig'
import Header from './Header'

const optionalShape = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.node,
])

class Layout extends Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    headerComponent: optionalShape,
    footerComponent: optionalShape,
    layout: PropTypes.object,
  }

  static defaultProps = {
    headerComponent: <Header />,
    layout: {},
  }

  render() {
    const {
      headerComponent,
      footerComponent,
      children,
      className,
      layout,
    } = this.props

    // Theme is provided for everything under the Layout component.
    // However also refer to ui/small/components/ActiveView.js
    // because it manually applies theme in some cases.

    return (
      <ThemeProvider theme={theme}>
        <div className={classNames(className, layout.Layout_Container)}>
          <ModalStack modalDefinitions={modalDefinitions} />
          {headerComponent &&
            <header className={layout.Layout_Header}>
              {
                headerComponent
              }
            </header>
          }
          <section className={layout.Layout_Content}>
            {children}
          </section>
          {footerComponent &&
            <footer className={layout.Layout_Footer}>
              {
                footerComponent
              }
            </footer>
          }
        </div>
      </ThemeProvider>
    )
  }
}

export default Layout
