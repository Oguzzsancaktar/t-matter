import React from 'react'
import { IUser } from '@/models'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { useGetHrTasksQuery } from '@services/hrTaskService'
import { HR_TASK_TYPES } from '@constants/hrTask'
import constantToLabel from '@utils/constantToLabel'
import moment from 'moment'

interface IProps {
  userId: IUser['_id']
}

const UserModalCalendar: React.FC<IProps> = ({ userId }) => {
  const { data, isLoading } = useGetHrTasksQuery(
    {
      userId: userId as string
    },
    { skip: userId === undefined }
  )
  const events = (data || []).map(hrTask => {
    return {
      id: hrTask._id,
      title: constantToLabel(hrTask.type),
      date: moment(hrTask.startDate).format('YYYY-MM-DD'),
    }
  })

  console.log('events', events)

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
      />
    </div>
  )
}

export default UserModalCalendar
