import { IComponentProps } from '@/models'
import React from 'react'

import { Figure, ImageContainer, Picture, Image } from './Styled'

interface IProps extends IComponentProps {
  src?: string
}

const UserImage: React.FC<IProps> = ({
  src = 'https://cdn-icons-png.flaticon.com/512/892/892781.png?w=360',
  margin,
  ...rest
}) => {
  return (
    <ImageContainer margin={margin} {...rest}>
      <Figure>
        <Picture>
          <Image src={src} />
        </Picture>
      </Figure>
    </ImageContainer>
  )
}

export default UserImage
