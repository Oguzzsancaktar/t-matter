import { IUser } from '@/models'

const getFullName = (user: IUser) => {
  return `${user.firstname} ${user.lastname}`
}

export { getFullName }
