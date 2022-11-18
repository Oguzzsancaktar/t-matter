import React, { useRef } from 'react'
import { IUser } from '@/models'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { useGetHrTasksQuery, useUpdateHrTaskMutation } from '@services/hrTaskService'
import { HR_TASK_TYPES } from '@constants/hrTask'
import constantToLabel from '@utils/constantToLabel'
import moment from 'moment'

interface IProps {
  userId: IUser['_id']
}

const UserModalCalendar: React.FC<IProps> = ({ userId }) => {
  const calendarComponentRef = useRef(null)

  const { data, isLoading } = useGetHrTasksQuery(
    {
      userId: userId as string
    },
    { skip: userId === undefined }
  )
  const [update] = useUpdateHrTaskMutation()

  const events = (data || []).map(hrTask => {
    return {
      id: hrTask._id,
      title: constantToLabel(hrTask.type),
      date: moment(hrTask.startDate).format('YYYY-MM-DD')
    }
  })

  return (
    <div style={{ padding: 20, height: '100%' }}>
      <FullCalendar
        height="100%"
        plugins={[dayGridPlugin, interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'sidebarToggle, prev, title, next',
          center: '',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        }}
        events={events}
        eventClick={i => {}}
        rerenderDelay={10}
        eventDurationEditable={false}
        editable={true}
        droppable={true}
        ref={calendarComponentRef}
        eventDrop={info => {
          if (info.event.start) {
            update({
              _id: info.oldEvent.id,
              startDate: info.event.start,
              endDate: moment(info.event.start).endOf('day').toDate()
            })
          }
        }}
      />
    </div>
  )
}

export default UserModalCalendar
