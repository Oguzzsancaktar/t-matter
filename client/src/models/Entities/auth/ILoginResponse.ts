import { IUser } from '@/models'

export default interface ILoginResponse {
  userId: string
  accessToken: string
  refreshToken: string
  user: IUser
}
