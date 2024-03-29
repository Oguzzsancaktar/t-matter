import { ESize } from '@models/Enumarables'

export default interface IModal {
  id: string
  title: string | React.ReactNode
  body: React.ReactNode | string
  maxWidth?: string
  width: string
  height: string
  backgroundColor?: string
  onClose?: () => void
}
