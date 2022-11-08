import React, { useEffect, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyCenterRow, Row } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody, ModalHeader } from '../../types'
import { SummaryCard } from '@/components/card'
import WorkflowPlanStepNavigation from '@/pages/settings/workflow-planning/plan/WorkflowPlanStepNavigation'
import { ITaskCreateDTO, IWorkflow, IWorkflowUpdateDTO } from '@/models'
import { Button } from '@/components/button'
import colors from '@/constants/colors'
import {
  usePatchWorkflowPlanMutation,
  useGetPlanByIdQuery
} from '@/services/settings/workflow-planning/workflowService'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import useAccessStore from '@/hooks/useAccessStore'
import { isValueBiggerThanZero, isValueNull } from '@/utils/validationUtils'
import { H1 } from '@/components/texts'
import { initialTask } from '@/constants/task'

interface IProps {
  workflow: IWorkflow
}

const UpdateWorkflowPlanModal: React.FC<IProps> = ({ workflow }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const { data: workflowData, isLoading: workflowIsLoading } = useGetPlanByIdQuery(workflow._id)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [updatePlan] = usePatchWorkflowPlanMutation()

  const [updateWorkflowData, setUpdateWorkflowData] = useState<IWorkflowUpdateDTO>({
    _id: workflowData?._id || workflow._id,
    name: workflowData?.name || workflow.name,
    steps: workflowData?.steps || workflow.steps
  })

  const initialErrors = {
    nameError: false,
    expireDurationError: false,
    postponeLimitError: false,
    categoryError: false,
    locationError: false,
    responsibleUserError: false,
    tabsError: false,
    checklistItemsError: false
  }
  const [validationError, setValidationErrors] = useState({ ...initialErrors })

  const handleWorkflowNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateWorkflowData({ ...updateWorkflowData, name: event.target.value })
  }

  const handleNewStep = () => {
    setUpdateWorkflowData({
      ...updateWorkflowData,
      steps: [...updateWorkflowData.steps, initialTask]
    })

    handleStepChange(updateWorkflowData.steps.length)
  }

  const handleDataChange = (taskStep: ITaskCreateDTO) => {
    const stepsInstance = [...updateWorkflowData.steps]
    stepsInstance[activeStep] = taskStep
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
      toastError('Please enter valid workflow name')
      return (result = false)
    }

    updateWorkflowData.steps.forEach((task, index) => {
      if (task.category._id === '-1') {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, categoryError: true })
        toastError('Please enter valid task category')
        return (result = false)
      }

      if (!isValueBiggerThanZero(+(task.expireDuration ?? 0))) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, expireDurationError: true })
        toastError('Please enter valid task expire duration')
        return (result = false)
      }

      if (task.location._id === '-1') {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, locationError: true })
        toastError('Please enter valid task location')
        return (result = false)
      }

      if (!isValueBiggerThanZero(+(task.postponeLimit ?? 0))) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, postponeLimitError: true })
        toastError('Please enter valid task postpone duration')
        return (result = false)
      }

      if (task.responsibleUser._id === '-1') {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, responsibleUserError: true })
        toastError('Please select task responsible user')
        return (result = false)
      }

      if (task.tabs.length === 0) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, tabsError: true })
        toastError('Please select at leasst 1 tab')
        return (result = false)
      }

      if (task.checklistItems.length === 0) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, checklistItemsError: true })
        toastError('Please select at leasst 1 checklist')
        return (result = false)
      }
    })

    return result
  }

  const handleStepRemove = (index: number) => {
    let dataInstance = [...updateWorkflowData.steps]

    if (dataInstance.length > 1) {
      dataInstance = dataInstance.filter((step, i) => i !== index)

      handleStepChange(0)

      setUpdateWorkflowData({
        ...updateWorkflowData,
        steps: [...dataInstance]
      })
    } else {
      toastError('Workflows need to has 1 step at least!')
    }
  }

  const handleSubmit = async () => {
    setValidationErrors({ ...initialErrors })
    const validationResult = validateFieldValues()
    if (validationResult) {
      try {
        console.log(updateWorkflowData)
        await updatePlan(updateWorkflowData)
        toastSuccess(`Workflow plan ${updateWorkflowData.name} updated successfully`)
        dispatch(closeModal(`updateWorkflowPlanModal-${workflow._id}`))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleStepChange = (index: number) => {
    setValidationErrors({ ...initialErrors })
    validateFieldValues()
    setActiveStep(index)
  }

  useEffect(() => {
    if (workflowData) {
      setUpdateWorkflowData({
        ...workflowData
      })
    }
  }, [workflowData, workflowIsLoading])

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <JustifyCenterRow width="100%">
          <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
            Update Workflow Plan - ({workflow.name})
          </H1>
        </JustifyCenterRow>
      </ModalHeader>

      <ModalBody>
        {workflowData && !workflowIsLoading && updateWorkflowData && (
          <Row height="100%">
            <ItemContainer height="100%" width="300px">
              <WorkflowPlanStepNavigation
                data={updateWorkflowData}
                activeStep={activeStep}
                addNewStep={handleNewStep}
                onStepChange={handleStepChange}
                onStepRemove={handleStepRemove}
                onWfNameChange={handleWorkflowNameChange}
                workflowNameValidation={validationError.nameError}
              />
            </ItemContainer>

            <ItemContainer height="100%" width="calc(100% - 300px)">
              <Row height="100%">
                <ItemContainer height="100%" width="calc(100% - 350px)">
                  <WorkflowPlanForm
                    activeStep={activeStep}
                    onDataChange={handleDataChange}
                    errors={validationError}
                    data={updateWorkflowData.steps[activeStep]}
                  />
                </ItemContainer>
                <ItemContainer height="100%" width="350px">
                  <Column height="100%">
                    <ItemContainer height="calc(100% - 35px - 0.5rem)">
                      <SummaryCard
                        body={
                          <WorkflowPlanSummaryBody
                            checklistData={updateWorkflowData.steps[activeStep].checklistItems}
                          />
                        }
                        footer={
                          <WorkflowPlanSummaryFooter
                            checklistIdArr={updateWorkflowData.steps[activeStep].checklistItems}
                          />
                        }
                      />
                    </ItemContainer>
                    <ItemContainer height="35px" margin="0.5rem 0 0 0">
                      <Button onClick={handleSubmit} color={colors.blue.primary}>
                        Submit
                      </Button>
                    </ItemContainer>
                  </Column>
                </ItemContainer>
              </Row>
            </ItemContainer>
          </Row>
        )}
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default UpdateWorkflowPlanModal
