import React, { useEffect, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, Row } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody } from '../../types'
import { SummaryCard } from '@/components/card'
import WorkflowPlanStepNavigation from '@/pages/Settings/workflow-planning/plan/WorkflowPlanStepNavigation'
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
  const [errorStep, setErrorStep] = useState(0)
  const [validationError, setValidationErrors] = useState({ ...initialErrors })
  const [validationErrorMessage, setValidationErrorMessage] = useState<string>('')

  const calculateWorkflowTotals = () => {
    let totalPrice = 0
    let totalDuration = 0

    createWorkflowData.steps.forEach(task => {
      task.checklistItems.forEach(item => {
        if (!isChecklistsLoading && checklistsData) {
          const checklistDetail = checklistsData.find(chck => chck._id === item._id)
          if (checklistDetail) {
            totalPrice += checklistDetail.price
            totalDuration += checklistDetail.duration
          }
        }
      })
    })

    setCreateWorkflowData({ ...createWorkflowData, price: totalPrice, duration: totalDuration })
  }

  const handleWorkflowNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateWorkflowData({ ...createWorkflowData, name: event.target.value })
  }

  const handleNewStep = () => {
    setCreateWorkflowData({
      ...createWorkflowData,
      steps: [...createWorkflowData.steps, initialTask]
    })

    setActiveStep(createWorkflowData.steps.length)
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
    if (!isValueNull(createWorkflowData.name)) {
      setValidationErrors({ ...initialErrors, nameError: true })
      setValidationErrorMessage('Please enter valid workflow name')
      return false
    }

    // createWorkflowData.steps
    // if (!isValueNull()) {
    //   setValidationErrors({ ...initialErrors, nameError: true })
    //   setValidationErrorMessage('Please enter valid workflow name')
    //   return false
    // }

    if (!isValueNull(createWorkflowData.duration.toString()) && !isValueBiggerThanZero(createWorkflowData.duration)) {
      setValidationErrors({ ...initialErrors, durationError: true })
      setValidationErrorMessage('Workflow duration error')
      return false
    }

    if (!isValueNull(createWorkflowData.price.toString()) && !isValueBiggerThanZero(createWorkflowData.price)) {
      setValidationErrors({ ...initialErrors, priceError: true })
      setValidationErrorMessage('Workflow price error')
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    setValidationErrors({ ...initialErrors })

    const validationResult = validateFieldValues()
    calculateWorkflowTotals()
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
            onStepChange={setActiveStep}
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
