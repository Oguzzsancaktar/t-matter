import React from 'react'
import { CheckboxContainer, HiddenCheckbox, Icon, StyledCheckbox } from './styled'

interface Props {
  className?: string[]
  isChecked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<Props> = ({ className, isChecked, ...props }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={isChecked} {...props} />
    <StyledCheckbox checked={isChecked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
