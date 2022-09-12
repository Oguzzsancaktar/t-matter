import React, { useEffect, useReducer, useRef, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, Row } from '@/components/layout'
import FullCalendar from '@fullcalendar/react'

import colors from '@/constants/colors'
import { SelectInput } from '@/components/input'
import { emptyQueryParams, emptyTaskFilter } from '@/constants/queryParams'
import { ESize, ETaskStatus, IOption, ITaskCategory, IUser } from '@/models'
import { useGetCategoriesQuery } from '@/services/settings/workflow-planning/workflowService'
import { useGetAllTaskListQuery } from '@/services/customers/taskService'
import DefaultCalendarOptions from '@/constants/calendarOptions'
import { CustomerTaskModal } from '@/components'
import { openModal } from '@/store'
import useAccessStore from '@/hooks/useAccessStore'
import { ModalBody } from '../types'
import { taskStatusOptions } from '@/constants/statuses'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'

function calendarFiltersReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return { ...state, category: action.payload }
    case 'CHANGE_USER':
      return { ...state, category: action.payload }
    case 'CHANGE_STATUS':
      console.log(action.payload)
      return { ...state, category: action.payload }
  }
}

const CalendarModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery(emptyQueryParams)
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(emptyQueryParams)

  const defaultOptions = DefaultCalendarOptions()

  const [calendarFilters, calendarFiltersDispatch] = useReducer(calendarFiltersReducer, {
    emptyTaskFilter
  })

  const { data: taskData, isLoading: taskDataIsLoading } = useGetAllTaskListQuery(calendarFilters)

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
  const [calendarEvents, setCalendarEvents] = useState<any>(null)

  const calendarOptions = { ...defaultOptions }

  const handleOpenTaskModal = ({ event }) => {
    const taskId = event.id
    if (taskId) {
      dispatch(
        openModal({
          id: 'customerTaksModal' + taskId,
          title: 'Customer Task',
          body: <CustomerTaskModal taskId={taskId} />,
          width: ESize.WXLarge,
          height: ESize.HLarge,
          backgroundColor: colors.gray.light
        })
      )
    }
  }

  calendarOptions.eventClick = handleOpenTaskModal
  calendarOptions.customButtons.sidebarToggle.click = () => setIsFiltersOpen(!isFiltersOpen)

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

  useEffect(() => {
    let allTaskSteps: any[] = []
    if (taskData) {
      taskData.forEach(task => {
        task.steps.forEach(step => {
          if (calendarFilters.category?._id === undefined || calendarFilters.category?._id === step.category._id) {
            allTaskSteps.push({
              id: task._id,
              // allDay: false,
              backgroundColor: step.category.color.color,
              borderColor: 'transparent',
              date: step.startDate,
              // end: step.endDate,
              title: task.name
            })
          }
        })
      })
    }
    setCalendarEvents(allTaskSteps)
  }, [taskData])

  return (
    <JustifyBetweenColumn height="100%">
      <ModalBody height="100% ">
        <Row height="100%">
          <ItemContainer height="100%" overflow="hidden" width={isFiltersOpen ? '250px' : '0'} margin="0 1rem 0 0">
            <JustifyBetweenColumn height="100%">
              <ItemContainer>
                <SelectInput
                  isClearable={true}
                  name={'stepCategory'}
                  labelText="Workflow Category"
                  selectedOption={[
                    {
                      value: calendarFilters.category?._id,
                      label: calendarFilters.category?.name,
                      color: calendarFilters.category?.color
                    }
                  ]}
                  options={(categoriesData || []).map((category: ITaskCategory) => ({
                    label: category.name,
                    value: category._id,
                    color: category.color
                  }))}
                  onChange={handleCategoryChange}
                  isLoading={isCategoriesLoading}
                />
              </ItemContainer>

              <ItemContainer>
                <SelectInput
                  isClearable={true}
                  name={'responsibleUser'}
                  labelText="Responsible User"
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
              </ItemContainer>

              <ItemContainer>
                <SelectInput
                  isClearable={true}
                  name={'stepCategory'}
                  labelText="Step Status"
                  selectedOption={[
                    {
                      value: calendarFilters.category?._id,
                      label: calendarFilters.category?.name,
                      color: calendarFilters.category?.color
                    }
                  ]}
                  options={taskStatusOptions.map((status: IOption) => ({
                    label: status.label,
                    value: status.value
                  }))}
                  onChange={handleCategoryChange}
                  isLoading={isCategoriesLoading}
                />
              </ItemContainer>
            </JustifyBetweenColumn>
          </ItemContainer>
          <ItemContainer height="100%" width={isFiltersOpen ? 'calc(100% - 250px)' : '100%'}>
            {calendarEvents && !taskDataIsLoading ? (
              // @ts-ignore
              <FullCalendar height="100%" {...calendarOptions} events={calendarEvents} />
            ) : (
              // @ts-ignore
              <FullCalendar height="100%" {...calendarOptions} events={[{}]} />
            )}
          </ItemContainer>
        </Row>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default CalendarModal
