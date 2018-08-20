import React from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed-too'
import { Icon } from 'ui/shared/components/Icon'
import truncateString from 'lib/utils/truncateString'

const PDPDetailHeader = ({ title, subtitle, onClick, theme, titleMax, subtitleMax }) => {
  const renderText = (text, limit) => {
    if (!limit || text.length <= limit) return text

    return `${truncateString(text, limit)} ...`
  }

  return (
    <div
      className={theme.PDPDetailHeader}
      data-tid="pdpHeader"
    >
      <button
        className={theme.PDPDetailHeader_Back}
        onClick={onClick}
        data-tid="pdpDetailHeader_Back"
      >
        <Icon
          name="arrowLeft"
        />
      </button>

      <div className={theme.PDPDetailHeader_Title}>
        <h3>{renderText(title, titleMax)}</h3>
        {
          subtitle &&
          <p>{renderText(subtitle, subtitleMax)}</p>
        }
      </div>
    </div>
  )
}

PDPDetailHeader.propTypes = {
  theme: PropTypes.object,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleMax: PropTypes.number,
  subtitleMax: PropTypes.number,
}

PDPDetailHeader.defaultProps = {
  theme: {},
}

export default themed(/^PDPDetailHeader/, { pure: true })(PDPDetailHeader)
