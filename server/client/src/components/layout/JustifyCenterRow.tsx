import React from 'react'
import styled from 'styled-components'
import { IComponentProps } from '@models/index'

interface IProps extends IComponentProps {}

const JustifyCenterRowStyled = styled.div<IProps>`
  margin: ${({ margin }) => margin && margin};
  padding: ${({ padding }) => padding && padding};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  gap: ${({ gap }) => (gap ? gap : '0')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const JustifyCenterRow: React.FC<IProps> = ({ children, ...rest }) => {
  return <JustifyCenterRowStyled {...rest}>{children}</JustifyCenterRowStyled>
}

export default JustifyCenterRow
