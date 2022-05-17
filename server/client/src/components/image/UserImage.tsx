import React from 'react'
import { Plus, Trash } from 'react-feather'

import { AddButton, Figure, ImageContainer, Picture, RemoveButton, Image } from './Styled'

const UserImage = () => {
  return (
    <ImageContainer>
      {true ? (
        <AddButton>
          <Plus />
        </AddButton>
      ) : (
        <>
          <RemoveButton>
            <Trash />
          </RemoveButton>
          <Figure>
            <Picture>
              <Image
                src={
                  'https://pd1eu.bumbcdn.com/p59/hidden?euri=pCbH0iVuuifzRbNlbAp0ryNInZyUgWhDLupCTW2sd5M2bkSnTDQAYOrQbgRQK9o95cYc5asdexxJgOeNl9wQXi-m6gj1KO5OA0qt2YSTkS1h.NK84zSmNSX7JT6OrXW1dNfbmEiQXARuB6RfqKeHxdfSfUlEcJpel7Y0SL.aLqhYvLNPbY8Edg&size=__size__&ck=b774951e5422b76c1a992c99770b654a&h=zVU&gs=o&t=42.1.0.0'
                }
              />
            </Picture>
          </Figure>
        </>
      )}
    </ImageContainer>
  )
}

export default UserImage
