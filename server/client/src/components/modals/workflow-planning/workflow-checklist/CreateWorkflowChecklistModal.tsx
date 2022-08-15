import { ConfirmCancelButtons } from '@/components/button'
import {
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyCenterRow,
  JustifyCenterColumn,
  Row,
  H1,
  InnerWrapper,
  ClockPicker24
} from '@/components'
import { ItemContainer } from '@/components/item-container'

import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { secondsToHourMin, timeToSeconds } from '@/utils/timeUtils'
import React, { useState } from 'react'
import { DollarSign, MousePointer, Terminal } from 'react-feather'
import { ModalHeader, ModalBody, ModalFooter } from '../../types'
import { isValueBiggerThanZero, isValueNull } from '@/utils/validationUtils'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { useCreateChecklistMutation } from '@/services/settings/workflow-planning/workflowService'
import { ITaskChecklistCreateDTO } from '@/models'
import { useGetCompanyPricingQuery } from '@/services/settings/company-planning/companyPricingService'
import colors from '@/constants/colors'

const CreateWorkflowChecklistModal = () => {
  const { data: companyPricingData, isLoading: isCompanyPricingDataLoading } = useGetCompanyPricingQuery()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [workflowChecklist, setWorkflowChecklist] = useState<ITaskChecklistCreateDTO>({
    name: '',
    point: 0,
    duration: 0,
    isChecked: false
  })

  const initialErrorsState = {
    nameError: false,
    pointError: false,
    durationError: false,
    priceError: false
  }
  const [validationErrors, setValidationErrors] = useState({ ...initialErrorsState })

  const [createChecklist] = useCreateChecklistMutation()

  const [checklistPrice, setChecklistPrice] = useState(0)

  const validateInputValues = () => {
    if (!isValueNull(workflowChecklist.name)) {
      toastError('Please enter a name for the checklist')
      setValidationErrors({ ...initialErrorsState, nameError: true })
      return false
    }

    if (!isValueBiggerThanZero(workflowChecklist.point)) {
      toastError('Please enter a point value for the checklist')
      setValidationErrors({ ...initialErrorsState, pointError: true })
      return false
    }

    if (!isValueBiggerThanZero(workflowChecklist.duration)) {
      toastError('Please enter a duration value for the checklist')
      setValidationErrors({ ...initialErrorsState, durationError: true })
      return false
    }

    return true
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    name === 'point'
      ? setWorkflowChecklist({ ...workflowChecklist, point: Number(value) })
      : name === 'duration'
      ? setWorkflowChecklist({ ...workflowChecklist, duration: Number(value) })
      : setWorkflowChecklist({ ...workflowChecklist, name: value })
  }

  const handleDurationChange = (durationSecond: number) => {
    setWorkflowChecklist({ ...workflowChecklist, duration: durationSecond })

    if (!isCompanyPricingDataLoading || companyPricingData) {
      setChecklistPrice((durationSecond / 60 / 60) * (companyPricingData?.summary.hourlyCompanyFee || -1))
    }
  }

  const resetValidationErrors = () => {
    setValidationErrors({ ...initialErrorsState })
  }
  const handleConfirm = async () => {
    resetValidationErrors()

    try {
      if (validateInputValues()) {
        await createChecklist(workflowChecklist)
        toastSuccess(`Workflow checklist ${workflowChecklist.name} created successfully`)
        dispatch(closeModal('createWorkflowChecklistModal'))
      } else {
        console.log(workflowChecklist, validationErrors)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    dispatch(closeModal('createWorkflowChecklistModal'))
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Create Workflow Checklist
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <ItemContainer margin="1rem 0">
              <InputWithIcon
                children={<Terminal size={16} />}
                name="name"
                placeholder="Enter workflow checklist name..."
                onChange={handleInputChange}
                validationError={validationErrors.nameError}
                value={workflowChecklist.name}
                type="text"
                labelText="Checklist Name"
              />
            </ItemContainer>
            <ItemContainer margin="1rem 0">
              <InputWithIcon
                children={<MousePointer size={16} />}
                name="point"
                placeholder="Enter workflow point..."
                onChange={handleInputChange}
                validationError={validationErrors.pointError}
                value={workflowChecklist.point}
                type="number"
                labelText="Checklist Point"
              />
            </ItemContainer>
            <ItemContainer margin="1rem 0">
              <ClockPicker24
                validationError={validationErrors.durationError}
                labelText={'Checklist Duration'}
                value={secondsToHourMin(workflowChecklist.duration)}
                name={'duration'}
                onChange={(value: string) => handleDurationChange(+timeToSeconds(value))}
              />
            </ItemContainer>
            <ItemContainer margin="1rem 0">
              <InputWithIcon
                children={<DollarSign size={16} />}
                disabled={true}
                name="price"
                placeholder="0"
                value={checklistPrice}
                onChange={handleInputChange}
                type="number"
                validationError={validationErrors.priceError}
                labelText="Checklist Price"
              />
            </ItemContainer>
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>

      <ModalFooter>
        <InnerWrapper>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </InnerWrapper>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default CreateWorkflowChecklistModal
