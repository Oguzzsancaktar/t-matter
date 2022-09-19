import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Menu } from 'react-feather'
import { useRef } from 'react'
import { usePostponeTaskMutation } from '@/services/customers/taskService'
import { EActivity } from '@/models'
import { activityApi, useCreateActivityMutation } from '@/services/activityService'
import Swal from 'sweetalert2'
import useAccessStore from '@/hooks/useAccessStore'
import { useAuth } from '@/hooks/useAuth'
import moment from 'moment'

const DefaultCalendarOptions = () => {
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
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    slotMinTime: '08:00:00',
    slotMaxTime: '18:00:00',
    slotDuration: { hours: 1 },
    allDaySlot: false,
    contentHeight: '100%',
    height: '100%',
    droppable: true,
    nextDayThreshold: '09:00:00',
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
      }
    },

    dateClick(info) {
      console.log('ingo', info)
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
              postponedDate: moment(date).subtract(1, 'd').valueOf(),
              step: task?.index || 0
            })
            await createActivity({
              title: 'Task Postponed',
              content: result.value || ' ',
              customer: task.customer._id,
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

    eventRender: function (event, element) {
      element.bind('dblclick', function () {
        alert('double click!')
      })
    },

    eventResize({ event: resizedEvent }) {
      console.log('resizedEvent', resizedEvent)
    },

    ref: calendarRef
  }
}

export default DefaultCalendarOptions
