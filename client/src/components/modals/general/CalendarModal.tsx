import React, { useEffect, useReducer, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, Row } from '@/components/layout'
import FullCalendar, { EventSourceInput } from '@fullcalendar/react'
import colors from '@/constants/colors'
import { SelectDopdown, SelectInput } from '@/components/input'
import { emptyQueryParams, emptyTaskFilter } from '@/constants/queryParams'
import { ESize, ETaskStatus, IOption, ITaskCategory, IUser } from '@/models'
import { useGetCategoriesQuery } from '@/services/settings/workflow-planning/workflowService'
import { useGetAllTaskListQuery } from '@/services/customers/taskService'
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
      return { ...state, category: action.payload }
    case 'CHANGE_USER':
      return { ...state, user: action.payload }
    case 'CHANGE_STATUS':
      return { ...state, status: action.payload }
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

  const { data: taskData, isLoading: taskDataIsLoading } = useGetAllTaskListQuery(calendarFilters)

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
  const [calendarEvents, setCalendarEvents] = useState<any>(null)

  const [isSlotFull, setIsSlotFull] = useState<boolean>(false)

  const calendarOptions = { ...defaultOptions }

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

  const handleCategoryChange = (option: IOption) => {
    if (option) {
      const selectedCategory = {
        _id: option.value,
        name: option.label,
        color: option.color
      }
      calendarFiltersDispatch({ type: 'CHANGE_CATEGORY', payload: selectedCategory })
    } else {
      calendarFiltersDispatch({ type: 'CHANGE_CATEGORY', payload: undefined })
    }
  }

  const handleUserChange = (option: IOption) => {
    if (option) {
      const selectedUser = {
        _id: option.value,
        name: option.label
      }
      calendarFiltersDispatch({ type: 'CHANGE_USER', payload: selectedUser })
    } else {
      calendarFiltersDispatch({ type: 'CHANGE_USER', payload: undefined })
    }
  }

  const handleStatusChange = (option: IOption) => {
    if (option) {
      const selectedStatus = {
        value: option.value,
        label: option.label
      }
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
    <SelectDopdown
      options={(categoriesData || []).map((category: ITaskCategory) => ({
        label: category.name,
        value: category._id,
        color: category.color
      }))}
    />
  )

  //  <SelectInput
  //   isMulti={true}
  //   isClearable={true}
  //   name={'stepCategory'}
  //   placeHolder="Workflow Category"
  //   // selectedOption={[
  //   //   {
  //   //     value: calendarFilters.category?._id,
  //   //     label: calendarFilters.category?.name,
  //   //     color: calendarFilters.category?.color
  //   //   }
  //   // ]}
  //   options={(categoriesData || []).map((category: ITaskCategory) => ({
  //     label: category.name,
  //     value: category._id,
  //     color: category.color
  //   }))}
  //   onChange={handleCategoryChange}
  //   isLoading={isCategoriesLoading}
  // />

  calendarOptions.customButtons.userFilter.text = (
    <SelectInput
      isClearable={true}
      name={'responsibleUser'}
      placeHolder="Responsible User"
      selectedOption={[
        {
          value: calendarFilters.user?._id,
          label: calendarFilters.user?.firstname + ' ' + calendarFilters.user?.lastname
        }
      ]}
      options={(usersData || []).map((user: IUser) => ({
        label: user.firstname + ' ' + user.lastname,
        value: user._id
      }))}
      onChange={handleUserChange}
      isLoading={isUsersDataLoading}
    />
  )

  calendarOptions.customButtons.statusFilter.text = (
    <SelectInput
      isClearable={true}
      name={'stepStatus'}
      placeHolder="Step Status"
      selectedOption={[
        {
          value: calendarFilters.status?.value,
          label: calendarFilters.status?.label
        }
      ]}
      options={taskStatusOptions.map((status: IOption) => ({
        label: status.label,
        value: status.value
      }))}
      onChange={handleStatusChange}
      isLoading={isCategoriesLoading}
    />
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
