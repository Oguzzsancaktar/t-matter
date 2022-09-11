import React, { useEffect, useReducer, useRef, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { Menu } from 'react-feather'
import { ModalHeader, ModalBody } from '../types'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import colors from '@/constants/colors'
import { SelectInput } from '@/components/input'
import { emptyQueryParams, emptyTaskFilter } from '@/constants/queryParams'
import { IOption, ITaskCategory } from '@/models'
import { useGetCategoriesQuery } from '@/services/settings/workflow-planning/workflowService'
import { useGetAllTaskListQuery } from '@/services/customers/taskService'

function calendarFiltersReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return { ...state, categoryId: action.payload }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'tgColor':
      return { ...state, color: !state.color }
    case 'handleInputChange':
      return { ...state, name: action.payload }
  }
}

const CalendarModal = () => {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(emptyQueryParams)

  const [calendarFilters, calendarFiltersDispatch] = useReducer(calendarFiltersReducer, {
    emptyTaskFilter
  })

  const { data: taskData, isLoading: taskDataIsLoading } = useGetAllTaskListQuery(calendarFilters)

  const [calendarEvents, setCalendarEvents] = useState<any>(undefined)

  const calendarRef = useRef(null)

  const calendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      console.log('calendarEvent', calendarEvent)
      return []
    },

    eventClick({ event: clickedEvent }) {
      console.log('clickedEvent')

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          console.log('first')
        }
      }
    },

    dateClick(info) {
      console.log('ingo', info)
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      console.log('droppedEvent', droppedEvent)
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      console.log('resizedEvent', resizedEvent)
    },

    ref: calendarRef
  }

  useEffect(() => {
    let allTaskSteps: any[] = []
    if (taskData) {
      taskData.forEach(task => {
        task.steps.forEach(step => {
          allTaskSteps.push({
            allDay: false,
            backgroundColor: step.category.color.color,
            date: step.startDate
          })
        })
      })
    }
    setCalendarEvents(allTaskSteps)
  }, [taskData])

  const handleCategoryChange = (option: IOption) => {
    const selectedCategory = {
      _id: option.value,
      name: option.label
    }
    // onDataChange(dataInstance)

    calendarFiltersDispatch({ type: 'CHANGE_CATEGORY', payload: selectedCategory })
  }

  console.log(taskData)
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
          <ItemContainer width="250px">
            <Column>
              <ItemContainer>
                <SelectInput
                  name={'stepCategory'}
                  labelText="Workflow Category"
                  selectedOption={[
                    {
                      value: calendarFilters.category?._id,
                      label: calendarFilters.category?.name
                    }
                  ]}
                  options={(categoriesData || []).map((category: ITaskCategory) => ({
                    label: category.name,
                    value: category._id
                  }))}
                  onChange={handleCategoryChange}
                  isLoading={isCategoriesLoading}
                />
              </ItemContainer>
            </Column>
          </ItemContainer>
          <ItemContainer width="calc(100% - 250px)">
            {/* @ts-ignore */}
            <FullCalendar {...calendarOptions} events={calendarEvents} loading={taskDataIsLoading} />{' '}
          </ItemContainer>
        </Row>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default CalendarModal
