import { IComponentProps } from '@/models'
import React from 'react'

import { Figure, ImageContainer, Picture, Image } from './Styled'

interface IProps extends IComponentProps {
  src?: string
}

const UserImage: React.FC<IProps> = ({ src = 'https://via.placeholder.com/150', ...rest }) => {
  return (
    <ImageContainer {...rest}>
      <Figure>
        <Picture>
          <Image src={src} />
        </Picture>
      </Figure>
    </ImageContainer>
  )
}

export default UserImage
