import React from 'react'
export interface IProps {
  content?: string
  width?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}
