import RequiredField from '@rentpath/react-ui-rent/lib/LeadForm/Fields/RequiredField'
import validatedField from './ValidatedField'

export const ValidatedFirstName = validatedField(RequiredField)

export const ValidatedLastName = validatedField(RequiredField)

export const ValidatedEmail = validatedField(RequiredField)

export const ValidatedPassword = validatedField(RequiredField)
