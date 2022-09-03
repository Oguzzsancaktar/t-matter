import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { IJobTitle } from '@/models'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { usePatchJobTitleMutation } from '@/services/settings/company-planning/dynamicVariableService'
import colors from '@/constants/colors'

interface IProps {
  jobTitle: IJobTitle
}

const UpdateJobTitleModal: React.FC<IProps> = ({ jobTitle }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [patchJobTitle] = usePatchJobTitleMutation()

  const [jobTitleName, setJobTitleName] = useState(jobTitle.name)

  const handleCancel = () => {
    dispatch(closeModal('updateJobTitleModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(jobTitleName)) {
      await patchJobTitle({ _id: jobTitle._id, name: jobTitleName })
      toastSuccess('JobTitle ' + jobTitleName + ' updated successfully')
      dispatch(closeModal(`updateJobTitleModal-${jobTitle._id}`))
    } else {
      toastWarning('JobTitle name is required')
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update Company JobTitle
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row>
              <InputRegular
                name="jobTitleName"
                placeholder="JobTitle Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitleName(e.target.value)}
                value={jobTitleName}
                type="text"
                labelText="JobTitle Name"
              />
            </Row>
          </JustifyCenterColumn>
        </ItemContainer>
      </ModalBody>

      <ModalFooter>
        <ItemContainer>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </ItemContainer>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default UpdateJobTitleModal
