import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import cn from 'classnames'

import PDPSection from '../PDPSection'
import PDPPetPolicyList from './PDPPetPolicyList'

const PDPPetPolicy = ({ policies, theme }) => {
  const renderPetPolicy = ({ expanded }) => {
    const categories = Object.keys(policies)
    const listTheme = cn(
      theme.PDPPetPolicy,
      { [theme['PDPPetPolicy-expanded']]: expanded }
    )

    return (
      <div
        className={listTheme}
        data-tid="pdpPetPolicyList"
      >
        {categories.map(category => (
          <PDPPetPolicyList
            key={category}
            policies={policies[category]}
            category={category}
          />
        ))}
      </div>
    )
  }
  renderPetPolicy.propTypes = { expanded: PropTypes.bool }

  return (
    <PDPSection
      category="Pet Policy"
      dataTid="pdpPetPolicy"
      description="View our pet policy."
      renderHidable={renderPetPolicy}
    />
  )
}

PDPPetPolicy.propTypes = {
  policies: PropTypes.objectOf(
    // Key = category name like Cats, Dogs, Other
    PropTypes.arrayOf(
      PropTypes.shape({
        // Policy label like "Cats Allowed"
        label: PropTypes.string.isRequired,
        // Comments that might have been entered for the policy
        comment: PropTypes.string,
        // Weight restriction that might have been entered for the policy
        weightRestriction: PropTypes.string,
      })
    )
  ),
  theme: PropTypes.object,
}

PDPPetPolicy.defaultProps = {
  policies: {},
  theme: {},
}

export default themed(/^PDPPetPolicy/, { pure: true })(PDPPetPolicy) // /^PDPPetPolicy/
