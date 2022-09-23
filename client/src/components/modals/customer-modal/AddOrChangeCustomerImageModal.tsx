import { FileUploader } from 'react-drag-drop-files'

import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ICustomer } from '@/models'
import { customerApi, useAddOrUpdateCustomerImageMutation } from '@/services/customers/customerService'
import { useState } from 'react'
import { ModalHeader, ModalBody } from '../types'
import { WebcamCapture } from '@/components/camera'
import { Button } from '@/components/button'
import { UserImage } from '@/components/image'
import { getBase64 } from '@/utils/imageConvert'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'

interface IProps {
  customer: ICustomer
}

const AddOrChangeCustomerImageModal: React.FC<IProps> = ({ customer }) => {
  const [addOrUpdateCustomerImage, { isLoading: customerImageUpdateIsLoading }] = useAddOrUpdateCustomerImageMutation()
  const [formData, setFormData] = useState<FormData>(new FormData())
  const [image, setImage] = useState(customer?.profile_img || 'https://via.placeholder.com/150')
  const [showCamera, setShowCamera] = useState<boolean>(false)

  const handleUploadChange = async file => {
    const tempFormData = new FormData()

    if (typeof file === 'string') {
      try {
        tempFormData.append('file', file)
        setImage(file)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const base64Image = await getBase64(file)
        setImage(base64Image as string)
        console.log(base64Image)
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
      await addOrUpdateCustomerImage({ _id: customer._id, file: formData })
      customerApi.util.resetApiState()
      toastSuccess(customer.firstname + ' ' + customer.lastname + 'profile image saved successfully')
      closeModal(`openAddOrChangeImageModal-${customer?._id}`)
    } catch (error) {
      toastError(customer.firstname + ' ' + customer.lastname + 'profile image didnot saved')
      console.log(error)
    }
  }

  return (
    <ItemContainer height="100%">
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <H1 width="100%" textAlign="center" color={colors.white.primary}>
            Update Customer ({customer.firstname + ' ' + customer.lastname}) Image
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

export default AddOrChangeCustomerImageModal
