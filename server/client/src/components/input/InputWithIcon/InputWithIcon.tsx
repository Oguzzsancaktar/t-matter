import { Eye, EyeOff } from 'react-feather'
import { Container, IconContainer, Input } from './styled'

interface Props {
  type: string
  placeholder: string
  name: string
  validationError?: boolean
  value?: string
  isPasswordVisible?: boolean
  handleVisibility?: (isVisible: boolean) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

const InputWithIcon: React.FC<Props> = ({
  children,
  validationError,
  type,
  isPasswordVisible,
  handleVisibility,
  onBlur,
  ...rest
}) => {
  return (
    <Container validationError={validationError}>
      <IconContainer>{children}</IconContainer>
      <Input onBlur={onBlur} validationError={validationError} type={type} {...rest} />
      {handleVisibility &&
        (isPasswordVisible ? (
          <Eye style={{ cursor: 'pointer' }} onClick={() => handleVisibility(isPasswordVisible)} />
        ) : (
          <EyeOff style={{ cursor: 'pointer' }} onClick={() => handleVisibility(!isPasswordVisible)} />
        ))}
    </Container>
  )
}

export default InputWithIcon
