import React, { useEffect, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, Row } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody } from '../../types'
import { SummaryCard } from '@/components/card'
import WorkflowPlanStepNavigation from '@/pages/settings/workflow-planning/plan/WorkflowPlanStepNavigation'
import { ITaskCreateDTO, IWorkflowCreateDTO } from '@/models'
import { Button } from '@/components/button'
import colors from '@/constants/colors'
import { useCreatePlanMutation, useGetChecklistsQuery } from '@/services/settings/workflow-planning/workflowService'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import useAccessStore from '@/hooks/useAccessStore'
import { isValueBiggerThanZero, isValueNull } from '@/utils/validationUtils'

const CreateWorkflowPlanModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const { data: checklistsData, isLoading: isChecklistsLoading } = useGetChecklistsQuery()

  const [activeStep, setActiveStep] = useState<number>(0)
  const [createPlan] = useCreatePlanMutation()

  const initialTask: ITaskCreateDTO = {
    expireDuration: null,
    postponeTime: null,
    category: {
      _id: '-1',
      name: 'Select Value'
    },
    location: {
      _id: '-1',
      name: 'Select Value'
    },
    responsibleUser: {
      _id: '-1',
      firstname: 'First Name',
      lastname: 'Last Name'
    },
    tabs: [],
    checklistItems: [],
    stepColor: ''
  }

  const [createWorkflowData, setCreateWorkflowData] = useState<IWorkflowCreateDTO>({
    name: '',
    steps: [{ ...initialTask }],
    duration: 0,
    price: 0
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
    checklistItemsError: false,
    stepColorError: false
  }
  const [validationError, setValidationErrors] = useState({ ...initialErrors })
  const [validationErrorMessage, setValidationErrorMessage] = useState<string>('')

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
      setValidationErrorMessage('Please enter valid workflow name')
      return (result = false)
    }

    if (!isValueBiggerThanZero(createWorkflowData.duration)) {
      setValidationErrors({ ...initialErrors, checklistItemsError: true })
      setValidationErrorMessage('Workflow duration cant be zero please select checklist items')
      return (result = false)
    }

    createWorkflowData.steps.forEach((task, index) => {
      if (task.category._id === '-1') {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, categoryError: true })
        setValidationErrorMessage('Please enter valid task category')
        return (result = false)
      }

      if (!isValueBiggerThanZero(+(task.expireDuration ?? 0))) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, expireDurationError: true })
        setValidationErrorMessage('Please enter valid task expire duration')
        return (result = false)
      }

      if (task.location._id === '-1') {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, locationError: true })
        setValidationErrorMessage('Please enter valid task location')
        return (result = false)
      }

      if (!isValueBiggerThanZero(+(task.postponeTime ?? 0))) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, postponeTimeError: true })
        setValidationErrorMessage('Please enter valid task postpone duration')
        return (result = false)
      }

      if (task.responsibleUser._id === '-1') {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, responsibleUserError: true })
        setValidationErrorMessage('Please select task responsible user')
        return (result = false)
      }

      if (task.tabs.length === 0) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, tabsError: true })
        setValidationErrorMessage('Please select at leasst 1 tab')
        return (result = false)
      }

      if (task.checklistItems.length === 0) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, checklistItemsError: true })
        setValidationErrorMessage('Please select at leasst 1 checklist')
        return (result = false)
      }

      if (!isValueNull(task.stepColor)) {
        setActiveStep(index)
        setValidationErrors({ ...initialErrors, stepColorError: true })
        setValidationErrorMessage('Please select task color')
        return (result = false)
      }
    })

    if (!isValueNull(createWorkflowData.duration.toString()) && !isValueBiggerThanZero(createWorkflowData.duration)) {
      setValidationErrors({ ...initialErrors, durationError: true })
      setValidationErrorMessage('Workflow duration error')
      return (result = false)
    }

    if (!isValueNull(createWorkflowData.price.toString()) && !isValueBiggerThanZero(createWorkflowData.price)) {
      setValidationErrors({ ...initialErrors, priceError: true })
      setValidationErrorMessage('Workflow price error')
      return (result = false)
    }

    return result
  }

  const calculateWorkflowTotals = () => {
    const dataInstance: IWorkflowCreateDTO = { ...createWorkflowData }
    let totalDuration = 0
    let totalPrice = 0

    dataInstance.steps.forEach(task => {
      task.checklistItems.forEach(checklist => {
        totalDuration += checklist.duration
        totalPrice += checklist.price
      })
    })

    dataInstance.duration = totalDuration
    dataInstance.price = totalPrice

    setCreateWorkflowData(dataInstance)
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
        await createPlan(createWorkflowData)
        toastSuccess(`Workflow plan ${createWorkflowData.name} created successfully`)
        dispatch(closeModal('createWorkflowPlanModal'))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleStepChange = (index: number) => {
    setValidationErrors({ ...initialErrors })
    const validationResult = validateFieldValues()
    setActiveStep(index)
  }

  useEffect(() => {
    calculateWorkflowTotals()
  }, [createWorkflowData.steps])

  useEffect(() => {
    toastError(validationErrorMessage)
  }, [validationErrorMessage])

  return (
    <ModalBody minHeight="700px">
      <Row height="100%">
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
                      <WorkflowPlanSummaryFooter checklistIdArr={createWorkflowData.steps[activeStep].checklistItems} />
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
    </ModalBody>
  )
}

export default CreateWorkflowPlanModal
