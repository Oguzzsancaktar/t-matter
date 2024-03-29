import { FileUploader } from 'react-drag-drop-files'

import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { IUser } from '@/models'
import { useState } from 'react'
import { WebcamCapture } from '@/components/camera'
import { Button } from '@/components/button'
import { UserImage } from '@/components/image'
import { getBase64 } from '@/utils/imageConvert'
import { ModalHeader, ModalBody } from '../../types'
import { useAddOrUpdateUserImageMutation, userApi } from '@/services/settings/user-planning/userService'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { closeModal } from '@/store'
import useAccessStore from '@/hooks/useAccessStore'

interface IProps {
  user: IUser
}

const AddOrChangeUserImageModal: React.FC<IProps> = ({ user }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [addOrUpdateUserImage] = useAddOrUpdateUserImageMutation()
  const [formData, setFormData] = useState<FormData>(new FormData())
  const [image, setImage] = useState(user?.profile_img || 'https://via.placeholder.com/150')
  const [showCamera, setShowCamera] = useState<boolean>(false)

  const handleUploadChange = async file => {
    const tempFormData = new FormData()

    if (typeof file === 'string') {
      try {
        console.log('x')
        tempFormData.append('file', file)
        setImage(file)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        console.log('y')

        const base64Image = await getBase64(file)
        setImage(base64Image as string)
        tempFormData.append('file', file)
      } catch (error) {
        console.log(error)
      }
    }

    setShowCamera(false)
    setFormData(tempFormData)
  }

  const handleSubmit = async () => {
    try {
      await addOrUpdateUserImage({ _id: user._id, file: formData })
      dispatch(closeModal(`openAddOrChangeImageModal-${user._id}`))
      userApi.util.resetApiState()
      toastSuccess(user.firstname + ' ' + user.lastname + 'profile image saved successfully')
    } catch (error) {
      toastError(user.firstname + ' ' + user.lastname + 'profile image didnot saved')
      console.log(error)
    }
  }

  return (
    <ItemContainer height="100%">
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <H1 width="100%" textAlign="center" color={colors.white.primary}>
            Update User ({user.firstname + ' ' + user.lastname}) Image
          </H1>
        </ModalHeader>
        <ModalBody height="calc(100% - 63px)">
          <Column width="100%">
            <ItemContainer position="relative" margin="1rem auto" width="100%">
              <UserImage width="100%" height="100%" src={image} />
              {showCamera ? (
                <ItemContainer position="absolute" top="0" left="0" width="100%" height="100%">
                  <WebcamCapture handleShowCamera={show => setShowCamera(show)} onCapture={handleUploadChange} />
                </ItemContainer>
              ) : (
                <ItemContainer position="absolute" top="0.5rem" left="0.5rem" width="auto">
                  <Button color={colors.primary.dark} onClick={setShowCamera.bind(this, true)}>
                    Take Photo
                  </Button>
                </ItemContainer>
              )}
            </ItemContainer>
            <JustifyCenterRow width="100%" margin="1rem 0">
              <FileUploader
                style={{ width: '100%' }}
                handleChange={handleUploadChange}
                name="file"
                types={['JPG', 'PNG', 'JPEG']}
                classes="drop_area"
              />
            </JustifyCenterRow>

            <Button margin="1rem 0" onClick={handleSubmit}>
              Save
            </Button>
          </Column>
        </ModalBody>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default AddOrChangeUserImageModal
