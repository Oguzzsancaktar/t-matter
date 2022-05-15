import React from 'react'
import useAccessStore from '@/hooks/useAccessStore'
import { showModal } from '@/store'
import { Plus, Trash } from 'react-feather'
import { AddUserImageModal } from '@/components/modals'
import { AddButton, Figure, ImageContainer, Picture, RemoveButton, Image } from './Styled'
import { ESize } from '@/models/Enumarables'

const UserImage = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const openUploadImageModal = () => {
    dispatch(
      showModal({
        title: 'Upload Image',
        body: <AddUserImageModal />,
        size: ESize.Medium
      })
    )
  }

  return (
    <ImageContainer>
      {true ? (
        <AddButton onClick={openUploadImageModal}>
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
