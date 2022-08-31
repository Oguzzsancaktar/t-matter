import React, { useEffect, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { useGetPlanByIdQuery, useGetPlansQuery } from '@/services/settings/workflow-planning/workflowService'
import { SelectInput } from '@/components/input'
import { Button } from '@/components/button'
import { SummaryCard } from '@/components/card'
import { Row, Column, JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody, ModalHeader } from '../types'
import useAccessStore from '@/hooks/useAccessStore'
import { ETaskStatus, ICustomer, ICustomerTask, ITaskCreateDTO, IWorkflowUpdateDTO } from '@/models'
import { closeModal } from '@/store'
import { toastSuccess } from '@/utils/toastUtil'
import { isValueNull, isValueBiggerThanZero } from '@/utils/validationUtils'
import colors from '@/constants/colors'
import { useCreateTaskMutation } from '@/services/customers/taskService'
import moment from 'moment'
import emptyQueryParams from '@/constants/queryParams'
import { H1 } from '@/components/texts'

interface IProps {
  customer: ICustomer
}

const SelectTaskWorkflowModal: React.FC<IProps> = ({ customer }) => {
  const { data: workflowPlans, isLoading: workflowPlanIsLoading } = useGetPlansQuery(emptyQueryParams)

  const [createTask, { isLoading: createTaskIsLoading }] = useCreateTaskMutation()

  const [selectedWorkflowPlan, setSelectedWorkflowPlan] = useState('')
  const { data: workflowData, isLoading: workflowIsLoading } = useGetPlanByIdQuery(selectedWorkflowPlan)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

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
  const [validationErrorMessage, toastError] = useState<string>('')

  const handleDataChange = (taskStep: ITaskCreateDTO, stepIndex: number) => {
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
      toastError('Please enter valid workflow name')
      return (result = false)
    }

    updateWorkflowData.steps.forEach((task, index) => {
      if (task.category._id === '-1') {
        setValidationErrors({ ...initialErrors, categoryError: true })
        toastError('Please enter valid task category')
        return (result = false)
      }

      if (!isValueBiggerThanZero(+(task.expireDuration ?? 0))) {
        setValidationErrors({ ...initialErrors, expireDurationError: true })
        toastError('Please enter valid task expire duration')
        return (result = false)
      }

      if (task.location._id === '-1') {
        setValidationErrors({ ...initialErrors, locationError: true })
        toastError('Please enter valid task location')
        return (result = false)
      }

      if (!isValueBiggerThanZero(+(task.postponeTime ?? 0))) {
        setValidationErrors({ ...initialErrors, postponeTimeError: true })
        toastError('Please enter valid task postpone duration')
        return (result = false)
      }

      if (task.responsibleUser._id === '-1') {
        setValidationErrors({ ...initialErrors, responsibleUserError: true })
        toastError('Please select task responsible user')
        return (result = false)
      }

      if (task.tabs.length === 0) {
        setValidationErrors({ ...initialErrors, tabsError: true })
        toastError('Please select at leasst 1 tab')
        return (result = false)
      }

      if (task.checklistItems.length === 0) {
        setValidationErrors({ ...initialErrors, checklistItemsError: true })
        toastError('Please select at leasst 1 checklist')
        return (result = false)
      }

      if (!isValueNull(task.stepColor)) {
        setValidationErrors({ ...initialErrors, stepColorError: true })
        toastError('Please select task color')
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
        const task: ICustomerTask = {
          customer,
          startDate: Date.now().toString(),
          name: updateWorkflowData.name,
          steps: []
        }

        for (let index = 0; index < updateWorkflowData.steps.length; index++) {
          const step = updateWorkflowData.steps[index]

          task.steps.push({
            category: step.category,
            location: step.location,
            tabs: step.tabs,
            responsibleUser: step.responsibleUser,
            startDate: Date.now().toString(),
            endDate: moment(Date.now()).add(7, 'days').toString(),
            stepColor: step.stepColor,
            stepStatus: ETaskStatus.Not_Started,
            expireDuration: step.expireDuration,
            passedTime: 0,
            postponeTime: step.postponeTime,
            usedPostpone: 0,
            postponedDate: '',
            checklistItems: step.checklistItems.map(item => ({
              ...item,
              isChecked: false
            }))
          })
        }

        await createTask(task)
        toastSuccess(`User tasl ${updateWorkflowData.name} created successfully`)
        dispatch(closeModal(`selectTaskWorkflowModal-${customer._id}`))
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
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
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Select Workflow For Customer
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <ItemContainer backgroundColor={colors.white.bg}>
          <ItemContainer margin="0.5rem 0.5rem 0 0">
            <SelectInput
              isLoading={workflowPlanIsLoading}
              name="Create Task"
              onChange={option => setSelectedWorkflowPlan(option.value)}
              options={(workflowPlans || []).map(wf => ({ value: wf._id, label: wf.name }))}
              labelText="Select Workflow Plan"
            />
          </ItemContainer>
          <ItemContainer>
            <ModalBody>
              {updateWorkflowData && !workflowIsLoading && (
                <Column max-height="100%">
                  {updateWorkflowData.steps.map((task, index) => (
                    <ItemContainer height="100%" width="calc(100% - 300px)" key={index}>
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
      </ModalBody>
    </JustifyBetweenColumn>
  )
}
export default SelectTaskWorkflowModal
