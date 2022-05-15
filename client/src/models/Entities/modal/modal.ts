import { ESize } from '@/models/Enumarables'
export default interface IModal {
  title: string | React.ReactNode
  body: React.ReactNode | string
  size: ESize
}
