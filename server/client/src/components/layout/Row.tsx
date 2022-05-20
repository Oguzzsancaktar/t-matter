import { IComponentProps } from '@models/index'
import { RowStyled } from '@shared/index'
import React from 'react'

interface IProps extends IComponentProps {}

const Row: React.FC<IProps> = ({ children, ...rest }) => {
  return <RowStyled {...rest}>{children}</RowStyled>
}

export default Row
