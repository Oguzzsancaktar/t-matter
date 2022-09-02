import { IComponentProps } from '@models/index'
import React from 'react'
export interface IProps extends IComponentProps {
  content?: string
  disabled?: boolean
  color?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}
