import React from 'react'
import { H1, ItemContainer, Row } from '@/components'
import { CornerUpLeft } from 'react-feather'

interface IProps {
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void
}

const ShowHistory: React.FC<IProps> = ({ onClick, children }) => {
  return (
    <ItemContainer cursorType="pointer" width="fit-content" position="absolute" right="12px" onClick={onClick}>
      <H1 cursor="pointer" fontSize="11px">
        <CornerUpLeft size={11} /> {children}
      </H1>
    </ItemContainer>
  )
}

export default ShowHistory
