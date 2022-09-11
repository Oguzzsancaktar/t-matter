import React, { useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow, Row } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody, ModalHeader } from '../../types'
import { SummaryCard } from '@/components/card'
import WorkflowPlanStepNavigation from '@/pages/settings/workflow-planning/plan/WorkflowPlanStepNavigation'
import { ITaskCreateDTO, IWorkflowCreateDTO } from '@/models'
import { Button } from '@/components/button'
import colors from '@/constants/colors'
import { useCreatePlanMutation } from '@/services/settings/workflow-planning/workflowService'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import useAccessStore from '@/hooks/useAccessStore'
import { isValueBiggerThanZero, isValueNull } from '@/utils/validationUtils'
import { H1 } from '@/components/texts'
import { initialTask } from '@/constants/task'

const CreateWorkflowPlanModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [activeStep, setActiveStep] = useState<number>(0)
  const [createPlan] = useCreatePlanMutation()

  const [createWorkflowData, setCreateWorkflowData] = useState<IWorkflowCreateDTO>({
    name: '',
    steps: [{ ...initialTask }]
  })

  const initialErrors = {
    nameError: false,
    durationError: false,
    priceError: false,
    expireDurationError: false,
    postponeTimeError: false,
    categoryError: false,
    locationError: false,
    responsibleUserError: false,
    tabsError: false,
    checklistItemsError: false
  }
  const [validationError, setValidationErrors] = useState({ ...initialErrors })

  const handleWorkflowNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateWorkflowData({ ...createWorkflowData, name: event.target.value })
  }

  const handleNewStep = () => {
    setCreateWorkflowData({
      ...createWorkflowData,
      steps: [...createWorkflowData.steps, initialTask]
    })

    handleStepChange(createWorkflowData.steps.length)
  }

  const handleDataChange = (taskStep: ITaskCreateDTO) => {
    const stepsInstance = [...createWorkflowData.steps]
    stepsInstance[activeStep] = taskStep
    const updatedData = {
      ...createWorkflowData,
      steps: stepsInstance
    }
    setCreateWorkflowData(updatedData)
  }

  const validateFieldValues = () => {
    let result = true
    if (!isValueNull(createWorkflowData.name)) {
      setValidationErrors({ ...initialErrors, nameError: true })
      toastError('Please enter valid workflow name')
      return (result = false)
    }

    createWorkflowData.steps.forEach((task, index) => {
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

      if (!isValueBiggerThanZero(+(task.postponeTime ?? 0))) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, postponeTimeError: true })
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
    let dataInstance = [...createWorkflowData.steps]

    if (dataInstance.length > 1) {
      dataInstance = dataInstance.filter((step, i) => i !== index)

      handleStepChange(0)

      setCreateWorkflowData({
        ...createWorkflowData,
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
        const tempCreateWorkflowData = { ...createWorkflowData }

        tempCreateWorkflowData.steps.map((step, index) => {
          tempCreateWorkflowData.steps[index].stepIndex = index
        })

        await createPlan(tempCreateWorkflowData)
        toastSuccess(`Workflow plan ${createWorkflowData.name} created successfully`)
        dispatch(closeModal('createWorkflowPlanModal'))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleStepChange = (index: number) => {
    setValidationErrors({ ...initialErrors })
    setActiveStep(index)
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <JustifyCenterRow width="100%">
          <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
            Create Workflow Plan
          </H1>
        </JustifyCenterRow>
      </ModalHeader>
      <ModalBody height="calc(100% - 63px)">
        <JustifyBetweenRow height="100%">
          <ItemContainer height="100%" width="300px">
            <WorkflowPlanStepNavigation
              data={createWorkflowData}
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
                  data={createWorkflowData.steps[activeStep]}
                />
              </ItemContainer>
              <ItemContainer height="100%" width="350px">
                <Column height="100%">
                  <ItemContainer height="calc(100% - 35px - 0.5rem)">
                    <SummaryCard
                      body={
                        <WorkflowPlanSummaryBody checklistData={createWorkflowData.steps[activeStep].checklistItems} />
                      }
                      footer={
                        <WorkflowPlanSummaryFooter
                          checklistIdArr={createWorkflowData.steps[activeStep].checklistItems}
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
        </JustifyBetweenRow>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default CreateWorkflowPlanModal
