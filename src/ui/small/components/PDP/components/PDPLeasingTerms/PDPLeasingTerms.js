import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import cn from 'classnames'
import { handleBR } from 'lib/utils/handleBR'

import PDPSection from '../PDPSection'

const getLeasingTheme = ({ expanded, theme }) =>
  cn(theme.PDPLeasingTerms, { [theme['PDPLeasingTerms-expanded']]: expanded })

const PDPLeasingTerms = ({ terms, theme }) => {
  if (terms) {
    return (
      <PDPSection
        category="Leasing Terms"
        dataTid="pdpLeasingTerms"
        description="View our leasing terms."
        theme={theme}
        renderHidable={({ expanded }) => (
          <div className={getLeasingTheme({ expanded, theme })}>
            <h3
              className={theme.PDPLeasingTerms_Header}
              data-tid="pdpLeasingTerms_InnerHeader"
            >
              Leasing Terms
            </h3>
            <div
              className={theme.PDPLeasingTerms_Terms}
              data-tid="pdpLeasingTerms_Terms"
            >
              {handleBR(terms)}
            </div>
          </div>
        )}
      />
    )
  }

  return null
}

PDPLeasingTerms.propTypes = {
  terms: PropTypes.string,
  theme: PropTypes.object,
}

PDPLeasingTerms.defaultProps = {
  theme: {},
}

export default themed(/^PDPLeasingTerms/, { pure: true })(PDPLeasingTerms)
