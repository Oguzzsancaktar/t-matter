import { RowStyled } from '@/shared'
import React from 'react'

type IProps = {
  margin?: string
  padding?: string
  height?: string
  width?: string
}

const Row: React.FC<IProps> = ({ children, ...rest }) => {
  return <RowStyled {...rest}>{children}</RowStyled>
}

export default Row
