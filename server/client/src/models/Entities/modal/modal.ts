import { ESize } from '@models/Enumarables'
export default interface IModal {
  id: string
  title: string | React.ReactNode
  body: React.ReactNode | string
  size: ESize
}
