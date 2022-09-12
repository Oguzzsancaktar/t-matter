import React, { useEffect, useReducer, useRef, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { ModalHeader, ModalBody } from '../types'
import FullCalendar from '@fullcalendar/react'

import colors from '@/constants/colors'
import { SelectInput } from '@/components/input'
import { emptyQueryParams, emptyTaskFilter } from '@/constants/queryParams'
import { IOption, ITaskCategory } from '@/models'
import { useGetCategoriesQuery } from '@/services/settings/workflow-planning/workflowService'
import { useGetAllTaskListQuery } from '@/services/customers/taskService'
import DefaultCalendarOptions from '@/constants/calendarOptions'

function calendarFiltersReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      console.log(action.payload)
      return { ...state, category: action.payload }
  }
}

const CalendarModal = () => {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(emptyQueryParams)

  const calendarRef = useRef(null)
  const defaultOptions = DefaultCalendarOptions()

  const [calendarFilters, calendarFiltersDispatch] = useReducer(calendarFiltersReducer, {
    emptyTaskFilter
  })

  const { data: taskData, isLoading: taskDataIsLoading } = useGetAllTaskListQuery(calendarFilters)

  const [calendarEvents, setCalendarEvents] = useState<any>(null)

  const calendarOptions = { ...defaultOptions }
  calendarOptions.ref = calendarRef

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
    // onDataChange(dataInstance)
  }

  useEffect(() => {
    let allTaskSteps: any[] = []
    if (taskData) {
      taskData.forEach(task => {
        task.steps.forEach(step => {
          console.log(calendarFilters.category?._id)
          if (calendarFilters.category?._id === undefined || calendarFilters.category?._id === step.category._id) {
            console.log(step)
            allTaskSteps.push({
              // allDay: false,
              backgroundColor: step.category.color.color,
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
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Calendar
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody height="calc(100% - 63px)">
        <Row>
          <ItemContainer width="250px" margin="0 1rem 0 0">
            <Column>
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
            </Column>
          </ItemContainer>
          <ItemContainer width="calc(100% - 250px)">
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
