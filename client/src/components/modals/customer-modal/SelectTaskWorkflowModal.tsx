import React, { useEffect, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { useGetPlanByIdQuery, useGetPlansQuery } from '@/services/settings/workflow-planning/workflowService'
import { ClockPicker24, InputWithIcon, SelectInput } from '@/components/input'
import { Button } from '@/components/button'
import { SummaryCard } from '@/components/card'
import { Row, Column, JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody, ModalHeader } from '../types'
import useAccessStore from '@/hooks/useAccessStore'
import { ETaskStatus, ICustomer, ICustomerTask, IOption, ITaskCreateDTO, IWorkflowUpdateDTO } from '@/models'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { isValueNull, isValueBiggerThanZero } from '@/utils/validationUtils'
import colors from '@/constants/colors'
import { useCreateTaskMutation } from '@/services/customers/taskService'
import moment from 'moment'
import emptyQueryParams from '@/constants/queryParams'
import { H1 } from '@/components/texts'
import { DatePicker } from '@/components/date-picker'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'

interface IProps {
  customer: ICustomer
}

const SelectTaskWorkflowModal: React.FC<IProps> = ({ customer }) => {
  const { data: workflowPlans, isLoading: workflowPlanIsLoading } = useGetPlansQuery(emptyQueryParams)

  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery(emptyQueryParams)

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

  const handleStartDateChange = (value: Date[], dateText: string) => {
    console.log(value, dateText)
  }

  const handleRemoveStep = (selectedOptions: IOption[]) => {
    const tempUpdateWorkflowData = { ...updateWorkflowData }

    let removedIndex
    for (let k = 0; k < updateWorkflowData.steps.length; k++) {
      const result = selectedOptions.find(option => +option.value === k)
      if (result === undefined) {
        removedIndex = k
      }
    }

    console.log({ ...updateWorkflowData.steps }, removedIndex)
    tempUpdateWorkflowData.steps.splice(removedIndex, 1)

    console.log(tempUpdateWorkflowData)
    if (tempUpdateWorkflowData.steps.length > 0) {
      // setUpdateWorkflowData(tempUpdateWorkflowData)
    } else {
      toastError('Task have to min 1 step')
    }
  }

  const handleSubmit = async () => {
    if (true) {
      try {
        const task: ICustomerTask = {
          customer,
          startDate: Date.now().toString(),
          name: updateWorkflowData.name,
          steps: [],
          totalPrice: workflowData?.totalPrice
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
            <DatePicker
              name="startDate"
              labelText="Start Date"
              onChange={handleStartDateChange}
              enableTime={true}
              dateFormat="Y-m-d H:i"
            />
          </ItemContainer>

          <ItemContainer margin="0.5rem 0">
            <SelectInput
              isLoading={workflowPlanIsLoading}
              name="responsibleUser"
              onChange={option => setSelectedWorkflowPlan(option.value)}
              options={(usersData || []).map(user => ({
                value: user._id,
                label: user.firstname + ' ' + user.lastname
              }))}
              labelText="Responsible User"
            />
          </ItemContainer>

          <ItemContainer margin="0.5rem 0">
            <SelectInput
              isLoading={workflowPlanIsLoading}
              name="Create Task"
              onChange={option => setSelectedWorkflowPlan(option.value)}
              options={(workflowPlans || []).map(wf => ({ value: wf._id, label: wf.name }))}
              labelText="Select Workflow Plan"
            />
          </ItemContainer>

          <ItemContainer margin="0.5rem 0">
            <SelectInput
              isLoading={workflowIsLoading}
              name="workflowSteps"
              isDisabled={!(updateWorkflowData?.steps.length > 0) || workflowIsLoading}
              onChange={option => handleRemoveStep(option)}
              isClearable={false}
              selectedOption={(updateWorkflowData?.steps || []).map((step, index) => ({
                value: index.toString(),
                label: step.category.name
              }))}
              options={(workflowData?.steps || []).map((step, index) => ({
                value: index.toString(),
                label: step.category.name
              }))}
              labelText="Workflow Steps"
              isMulti={true}
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
