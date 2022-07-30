import React, { useEffect, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import {
  useGetPlanByIdQuery,
  useGetPlansQuery,
  usePatchWorkflowPlanMutation
} from '@/services/settings/workflow-planning/workflowService'
import { SelectInput } from '@/components/input'
import { Button } from '@/components/button'
import { SummaryCard } from '@/components/card'
import { Row, Column } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody } from '../types'
import useAccessStore from '@/hooks/useAccessStore'
import { ITaskCreateDTO, IWorkflowUpdateDTO } from '@/models'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { isValueNull, isValueBiggerThanZero } from '@/utils/validationUtils'
import colors from '@/constants/colors'

const SelectTaskWorkflowModal = () => {
  const { data: workflowPlans, isLoading: workflowPlanIsLoading } = useGetPlansQuery()

  const [selectedWorkflowPlan, setSelectedWorkflowPlan] = useState('')
  const { data: workflowData, isLoading: workflowIsLoading } = useGetPlanByIdQuery(selectedWorkflowPlan)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [updatePlan] = usePatchWorkflowPlanMutation()

  const [updateWorkflowData, setUpdateWorkflowData] = useState<IWorkflowUpdateDTO>({
    _id: workflowData?._id || '',
    name: workflowData?.name || '',
    steps: workflowData?.steps || []
  })

  const initialErrors = {
    nameError: false,
    expireDurationError: false,
    postponeTimeError: false,
    categoryError: false,
    locationError: false,
    responsibleUserError: false,
    tabsError: false,
    checklistItemsError: false,
    stepColorError: false
  }
  const [validationError, setValidationErrors] = useState({ ...initialErrors })
  const [validationErrorMessage, setValidationErrorMessage] = useState<string>('')

  const handleDataChange = (taskStep: ITaskCreateDTO, stepIndex) => {
    const stepsInstance = [...updateWorkflowData.steps]
    stepsInstance[stepIndex] = taskStep
    const updatedData = {
      ...updateWorkflowData,
      steps: stepsInstance
    }
    setUpdateWorkflowData(updatedData)
  }

  const validateFieldValues = () => {
    let result = true
    if (!isValueNull(updateWorkflowData.name)) {
      setValidationErrors({ ...initialErrors, nameError: true })
      setValidationErrorMessage('Please enter valid workflow name')
      return (result = false)
    }

    updateWorkflowData.steps.forEach((task, index) => {
      if (task.category._id === '-1') {
        setValidationErrors({ ...initialErrors, categoryError: true })
        setValidationErrorMessage('Please enter valid task category')
        return (result = false)
      }

      if (!isValueBiggerThanZero(+(task.expireDuration ?? 0))) {
        setValidationErrors({ ...initialErrors, expireDurationError: true })
        setValidationErrorMessage('Please enter valid task expire duration')
        return (result = false)
      }

      if (task.location._id === '-1') {
        setValidationErrors({ ...initialErrors, locationError: true })
        setValidationErrorMessage('Please enter valid task location')
        return (result = false)
      }

      if (!isValueBiggerThanZero(+(task.postponeTime ?? 0))) {
        setValidationErrors({ ...initialErrors, postponeTimeError: true })
        setValidationErrorMessage('Please enter valid task postpone duration')
        return (result = false)
      }

      if (task.responsibleUser._id === '-1') {
        setValidationErrors({ ...initialErrors, responsibleUserError: true })
        setValidationErrorMessage('Please select task responsible user')
        return (result = false)
      }

      if (task.tabs.length === 0) {
        setValidationErrors({ ...initialErrors, tabsError: true })
        setValidationErrorMessage('Please select at leasst 1 tab')
        return (result = false)
      }

      if (task.checklistItems.length === 0) {
        setValidationErrors({ ...initialErrors, checklistItemsError: true })
        setValidationErrorMessage('Please select at leasst 1 checklist')
        return (result = false)
      }

      if (!isValueNull(task.stepColor)) {
        setValidationErrors({ ...initialErrors, stepColorError: true })
        setValidationErrorMessage('Please select task color')
        return (result = false)
      }
    })

    return result
  }

  const handleRemoveStep = (stepIndex: number) => {
    setUpdateWorkflowData({
      ...updateWorkflowData,
      steps: updateWorkflowData.steps.filter((item, index) => stepIndex !== index)
    })
  }

  const handleSubmit = async () => {
    setValidationErrors({ ...initialErrors })
    const validationResult = validateFieldValues()
    if (validationResult) {
      try {
        console.log('xxxxxx======= ', updateWorkflowData)
        await updatePlan(updateWorkflowData)
        toastSuccess(`Workflow plan ${updateWorkflowData.name} updated successfully`)
        dispatch(closeModal(`updateWorkflowPlanModal-${workflowData?._id}`))
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    console.log('1234', workflowData)
    if (workflowData) {
      setUpdateWorkflowData({
        ...workflowData,
        steps: [...(workflowData.steps || workflowData[0].steps)]
      })
    }
  }, [workflowData, workflowIsLoading])

  useEffect(() => {
    toastError(validationErrorMessage)
  }, [validationErrorMessage])

  return (
    <ItemContainer backgroundColor={colors.white.bg}>
      <ItemContainer margin="0.5rem 0.5rem 0 0">
        <SelectInput
          isLoading={workflowPlanIsLoading}
          name="Create Task"
          // placeholder="Select your birthday..."
          onChange={option => setSelectedWorkflowPlan(option.value)}
          options={(workflowPlans || []).map(wf => ({ value: wf._id, label: wf.name }))}
          // selectedOption={[{ label: selectedWorkflowPlan, value: selectedWorkflowPlan }]}
          labelText="Select Workflow Plan"
          // validationError={roleError}
        />
      </ItemContainer>
      <ItemContainer>
        <ModalBody minHeight="700px">
          {updateWorkflowData && !workflowIsLoading && (
            <Column max-height="100%">
              {updateWorkflowData.steps.map((task, index) => (
                <ItemContainer height="100%" width="calc(100% - 300px)">
                  <Row height="100%">
                    <ItemContainer height="100%" width="calc(100% - 350px)">
                      <WorkflowPlanForm
                        activeStep={index}
                        onDataChange={() => handleDataChange(task, index)}
                        errors={validationError}
                        data={task}
                      />
                    </ItemContainer>
                    <ItemContainer height="100%" width="350px">
                      <Column height="100%">
                        <ItemContainer height="calc(100% - 35px - 0.5rem)">
                          <SummaryCard
                            body={<WorkflowPlanSummaryBody checklistData={task.checklistItems} />}
                            footer={<WorkflowPlanSummaryFooter checklistIdArr={task.checklistItems} />}
                          />
                        </ItemContainer>
                        <ItemContainer height="35px" margin="0.5rem 0 0 0">
                          <Button onClick={() => handleRemoveStep(index)} color={colors.red.primary}>
                            Remove Step
                          </Button>
                        </ItemContainer>
                      </Column>
                    </ItemContainer>
                  </Row>
                </ItemContainer>
              ))}
              <Button onClick={handleSubmit} color={colors.blue.primary}>
                Submit
              </Button>
            </Column>
          )}
        </ModalBody>
      </ItemContainer>
    </ItemContainer>
  )
}
export default SelectTaskWorkflowModal
