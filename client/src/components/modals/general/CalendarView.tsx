import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, Row } from '@/components/layout'
import FullCalendar, { EventSourceInput } from '@fullcalendar/react'
import colors from '@/constants/colors'
import { MultiSelectOthers } from '@/components/input'
import { emptyQueryParams, emptyTaskFilter } from '@/constants/queryParams'
import { EActivity, ESize, ICustomer, ICustomerTask, IOption, ITaskCategory, IUser } from '@/models'
import { useGetCategoriesQuery } from '@/services/settings/workflow-planning/workflowService'
import { useGetAllTaskListMutation, usePostponeTaskStepMutation } from '@/services/customers/taskService'
import DefaultCalendarOptions from '@/constants/calendarOptions'
import { CustomerTaskModal, H1, SelectTaskWorkflowModal, SpeechModal } from '@/components'
import Button from '@/components/button/Button'
import { closeModal, openModal } from '@/store'
import useAccessStore from '@/hooks/useAccessStore'
import { ModalBody } from '../types'
import { taskStatusOptions } from '@/constants/statuses'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'
import styled from 'styled-components'
import moment from 'moment'
import { toastWarning } from '@/utils/toastUtil'
import { activityApi, useCreateActivityMutation } from '@/services/activityService'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import { dateToEpoch } from '@/utils/timeUtils'
import { Tooltip } from '@nextui-org/react'
import { TaskStepTooltip } from '@/shared'

const EventInner = styled(Button)`
  display: flex;
  align-items: center;
  height: ${({ height }) => height};
`
function calendarFiltersReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return { ...state, categoryArr: action.payload }
    case 'CHANGE_USER':
      return { ...state, userArr: action.payload }
    case 'CHANGE_STATUS':
      return { ...state, statusArr: action.payload }
  }
}

interface IProps {
  customer?: ICustomer
}

