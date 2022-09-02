import React from 'react'
import { ButtonSC } from './styled'
import { IProps } from './types'

const Button: React.FC<IProps> = ({ children, disabled, width, ...rest }) => {
  return (
    <ButtonSC disabled={disabled} width={width} type="submit" {...rest}>
      {children}
    </ButtonSC>
  )
}

export default Button
