import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'

const PDPPetPolicyList = ({
  category,
  policies,
  theme,
}) => (
  <div className={theme.PDPSectionList}>
    <h3 className={theme.PDPSectionList_Category}>{category}</h3>
    <div className={theme.PDPSectionList_List}>
      {policies.map(a => (
        <div key={a.label} className={theme.PDPPetPolicy_Policy}>
          <div className={theme.PDPPetPolicy_Name}>
            {a.label}
          </div>
          {
            a.weightRestriction &&
              <div className={theme.PDPPetPolicy_Weight}>
                {a.weightRestriction}
              </div>
          }
          {
            a.comment &&
              <div className={theme.PDPPetPolicy_Comment}>
                {a.comment}
              </div>
          }
        </div>)
      )}
    </div>
  </div>
)

PDPPetPolicyList.propTypes = {
  category: PropTypes.string.isRequired,
  policies: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      comment: PropTypes.string,
      weightRestriction: PropTypes.string,
    })
  ),
  theme: PropTypes.object,
}

PDPPetPolicyList.defaultProps = {
  theme: {},
  policies: [],
}

export default themed(/^PDPSectionList|^PDPPetPolicy/, { pure: true })(PDPPetPolicyList)
