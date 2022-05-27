import { ItemContainer } from '@/components/item-container'
import { Column, Row } from '@components/layout'
import { Eye, EyeOff } from 'react-feather'
import styled from 'styled-components'
import { Container, IconContainer, Input } from './styled'

interface Props {
  children?: React.ReactNode
  type?: string
  placeholder?: string
  name: string
  validationError?: boolean
  value?: string | number
  labelText?: string | null
  isPasswordVisible?: boolean
  disabled?: boolean

  handleVisibility?: (isVisible: boolean) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const Label = styled.label`
  width: 100%;
  text-align: start;
  margin-bottom: 0.4rem;
`

const InputWithIcon: React.FC<Props> = ({
  children,
  validationError,
  type = 'text',
  isPasswordVisible,
  labelText,
  disabled,
  handleVisibility,
  ...rest
}) => {
  return (
    <Column>
      {labelText && <Label>{labelText}</Label>}
      <Container validationError={validationError}>
        <Row>
          <IconContainer disabled={disabled} validationError={validationError}>
            {children}
          </IconContainer>
          <Input validationError={validationError} type={type} disabled={disabled} {...rest} />
          <ItemContainer width="30px">
            {handleVisibility &&
              (isPasswordVisible ? (
                <Eye size={20} style={{ cursor: 'pointer' }} onClick={() => handleVisibility(isPasswordVisible)} />
              ) : (
                <EyeOff size={20} style={{ cursor: 'pointer' }} onClick={() => handleVisibility(!isPasswordVisible)} />
              ))}
          </ItemContainer>
        </Row>
      </Container>
    </Column>
  )
}

export default InputWithIcon
