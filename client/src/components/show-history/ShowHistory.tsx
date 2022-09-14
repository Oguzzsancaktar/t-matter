import React from 'react'
import { H1, ItemContainer, Row } from '@/components'
import { CornerUpLeft } from 'react-feather'

interface IProps {
  onClick: () => void
}

const ShowHistory: React.FC<IProps> = ({ onClick }) => {
  return (
    <ItemContainer cursorType="pointer" width="fit-content" position="absolute" right="12px" onClick={onClick}>
      <H1 cursor="pointer" fontSize="11px">
        <CornerUpLeft size={11} /> Show History
      </H1>
    </ItemContainer>
  )
}

export default ShowHistory
