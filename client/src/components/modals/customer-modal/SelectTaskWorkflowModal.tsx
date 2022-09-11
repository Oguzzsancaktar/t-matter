import React, { useEffect, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { useGetPlanByIdQuery, useGetPlansQuery } from '@/services/settings/workflow-planning/workflowService'
import { SelectInput } from '@/components/input'
import { Button } from '@/components/button'
import { JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { ModalBody, ModalHeader } from '../types'
import useAccessStore from '@/hooks/useAccessStore'
import { ETaskStatus, ICustomer, ICustomerTask, IOption, ITaskCreateDTO, IUser, IWorkflowUpdateDTO } from '@/models'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { isValueNull, isValueBiggerThanZero } from '@/utils/validationUtils'
import colors from '@/constants/colors'
import { useCreateTaskMutation } from '@/services/customers/taskService'
import moment from 'moment'
import { emptyQueryParams } from '@/constants/queryParams'
import { H1 } from '@/components/texts'
import { DatePicker } from '@/components/date-picker'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'

interface IProps {
  customer: ICustomer
}

const SelectTaskWorkflowModal: React.FC<IProps> = ({ customer }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [createTask, { isLoading: createTaskIsLoading }] = useCreateTaskMutation()

  const { data: workflowPlans, isLoading: workflowPlanIsLoading } = useGetPlansQuery(emptyQueryParams)
  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery(emptyQueryParams)

  const [selectedWorkflowPlanId, setSelectedWorkflowPlanId] = useState('')
  const { data: workflowData, isLoading: workflowIsLoading } = useGetPlanByIdQuery(selectedWorkflowPlanId)

  const [selectedWorkflow, setSelectedWorkflow] = useState<IWorkflowUpdateDTO>({
    _id: workflowData?._id || '',
    name: workflowData?.name || '',
    steps: workflowData?.steps || []
  })

  const [firstStepResponsibleUser, setFirstStepResponsibleUser] = useState(selectedWorkflow?.steps[0]?.responsibleUser)
  const [startDate, setStartDate] = useState<number>(moment.now())

  const [creationErrors, setCreationErrors] = useState({
    workflowError: false,
    responsibleUserError: false,
    startDateError: false
  })

  const handleStartDateChange = (value: Date[], dateText: string) => {
    setStartDate(moment(dateText).valueOf())
  }

  const handleResponsibleChange = (selectedUserId: IUser['_id']) => {
    let tempSelectedWorkflow = { ...selectedWorkflow }

    const selectedUser = usersData?.find(user => user._id === selectedUserId)

    if (selectedUser) {
      setFirstStepResponsibleUser(selectedUser)
      tempSelectedWorkflow.steps = tempSelectedWorkflow.steps.map((step, index) => {
        if (index === 0) {
          let firstStep = { ...step }

          firstStep.responsibleUser = selectedUser
          return firstStep
        }
        return step
      })
    }

    setSelectedWorkflow(tempSelectedWorkflow)
  }

  const handleStepChange = (selectedOptions: IOption[]) => {
    const tempselectedWorkflow = { ...selectedWorkflow }

    console.log(tempselectedWorkflow, selectedOptions)

    let wfSteps: ITaskCreateDTO[] = []

    if (workflowData) {
      workflowData.steps.map(step => {
        for (let k = 0; k < selectedOptions.length; k++) {
          const option = selectedOptions[k]
          if (step.category._id === option.value) {
            wfSteps.push(step)
          }
        }
      })
    }

    tempselectedWorkflow.steps = wfSteps

    if (tempselectedWorkflow.steps.length > 0) {
      setSelectedWorkflow(tempselectedWorkflow)
    } else {
      toastError('Task have to min 1 step')
    }
  }

  const handleDisbledInputs = () => {
    if (!(selectedWorkflowPlanId.trim().length > 0)) {
      toastError('Input disabled you have to select workflow first')
    }
  }

  const validateFields = (): boolean => {
    const tempErrors = {
      workflowError: false,
      responsibleUserError: false,
      startDateError: false
    }

    if (!isValueNull(selectedWorkflowPlanId)) {
      tempErrors.workflowError = true
      setCreationErrors(tempErrors)
      toastError('Please select workflow')
      return false
    }

    if (!isValueNull(firstStepResponsibleUser?._id)) {
      tempErrors.responsibleUserError = true
      setCreationErrors(tempErrors)
      toastError('Please select responsible user')
      return false
    }

    if (!isValueBiggerThanZero(startDate)) {
      tempErrors.startDateError = true
      setCreationErrors(tempErrors)
      toastError('Please select start date')
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    const calidationResult = validateFields()
    if (calidationResult) {
      try {
        const task: ICustomerTask = {
          customer,
          startDate: startDate,
          name: selectedWorkflow.name,
          steps: [],
          totalPrice: workflowData?.totalPrice,
          status: ETaskStatus.Not_Started
        }

        for (let index = 0; index < selectedWorkflow.steps.length; index++) {
          const step = selectedWorkflow.steps[index]

          if (index === 0) {
            task.steps.push({
              category: step.category,
              location: step.location,
              tabs: step.tabs,
              responsibleUser: step.responsibleUser,
              startDate: startDate,
              endDate: startDate + step.expireDuration * 60 * 60 * 24 * 1000,
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
          } else {
            task.steps.push({
              category: step.category,
              location: step.location,
              tabs: step.tabs,
              responsibleUser: step.responsibleUser,
              startDate: task.steps[index - 1].endDate,
              endDate: task.steps[index - 1].endDate + step.expireDuration * 60 * 60 * 24 * 1000,
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
        }

        await createTask(task)
        toastSuccess(`User tasl ${selectedWorkflow.name} created successfully`)
        dispatch(closeModal(`selectTaskWorkflowModal-${customer._id}`))
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (workflowData?.steps) {
      setSelectedWorkflow({
        ...workflowData,
        steps: [...workflowData.steps]
      })

      setFirstStepResponsibleUser(workflowData.steps[0].responsibleUser)
      setStartDate(moment.now().valueOf())
    }
  }, [workflowData, workflowIsLoading])

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
        <JustifyBetweenColumn height="100%">
          <ItemContainer margin="0.5rem 0">
            <SelectInput
              isLoading={workflowPlanIsLoading}
              name="Create Task"
              onChange={option => setSelectedWorkflowPlanId(option.value)}
              options={(workflowPlans || []).map(wf => ({ value: wf._id, label: wf.name }))}
              labelText="Select Workflow Plan"
              validationError={creationErrors.workflowError}
            />
          </ItemContainer>

          <ItemContainer margin="0.5rem 0" onClick={handleDisbledInputs}>
            <SelectInput
              isLoading={workflowIsLoading}
              name="workflowSteps"
              isDisabled={!(selectedWorkflowPlanId.trim().length > 0)}
              onChange={option => handleStepChange(option)}
              isClearable={false}
              selectedOption={(selectedWorkflow?.steps || []).map((step, index) => ({
                value: step.category._id,
                label: step.category.name
              }))}
              options={(workflowData?.steps || []).map((step, index) => ({
                value: step.category._id,
                label: step.category.name
              }))}
              labelText="Workflow Steps"
              isMulti={true}
            />
          </ItemContainer>

          <ItemContainer margin="0.5rem 0" onClick={handleDisbledInputs}>
            <SelectInput
              selectedOption={[
                {
                  value: firstStepResponsibleUser?._id,
                  label: firstStepResponsibleUser?.firstname + ' ' + firstStepResponsibleUser?.lastname
                }
              ]}
              isDisabled={!(selectedWorkflowPlanId.trim().length > 0)}
              isLoading={isUsersDataLoading}
              name="responsibleUser"
              onChange={option => handleResponsibleChange(option.value)}
              options={(usersData || []).map(user => ({
                value: user._id,
                label: user.firstname + ' ' + user.lastname
              }))}
              labelText="First Step Responsible User"
              validationError={creationErrors.responsibleUserError}
            />
          </ItemContainer>

          <ItemContainer margin="0.5rem 0" onClick={handleDisbledInputs}>
            <DatePicker
              disabled={!(selectedWorkflowPlanId.trim().length > 0)}
              name="startDate"
              labelText="Start Date"
              onChange={handleStartDateChange}
              minDate={moment.now().valueOf()}
              enableTime={true}
              dateFormat="m-d-Y H:i"
              placeholder="Select start date..."
              value={startDate}
              validationError={creationErrors.startDateError}
            />
          </ItemContainer>

          <ItemContainer>
            <Button onClick={handleSubmit} color={colors.blue.primary}>
              Submit
            </Button>
          </ItemContainer>
        </JustifyBetweenColumn>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}
export default SelectTaskWorkflowModal
