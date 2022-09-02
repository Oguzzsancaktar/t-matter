import { IComponentProps } from '@/models'
import styled from 'styled-components'

export const RowStyled = styled.div<IComponentProps>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  gap: ${({ gap }) => (gap ? gap : '0')};
  display: flex;
  flex-direction: row;
  align-items: center;
`
