import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, Row } from '@/components/layout'
import FullCalendar, { EventSourceInput } from '@fullcalendar/react'
import colors from '@/constants/colors'
import { MultiSelectOthers, SelectInput } from '@/components/input'
import { emptyQueryParams, emptyTaskFilter } from '@/constants/queryParams'
import { ESize, ETaskStatus, IOption, ITaskCategory, IUser } from '@/models'
import { useGetCategoriesQuery } from '@/services/settings/workflow-planning/workflowService'
import { useGetAllTaskListMutation } from '@/services/customers/taskService'
import DefaultCalendarOptions from '@/constants/calendarOptions'
import { Button, CustomerTaskModal, H1, UserImage } from '@/components'
import { openModal } from '@/store'
import useAccessStore from '@/hooks/useAccessStore'
import { ModalBody } from '../types'
import { taskStatusOptions } from '@/constants/statuses'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import moment from 'moment'
import { selectColorForTaskStatus } from '@/utils/statusColorUtil'

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

const StyledReactTooltip = styled(ReactTooltip)`
  border-radius: 0.3rem !important;
  padding: 0.3rem 0.5rem !important;
  background-color: ${colors.primary.dark} !important;
  border: 2px solid ${colors.white.secondary} !important;
  border-bottom: 4px solid ${colors.orange.primary}!important;
  opacity: 1 !important;
  overflow: hidden;
  width: 300px;
  z-index: 99999999999999999;
  &:after {
    border-top-color: ${colors.gray.dark} !important;
  }
`
const CalendarModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery(emptyQueryParams)
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(emptyQueryParams)

  const defaultOptions = DefaultCalendarOptions()

  const [calendarFilters, calendarFiltersDispatch] = useReducer(calendarFiltersReducer, {
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
              start: step?.postponedDate?.toString().trim().length > 0 ? step?.postponedDate : step.startDate,
              end: step?.postponedDate?.toString().trim().length > 0 ? step?.postponedDate : step.startDate,
              color: step.category.color.color,
              title: task.name,
              extendedProps: { task, step }
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

  console.log('calendarFilters', calendarFilters)

  return (
    <ItemContainer borderRadius="0.3rem" overflow="hidden" height="100%">
      <ModalBody height="100% ">
        <Row height="100%">
          <ItemContainer height="100%" overflow="hidden" width={isFiltersOpen ? '250px' : '0'} margin="0 1rem 0 0">
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
                      <EventInner width="100%" color={props.backgroundColor}>
                        <JustifyBetweenRow width="100%">
                          <H1 fontSize="0.7rem" color={colors.white.secondary}>
                            {step.category.name}
                          </H1>
                        </JustifyBetweenRow>
                      </EventInner>

                      <StyledReactTooltip id={'taskProgressTooltip-' + props.event.id} effect="solid">
                        <JustifyCenterColumn>
                          <Row>
                            <ItemContainer margin="0.3rem" width="40px" transition="0s">
                              <UserImage
                                src={step.responsibleUser?.profile_img}
                                padding="0"
                                width="40px"
                                height="40px"
                              />
                            </ItemContainer>
                            <H1
                              textAlign="center"
                              margin="0.3rem 0"
                              color={colors.secondary.middle}
                              width="calc(100% - 40px - 0.5rem)"
                            >
                              {task.customer?.firstname + ' ' + task.customer?.lastname}
                            </H1>
                          </Row>

                          <H1 textAlign="center" margin="0.5rem 0" color={colors.white.secondary} width="max-content">
                            {moment(task.startDate).format('hh:mm A')}
                          </H1>
                          <H1
                            margin="0.5rem "
                            textAlign="center"
                            color={selectColorForTaskStatus(task.status)}
                            width="max-content"
                          >
                            {ETaskStatus[task.status].replace('_', ' ')}
                          </H1>

                          <H1 textAlign="center" margin="0.5rem 0" color={colors.white.secondary} width="max-content">
                            {task.name}
                          </H1>
                        </JustifyCenterColumn>
                      </StyledReactTooltip>
                    </ItemContainer>
                  )
                }}
                eventDidMount={info => {
                  info.el.setAttribute('data-tip', '')
                  info.el.setAttribute('data-for', 'taskProgressTooltip-' + info.event.id)

                  ReactTooltip.rebuild()
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

export default CalendarModal
