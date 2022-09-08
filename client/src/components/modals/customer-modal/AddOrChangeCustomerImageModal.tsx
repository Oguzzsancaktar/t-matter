import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ActionButtons } from '@/components/data-tables'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { UserSkeletonLoader } from '@/components/skelton-loader'
import ReliableSlider from '@/components/slider/ReliableSlider'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ICustomer, ESize, EStatus, ECustomerType } from '@/models'
import { CustomerModalActivityTab, CustomerModalWorkflowTab, CustomerModalFinanceTab } from '@/pages'
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerStatusMutation,
  useUpdateCustomerMutation,
  useAddOrUpdateCustomerImageMutation
} from '@/services/customers/customerService'
import { openModal, closeModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import moment from 'moment'
import { useState } from 'react'
import { Camera } from 'react-feather'
import { ConfirmModal } from '../general'
import { ModalHeader, ModalBody } from '../types'
import MakeContactToClientModal from './MakeContactToClientModal'
import UpdateCustomerModal from './UpdateCustomerModal'

interface IProps {
  customer: ICustomer
}

const AddOrChangeCustomerImageModal: React.FC<IProps> = ({ customer }) => {
  const [addOrUpdateCustomerImage] = useAddOrUpdateCustomerImageMutation()

  const [fileSelected, setFileSelected] = useState<File>() // also tried <string | Blob>

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files

    if (!fileList) return

    setFileSelected(fileList[0])
  }

  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileSelected) {
      const formData = new FormData()
      formData.append('image', fileSelected, fileSelected.name)
      console.log(formData)
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
          <div>
            <label htmlFor="photo">
              <input
                accept="image/*"
                id="photo"
                name="photo"
                type="file"
                multiple={false}
                onChange={handleImageChange}
              />

              <Button onClick={uploadFile}>Choose Picture</Button>
            </label>
          </div>

          {/* <input type="file" name="file" onChange={changeHandler} />
          {/* <img width={'100px'} src={file.picturePreview} /> 

          {isFilePicked ? (
            <div>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}

          <button onClick={handleSubmission}>asdfafsd</button> */}
        </ModalBody>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default AddOrChangeCustomerImageModal
