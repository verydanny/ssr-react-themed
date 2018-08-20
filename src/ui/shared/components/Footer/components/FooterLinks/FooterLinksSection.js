import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import cn from 'classnames'
import { themed } from 'react-themed-too'
import { Icon } from 'ui/shared/components/Icon'
import { chevronUp, chevronDown } from 'ui/shared/components/Icon/svgs/global'

@themed(/^FooterLinksSection/, { pure: true })

export default class FooterLinksSection extends PureComponent {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    testId: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
    isAccordion: PropTypes.bool,
    theme: PropTypes.object,
  }

  static defaultProps = {
    isAccordion: false,
    theme: {},
  }

  state = { open: false }

  @autobind
  toggleAccordion() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const {
      heading,
      testId,
      links,
      isAccordion,
      theme,
    } = this.props

    const classes = cn(
      theme.FooterLinksSection,
      this.state.open && theme['FooterLinksSection-open']
    )

    return (
      <div data-tid={testId} className={classes}>
        <h4 className={theme.FooterLinksSection_Header}>
          <button onClick={isAccordion ? this.toggleAccordion : null} >
            {heading}
          </button>
          {isAccordion &&
            <Icon
              svgs={{ chevronUp, chevronDown }}
              onClick={this.toggleAccordion}
              className={theme.FooterLinksSection_ChevronIcon}
              name={this.state.open ? 'chevronUp' : 'chevronDown'}
            />
          }
        </h4>
        <ul className={theme.FooterLinksSection_Links}>
          {
            links.map((link, linkIndex) => (
              <li key={`footer-link-${linkIndex}`} >
                <a href={link.url} data-tag_item={link.tag}>{link.text}</a>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
