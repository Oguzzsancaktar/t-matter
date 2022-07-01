import { ETimes } from '@/models'

const initialWorkingSchedule = {
  Monday: {
    isChecked: true,
    startTime: ETimes.startTime,
    endTime: ETimes.endTime,
    offTrackingTime: '00:00'
  },
  Tuesday: {
    isChecked: true,
    startTime: ETimes.startTime,
    endTime: ETimes.endTime,
    offTrackingTime: '00:00'
  },
  Wednesday: {
    isChecked: true,
    startTime: ETimes.startTime,
    endTime: ETimes.endTime,
    offTrackingTime: '00:00'
  },
  Thursday: {
    isChecked: true,
    startTime: ETimes.startTime,
    endTime: ETimes.endTime,
    offTrackingTime: '00:00'
  },
  Friday: {
    isChecked: true,
    startTime: ETimes.startTime,
    endTime: ETimes.endTime,
    offTrackingTime: '00:00'
  },
  Saturday: {
    isChecked: false,
    startTime: ETimes.startTime,
    endTime: ETimes.endTime,
    offTrackingTime: '00:00'
  },
  Sunday: {
    isChecked: false,
    startTime: ETimes.startTime,
    endTime: ETimes.endTime,
    offTrackingTime: '00:00'
  }
}

export default initialWorkingSchedule
