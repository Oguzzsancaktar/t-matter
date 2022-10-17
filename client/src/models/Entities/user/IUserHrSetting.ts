import { IUser } from '@/models'

interface IUserHrSetting {
  owner: IUser['_id']
  monthlyWorking: {
    isChecked: boolean
    days: number
    taskType: string
    notificationReceivers: IUser['_id'][]
  }
  loginLogout: {
    isChecked: boolean
    taskType: string
    notificationReceivers: IUser['_id'][]
  }
  vocations: {
    isChecked: boolean
    taskType: string
    notificationReceivers: IUser['_id'][]
    afterHours: number
    days: number
  }
  specialDays: {
    isChecked: boolean
    taskType: string
    notificationReceivers: IUser['_id'][]
    name: string
    startDate: string
    endDate: string
  }
}

export default IUserHrSetting
