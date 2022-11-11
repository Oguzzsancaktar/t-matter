export type IHelperValidation = (
  value: string,
  validation: (value: string) => any,
  field: string
) => { text: string; color: 'default' | 'error' | 'success' }

export const validateEmail = emailValue => {
  return emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
}

export const validatePhone = phoneValue => {
  return phoneValue.match(/\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/)
}

export const validateName = nameValue => {
  return nameValue.match(/^[a-z ,.'-]+$/i)
}

export const validationHelper: IHelperValidation = (value, validation, field) => {
  if (!value) {
    return {
      text: `please enter your ${field}`,
      color: 'default'
    }
  }
  const isValid = validation(value)
  return {
    text: isValid ? `Correct ${field}` : `Enter a valid ${field}`,
    color: isValid ? 'success' : 'error'
  }
}
