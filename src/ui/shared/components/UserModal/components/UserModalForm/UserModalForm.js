import React, { PureComponent } from 'react'
import { Form, Field } from '@rentpath/react-ui-core'
import PropTypes from 'prop-types'

class UserModalForm extends PureComponent {
  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        modal: PropTypes.string.isRequired,
      })
    ).isRequired,
    fieldMap: PropTypes.object,
    displayName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    fieldMap: {},
  }

  get getFields() {
    const { fields, fieldMap, displayName } = this.props

    return fields.map((field, i) => {
      const { name, modal } = field
      const Node = fieldMap[name] || Field

      return (
        <Node
          data-tid={`user-${modal}-form-${name}`}
          key={`${displayName}-${i}-${name}`}
          id={`${displayName}-${i}-${name}`}
          {...field}
        />
      )
    })
  }

  render() {
    const { onSubmit } = this.props
    return (
      <Form
        onSubmit={onSubmit}
      >
        {this.getFields}
      </Form>
    )
  }
}

export default UserModalForm