const CalendarView: React.FC<IProps> = ({ customer }) => {
  const { loggedUser } = useAuth()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [postponeTaskStep] = usePostponeTaskStepMutation()
  const [createActivity] = useCreateActivityMutation()

  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery(emptyQueryParams)
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(emptyQueryParams)

  const defaultOptions = DefaultCalendarOptions()

  defaultOptions.dateClick = info => {
    if (moment(info.dateStr).valueOf() < Date.now()) {
      return toastWarning('You can not create a task for the past')
    }

    dispatch(
      openModal({
        id: 'selectTaskWorkflowModalForCalendar',
        title: 'Customer Task',
        body: (
          <SelectTaskWorkflowModal
            cb={() => postGetAllTaskList(calendarFilters)}
            date={moment(info.dateStr).valueOf()}
            customer={customer}
          />
        ),
        width: ESize.WSmall,
        height: ESize.HMedium,
        maxWidth: ESize.WSmall,
        backgroundColor: colors.gray.light
      })
    )
  }

  const handleConfirmPostponeChange = async (
    timerVal,
    noteContent,
    date: number,
    task: ICustomerTask,
    stepIndex: number
  ) => {
    dispatch(closeModal(`SpeechModal-postpone-${task?._id}`))

    await postponeTaskStep({
      taskId: task._id,
      stepIndex,
      postponedDate: date
    })

    console.log(task)

    await createActivity({
      title: 'Task Postponed',
      content: noteContent,
      usedTime: timerVal,
      stepCategory: task.steps[stepIndex].category._id,
      customer: task.customer._id,
      task: task._id,
      owner: loggedUser.user?._id || '',
      step: stepIndex,
      type: EActivity.TASK_POSTPONED
    })

    await postGetAllTaskList(calendarFilters)
    dispatch(activityApi.util.resetApiState())
  }

  defaultOptions.eventDrop = async ({ event: droppedEvent }) => {
    const task = droppedEvent._def.extendedProps.task
    const stepIndex = droppedEvent._def.extendedProps.stepIndex
    const date = dateToEpoch(droppedEvent.startStr)

    try {
      Swal.fire({
        title: 'Are you sure to postpone task ?',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Postponed',
        showLoaderOnConfirm: true,
        preConfirm: login => {
          return login
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(async result => {
        if (result.isConfirmed) {
          if ((task?.steps[stepIndex].usedPostpone || 0) >= (task?.steps[stepIndex].postponeLimit || 0)) {
            dispatch(
              openModal({
                id: `SpeechModal-postpone-${task?._id}`,
                title: 'Postpone Note',
                body: (
                  <SpeechModal
                    id={`SpeechModal-postpone-${task?._id}`}
                    headerText={`Responsible Note ( ${task.customer.firstname + ' ' + task.customer.lastname} / ${
                      task?.name
                    } )`}
                    cb={(timerVal, noteContent) =>
                      handleConfirmPostponeChange(timerVal, noteContent, date, task, stepIndex)
                    }
                    cbCancel={async () => await postGetAllTaskList(calendarFilters)}
                  />
                ),
                height: ESize.HSmall,
                width: ESize.WSmall,
                maxWidth: ESize.WSmall
              })
            )
          } else {
            await postponeTaskStep({
              taskId: task._id,
              stepIndex,
              postponedDate: date
            })
            await postGetAllTaskList(calendarFilters)
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cancelled'
          })
          await postGetAllTaskList(calendarFilters)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [calendarFilters, calendarFiltersDispatch] = useReducer(calendarFiltersReducer, {
    customerId: customer?._id,
    ...emptyTaskFilter
  })

  const [postGetAllTaskList, { data: taskData, isLoading: taskDataIsLoading }] =
    useGetAllTaskListMutation(calendarFilters)

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
  const [calendarEvents, setCalendarEvents] = useState<any>(null)

  const [isSlotFull, setIsSlotFull] = useState<boolean>(false)

  const calendarOptions = { ...defaultOptions }

  const categoryOptions: IOption[] = useMemo(() => {
    if (categoriesData) {
      return categoriesData?.map((category: ITaskCategory) => ({
        value: category._id,
        label: category.name,
        color: category.color
      }))
    } else {
      return []
    }
  }, [categoriesData])

  const userOptions: IOption[] = useMemo(() => {
    if (usersData) {
      return usersData?.map((user: IUser) => ({
        value: user._id,
        label: user.firstname + ' ' + user.lastname
      }))
    } else {
      return []
    }
  }, [usersData])

  const taskStatusOptionsFiltered = useMemo(() => {
    return taskStatusOptions.filter(option => option.value !== '-9')
  }, [taskStatusOptions])

  const statusOptions: IOption[] = useMemo(() => {
    return taskStatusOptionsFiltered.map(status => ({
      value: status.value,
      label: status.label
    }))
  }, [])

  const handleOpenTaskModal = ({ event }) => {
    const taskId = event.id
    const task = event._def.extendedProps.task

    if (taskId) {
      dispatch(
        openModal({
          id: 'customerTaksModal' + taskId,
          title: 'Customer Task',
          body: <CustomerTaskModal customer={task?.customer} taskId={taskId} />,
          width: ESize.WXLarge,
          height: ESize.HLarge,
          maxWidth: ESize.WXLarge,
          backgroundColor: colors.gray.light
        })
      )
    }
  }

  const handleCategoryChange = (selectedCategory: IOption[]) => {
    if (selectedCategory) {
      calendarFiltersDispatch({ type: 'CHANGE_CATEGORY', payload: selectedCategory })
    } else {
      calendarFiltersDispatch({ type: 'CHANGE_CATEGORY', payload: undefined })
    }
  }

  const handleUserChange = (selectedUser: IOption[]) => {
    if (selectedUser) {
      calendarFiltersDispatch({ type: 'CHANGE_USER', payload: selectedUser })
    } else {
      calendarFiltersDispatch({ type: 'CHANGE_USER', payload: undefined })
    }
  }

  const handleStatusChange = (selectedStatus: IOption[]) => {
    if (selectedStatus) {
      calendarFiltersDispatch({ type: 'CHANGE_STATUS', payload: selectedStatus })
    } else {
      calendarFiltersDispatch({ type: 'CHANGE_STATUS', payload: undefined })
    }
  }

  calendarOptions.eventClick = handleOpenTaskModal
  calendarOptions.customButtons.showFullDay.text = isSlotFull ? 'All Hours' : 'Working Hours'
  calendarOptions.slotMinTime = isSlotFull ? '00:00:00' : '08:00:00'
  calendarOptions.slotMaxTime = isSlotFull ? '24:00:00' : '18:00:00'

  calendarOptions.customButtons.showFullDay.click = () => {
    setIsSlotFull(!isSlotFull)
  }

  calendarOptions.customButtons.sidebarToggle.click = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 400)
    setIsFiltersOpen(!isFiltersOpen)
  }

  calendarOptions.customButtons.categoryFilter.text = (
    <ItemContainer width="230px">
      <MultiSelectOthers optionList={categoryOptions} handleChange={handleCategoryChange} placeholder="Category" />
    </ItemContainer>
  )

  calendarOptions.customButtons.userFilter.text = (
    <ItemContainer width="230px">
      <MultiSelectOthers optionList={userOptions} handleChange={handleUserChange} placeholder="User" />
    </ItemContainer>
  )

  calendarOptions.customButtons.statusFilter.text = (
    <ItemContainer width="230px">
      <MultiSelectOthers optionList={statusOptions} handleChange={handleStatusChange} placeholder="Status" />
    </ItemContainer>
  )

  useEffect(() => {
    let allTaskSteps: any[] = []
    if (taskData) {
      taskData.forEach((task, i) => {
        task.steps.forEach((step, index) => {
          if (calendarFilters.category?._id === undefined || calendarFilters.category?._id === step.category._id) {
            let eventDate = step?.postponedDate?.toString().trim().length > 0 ? step?.postponedDate : step.startDate

            let event: EventSourceInput | any = {
              id: task._id,
              // allDay: false,
              backgroundColor: step.category.color.color,
              start: step?.postponedDate > 0 ? step?.postponedDate : step.startDate,
              end: step?.postponedDate > 0 ? step?.postponedDate : step.startDate,
              color: step.category.color.color,
              title: task.name,
              extendedProps: { task, step, stepIndex: index }
            }
            allTaskSteps.push(event)
          }
        })
      })
    }
    setCalendarEvents(allTaskSteps)
  }, [taskData, taskDataIsLoading])

  useEffect(() => {
    postGetAllTaskList(calendarFilters)
  }, [calendarFilters])

  return (
    <ItemContainer borderRadius="0.3rem" overflow="hidden" height="100%">
      <ModalBody height="100% ">
        <Row height="100%">
          <ItemContainer
            height="100%"
            overflow="hidden"
            width={isFiltersOpen ? '250px' : '0'}
            margin={isFiltersOpen ? '0 1rem 0 0' : '0'}
          >
            <JustifyBetweenColumn height="100%">
              <ItemContainer>area 1</ItemContainer>

              <ItemContainer>area 2</ItemContainer>

              <ItemContainer>area 3</ItemContainer>
            </JustifyBetweenColumn>
          </ItemContainer>
          <ItemContainer height="100%" width={isFiltersOpen ? 'calc(100% - 250px)' : '100%'}>
            {calendarEvents && !taskDataIsLoading ? (
              // @ts-ignore
              <FullCalendar
                {...calendarOptions}
                eventContent={props => {
                  const task = props.event._def.extendedProps.task
                  const step = props.event._def.extendedProps.step

                  return (
                    <ItemContainer width="100%">
                      <Tooltip
                        placement="top"
                        content={<TaskStepTooltip task={task} step={step} />}
                        style={{ width: '100%' }}
                      >
                        <EventInner width="100%" color={props.backgroundColor}>
                          <JustifyBetweenRow width="100%">
                            <H1 fontSize="0.7rem" color={colors.white.secondary}>
                              {step.category.name}
                            </H1>
                          </JustifyBetweenRow>
                        </EventInner>
                      </Tooltip>
                    </ItemContainer>
                  )
                }}
                events={calendarEvents}
              />
            ) : (
              // @ts-ignore
              <FullCalendar height="100%" {...calendarOptions} events={[{}]} />
            )}
          </ItemContainer>
        </Row>
      </ModalBody>
    </ItemContainer>
  )
}

export default CalendarView
