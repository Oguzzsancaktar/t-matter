import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { useCreateJobTitleMutation } from '@/services/settings/company-planning/dynamicVariableService'
import colors from '@/constants/colors'

const CreateJobTitleModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [jobTitleName, setJobTitleName] = useState('')
  const [createJobTitle] = useCreateJobTitleMutation()

  const handleCancel = () => {
    dispatch(closeModal('createJobTitleModal'))
  }

  const handleConfirm = async () => {
    try {
      if (isValueNull(jobTitleName)) {
        await createJobTitle({ name: jobTitleName })
        toastSuccess(`Company jobTitle ${jobTitleName} created successfully`)
        dispatch(closeModal('createJobTitleModal'))
      } else {
        toastError('Please enter a name for the company jobTitle')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <JustifyCenterRow width="100%">
          <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
            Create Company JobTitle
          </H1>
        </JustifyCenterRow>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
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

export default CreateJobTitleModal
