import { ItemContainer } from '@/components/item-container'
import { Label } from '@/components/texts'
import colors from '@/constants/colors'
import { Column, Row } from '@components/layout'
import { Container, TextContainer, Input } from './styled'

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

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const InputWithText: React.FC<Props> = ({
  children,
  validationError,
  type = 'text',
  isPasswordVisible,
  labelText,
  disabled,
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
          <Input validationError={validationError} type={type} disabled={disabled} {...rest} />

          <TextContainer disabled={disabled} validationError={validationError}>
            {children}
          </TextContainer>
        </Row>
      </Container>
    </Column>
  )
}

export default InputWithText
