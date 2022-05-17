import React from 'react'
import { ButtonSC } from './styled'
import { IProps } from './types'

const Button: React.FC<IProps> = ({ children, width, ...rest }) => {
  return (
    <ButtonSC width={width} type="submit" {...rest}>
      {children}
    </ButtonSC>
  )
}

export default Button
