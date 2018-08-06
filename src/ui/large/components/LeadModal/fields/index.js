import {
  Name,
  Email,
  Phone,
} from '@rentpath/react-ui-rent/lib/LeadForm'
import MoveInDate from '../MoveInDate'
import validatedField from './ValidatedField'

export const ValidatedName = validatedField(Name)

export const ValidatedEmail = validatedField(Email)

export const ValidatedPhone = validatedField(Phone)

export const ValidatedMoveInDate = validatedField(MoveInDate)
