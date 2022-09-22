import { ItemContainer } from '@/components/item-container'
import { Label } from '@/components/texts'
import colors from '@/constants/colors'
import { Column, Row } from '@components/layout'
import { Eye, EyeOff } from 'react-feather'
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
  step?: string
  handleVisibility?: (isVisible: boolean) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

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
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          <Label color={colors.text.primary}>{labelText}</Label>
        </ItemContainer>
      )}
      <Container validationError={validationError}>
        <Row>
          <IconContainer disabled={disabled} validationError={validationError}>
            {children}
          </IconContainer>
          <Input validationError={validationError} type={type} disabled={disabled} {...rest} />
          {handleVisibility && (
            <ItemContainer width="30px">
              {isPasswordVisible ? (
                <Eye size={20} style={{ cursor: 'pointer' }} onClick={() => handleVisibility(isPasswordVisible)} />
              ) : (
                <EyeOff size={20} style={{ cursor: 'pointer' }} onClick={() => handleVisibility(!isPasswordVisible)} />
              )}
            </ItemContainer>
          )}
        </Row>
      </Container>
    </Column>
  )
}

export default InputWithIcon
