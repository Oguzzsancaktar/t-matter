import { IComponentProps } from '@models/index'
import React from 'react'
export interface IProps extends IComponentProps {
  content?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}
