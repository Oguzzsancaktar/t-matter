import { Column, Row } from '@/components/layout'
import { Eye, EyeOff } from 'react-feather'
import styled from 'styled-components'
import { Container, IconContainer, Input } from './styled'

interface Props {
  type: string
  placeholder: string
  name: string
  validationError?: boolean
  value?: string
  labelText?: string
  isPasswordVisible?: boolean
  handleVisibility?: (isVisible: boolean) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

const Label = styled.label`
  width: 100%;
  text-align: start;
  margin-bottom: 0.4rem;
`

const InputWithIcon: React.FC<Props> = ({
  children,
  validationError,
  type,
  isPasswordVisible,
  labelText,
  handleVisibility,
  onBlur,
  ...rest
}) => {
  return (
    <Column>
      {labelText && <Label>{labelText}</Label>}
      <Container validationError={validationError}>
        <Row>
          <IconContainer>{children}</IconContainer>
          <Input onBlur={onBlur} validationError={validationError} type={type} {...rest} />
          {handleVisibility &&
            (isPasswordVisible ? (
              <Eye style={{ cursor: 'pointer' }} onClick={() => handleVisibility(isPasswordVisible)} />
            ) : (
              <EyeOff style={{ cursor: 'pointer' }} onClick={() => handleVisibility(!isPasswordVisible)} />
            ))}
        </Row>
      </Container>
    </Column>
  )
}

export default InputWithIcon
