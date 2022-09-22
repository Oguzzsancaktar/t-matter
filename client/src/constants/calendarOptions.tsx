import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Menu, User } from 'react-feather'
import { useRef } from 'react'
import { usePostponeTaskMutation } from '@/services/customers/taskService'
import { EActivity, ESize } from '@/models'
import { activityApi, useCreateActivityMutation } from '@/services/activityService'
import Swal from 'sweetalert2'
import useAccessStore from '@/hooks/useAccessStore'
import { useAuth } from '@/hooks/useAuth'
import moment from 'moment'
import { Button, SelectInput, SelectTaskWorkflowModal } from '@/components'
import { openModal } from '@/store'
import colors from './colors'

const DefaultCalendarOptions = (): any => {
  const { loggedUser } = useAuth()

  const [createActivity] = useCreateActivityMutation()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const calendarRef = useRef(null)

  const [postponeTask] = usePostponeTaskMutation()

  return {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'timeGridDay',
    nowIndicator: true,
    now: Date.now(),
    displayEventTime: false,
    headerToolbar: {
      start: 'sidebarToggle,showFullDay, prev,next, title',
      center: 'categoryFilter,userFilter,statusFilter',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    // businessHours: true, // display business hours
    // slotDuration: { hours: 1 },
    timezone: 'America/New_York',
    slotDuration: '01:00',
    snapDuration: '00:01',
    allDaySlot: false,
    height: '100%',
    droppable: true,
    nextDayThreshold: '09:00:00',
    slotLabelInterval: { hours: 0.25 },
    contentHeight: 1,
    editable: true,
    eventResizableFromStart: false,

    dragScroll: true,

    dayMaxEvents: 2,

    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      // console.log('calendarEvent', calendarEvent)
      return []
    },

    eventClick({ event: clickedEvent }) {
      console.log('clickedEvent', clickedEvent)

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu />,
        click: () => {}
      },
      showFullDay: {
        text: <Button>Show All Hours</Button>,
        click: () => {}
      },
      categoryFilter: {
        text: '',
        click: () => {}
      },
      userFilter: {
        text: '',
        click: () => {}
      },
      statusFilter: {
        text: '',
        click: () => {}
      }
    },

    dateClick(info) {
      dispatch(
        openModal({
          id: 'selectTaskWorkflowModalForCalendar',
          title: 'Customer Task',
          body: <SelectTaskWorkflowModal date={moment(info.date).valueOf()} />,
          width: ESize.WSmall,
          height: ESize.HMedium,
          maxWidth: ESize.WSmall,
          backgroundColor: colors.gray.light
        })
      )
    },

    eventDrop: async ({ event: droppedEvent }) => {
      const task = droppedEvent._def.extendedProps.task
      const date = droppedEvent._instance.range.start

      try {
        Swal.fire({
          title: 'Enter your postpone message',
          input: 'textarea',
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
            Swal.fire({
              icon: 'success',
              title: `Task Postponed`,
              text: result.value
            })

            console.log(droppedEvent)
            await postponeTask({
              _id: task._id,
              postponedDate: moment(date).valueOf(),
              step: task?.index || 0
            })
            await createActivity({
              title: 'Task Postponed',
              content: result.value || ' ',
              customer: task.customer._id,
              stepCategory: task.steps[task?.index || 0].category._id,
              task: task._id,
              owner: loggedUser.user?._id || '',
              step: task?.index || 0,
              type: EActivity.TASK_POSTPONED
            })
            dispatch(activityApi.util.resetApiState())
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Cancelled'
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    eventResize({ event: resizedEvent }) {
      console.log('resizedEvent', resizedEvent)
    },

    ref: calendarRef
  }
}

export default DefaultCalendarOptions
