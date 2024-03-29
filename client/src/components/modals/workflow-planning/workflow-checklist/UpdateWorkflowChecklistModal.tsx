import { ConfirmCancelButtons } from '@/components/button'
import {
  ClockPicker24,
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyCenterRow,
  JustifyCenterColumn,
  H1,
  ItemContainer
} from '@/components'

import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { secondsToHourMin, timeToSeconds } from '@/utils/timeUtils'
import React, { useState } from 'react'
import { DollarSign, MousePointer, Terminal } from 'react-feather'
import { ModalHeader, ModalBody, ModalFooter } from '../../types'
import { isValueBiggerThanZero, isValueNull } from '@/utils/validationUtils'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { usePatchWorkflowChecklistMutation } from '@/services/settings/workflow-planning/workflowService'
import { ITaskChecklist, ITaskChecklistUpdateDTO } from '@/models'
import { useGetCompanyPricingQuery } from '@/services/settings/company-planning/companyPricingService'
import colors from '@/constants/colors'

interface IProps {
  checklist: ITaskChecklist
}
const UpdateWorkflowChecklistModal: React.FC<IProps> = ({ checklist }) => {
  const { data: companyPricingData, isLoading: isCompanyPricingDataLoading, error } = useGetCompanyPricingQuery()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [checklistPrice, setChecklistPrice] = useState(checklist.price)

  const [workflowChecklist, setWorkflowChecklist] = useState<
    Pick<ITaskChecklistUpdateDTO, 'name' | 'point' | 'duration'>
  >({
    name: checklist.name,
    point: checklist.point,
    duration: checklist.duration
  })

  const initialErrorsState = {
    nameError: false,
    pointError: false,
    durationError: false,
    priceError: false
  }
  const [validationErrors, setValidationErrors] = useState({ ...initialErrorsState })

  const [patchWorkflowChecklist] = usePatchWorkflowChecklistMutation()

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
      ? setWorkflowChecklist({ ...workflowChecklist, point: Number(value[0] === '0' ? value.slice(1) : value) })
      : name === 'duration'
      ? setWorkflowChecklist({ ...workflowChecklist, duration: Number(value) })
      : setWorkflowChecklist({ ...workflowChecklist, name: value })
  }

  const handleDurationChange = (durationSecond: number) => {
    setWorkflowChecklist({ ...workflowChecklist, duration: durationSecond })
    // do
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
        await patchWorkflowChecklist({ ...workflowChecklist, _id: checklist._id })
        toastSuccess('Checklist ' + checklist.name + ' updated successfully')
        dispatch(closeModal(`updateWorkflowChecklistModal-${checklist._id}`))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    dispatch(closeModal(`updateWorkflowChecklistModal-${checklist._id}`))
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update Workflow Checklist - ({checklist.name})
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
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
              value={
                workflowChecklist.point === 0
                  ? undefined
                  : workflowChecklist.point[0] === '0'
                  ? workflowChecklist.point.toString().slice(1)
                  : workflowChecklist.point.toString()
              }
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
              value={checklistPrice.toFixed(2)}
              onChange={handleInputChange}
              type="number"
              validationError={validationErrors.priceError}
              labelText="Checklist Price"
            />
          </ItemContainer>
        </JustifyCenterColumn>
      </ModalBody>

      <ModalFooter>
        <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default UpdateWorkflowChecklistModal
