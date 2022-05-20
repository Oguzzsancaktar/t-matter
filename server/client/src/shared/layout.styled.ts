import styled from '@emotion/styled'

type IProps = {
  margin?: string
  padding?: string
  height?: string
  width?: string
}

export const RowStyled = styled.div<IProps>`
  width: ${({ width }) => (width ? width : '100%')};
  display: flex;
  flex-direction: row;
  align-items: center;
`
