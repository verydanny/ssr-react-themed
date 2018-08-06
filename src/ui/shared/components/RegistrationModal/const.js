import { Button } from '@rentpath/react-ui-core'
import {
  ValidatedEmail,
  ValidatedFirstName,
  ValidatedLastName,
  ValidatedPassword,
} from 'ui/shared/components/UserModal/components/FieldValidation'

export const REGISTER_MODAL_ID = 'Modal/RegisterModal'

export const FIELD_MAP = {
  submit: Button,
  email: ValidatedEmail,
  firstName: ValidatedFirstName,
  lastName: ValidatedLastName,
  password: ValidatedPassword,
  passwordConfirmation: ValidatedPassword,
}
