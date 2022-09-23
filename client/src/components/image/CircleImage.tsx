import styled from 'styled-components'
import { IComponentProps } from '@/models'
import React from 'react'
import { Figure, Picture, Image } from './Styled'

interface IProps extends IComponentProps {
  imageUrl: string
}

export const ImageContainer = styled.div<IComponentProps>`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => padding && padding};
  border-radius: 50%;
  overflow: hidden;
`

const CircleImage: React.FC<IProps> = ({ imageUrl, ...rest }) => {
  return (
    <ImageContainer height="100%" {...rest}>
      <Figure>
        <Picture>
          <Image src={imageUrl} />
        </Picture>
      </Figure>
    </ImageContainer>
  )
}

export default CircleImage
