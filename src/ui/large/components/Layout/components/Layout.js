import React from 'react'
import PropTypes from 'prop-types'
import ModalStack from 'ui/shared/components/ModalStack'
import { modalDefinitions } from 'ui/large/config/modalConfig'
import { Header as DefaultHeader } from 'ui/large/components/Header'
import { themed } from 'react-themed-too'

const Layout = props => (
  <div className={props.theme.Layout_Container}>
    <ModalStack modalDefinitions={modalDefinitions} />
    {props.HeaderComponent && <props.HeaderComponent />}
    <section className={props.theme.Layout_Content}>
      { props.children }
    </section>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node,
  HeaderComponent: PropTypes.any,
  theme: PropTypes.object,
}

Layout.defaultProps = {
  theme: {},
  HeaderComponent: DefaultHeader,
}

export default themed(/^Layout/)(Layout)
