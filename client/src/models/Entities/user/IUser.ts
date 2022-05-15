export default interface IUser {
  _id: string
  username: string
  email: string
  password: string
  address?: string
  firstname?: string
  lastname?: string
  phone?: string
  birthday?: string
  birthplace?: string
  description?: string
  profile_img?: string
  cloudinary_id?: string
  userImages?: string[]
  permissionFlags: number
}
