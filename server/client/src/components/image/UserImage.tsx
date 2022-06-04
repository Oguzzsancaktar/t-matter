import { IComponentProps } from '@/models'
import React from 'react'

import { Figure, ImageContainer, Picture, Image } from './Styled'

interface IProps extends IComponentProps {
  src?: string
}

const UserImage: React.FC<IProps> = ({
  src = 'https://pd1eu.bumbcdn.com/p59/hidden?euri=pCbH0iVuuifzRbNlbAp0ryNInZyUgWhDLupCTW2sd5M2bkSnTDQAYOrQbgRQK9o95cYc5asdexxJgOeNl9wQXi-m6gj1KO5OA0qt2YSTkS1h.NK84zSmNSX7JT6OrXW1dNfbmEiQXARuB6RfqKeHxdfSfUlEcJpel7Y0SL.aLqhYvLNPbY8Edg&size=__size__&ck=b774951e5422b76c1a992c99770b654a&h=zVU&gs=o&t=42.1.0.0',
  ...rest
}) => {
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
