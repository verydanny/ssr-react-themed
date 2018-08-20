import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import themed from 'react-themed-too'
import autobind from 'autobind-decorator'
import { simplifyRefinementCriteria } from 'app/selectors/criteria'
import Header from './sections/Header'
import Footer from './sections/Footer'
import Form from './sections/Form'

@themed(/^FilterPanel/)
export default class FilterPanel extends PureComponent {

  static propTypes = {
    toggleView: PropTypes.func,
    filterCriteria: PropTypes.object.isRequired,
    previousView: PropTypes.string,
    theme: PropTypes.object,
    updateFilterCriteria: PropTypes.func.isRequired,
    resetFilterCriteria: PropTypes.func.isRequired,
    total: PropTypes.number,
    filterTotal: PropTypes.number,
    submitUrl: PropTypes.string,
  }

  static defaultProps = {
    theme: {},
  }

  @autobind
  onCancel() {
    const {
      previousView,
      toggleView,
      resetFilterCriteria,
    } = this.props
    toggleView(previousView)
    resetFilterCriteria()
  }

  render() {
    const {
      theme,
      toggleView,
      previousView,
      updateFilterCriteria,
      total,
      filterTotal,
      filterCriteria,
      submitUrl,
    } = this.props

    return (
      <div className={theme.FilterPanel} data-tag_section="more_filters">
        <Header
          onCancel={this.onCancel}
        />
        <Form
          refinementCriteria={simplifyRefinementCriteria(filterCriteria.refinements)}
          updateFilterCriteria={updateFilterCriteria}
        />
        <Footer
          toggleView={toggleView}
          previousView={previousView}
          submitUrl={submitUrl}
          total={total}
          filterTotal={filterTotal}
          filterCriteria={filterCriteria}
        />
      </div>
    )
  }
}
