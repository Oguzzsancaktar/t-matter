import { IComponentProps } from '@/models'
import React from 'react'

import { Figure, ImageContainer, Picture, Image } from './Styled'

interface IProps extends IComponentProps {
  src?: string
}

const UserImage: React.FC<IProps> = ({ src = 'https://source.unsplash.com/user/c_v_r/100x100', ...rest }) => {
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
