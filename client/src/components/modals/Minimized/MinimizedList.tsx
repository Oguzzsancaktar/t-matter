import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { IModal } from '@/models'
import { closeModal, openModal } from '@/store'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'

interface IProps {
  modal: IModal
}

const Bar = styled(JustifyBetweenRow)`
  border-radius: 0.3rem;
  padding: 0.4rem;
  background-color: ${colors.primary.light};
  margin-right: 0.5rem;
`
const MinimizedModal: React.FC<IProps> = ({ modal }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleOpen = (modal: IModal) => {
    dispatch(
      openModal({
        ...modal
      })
    )
  }

  const handleClose = (modal: IModal) => {
    dispatch(closeModal(modal.id))
  }
  return (
    <Bar width="auto">
      <Row margin="0 0.4rem 0 0">
        <ItemContainer onClick={() => handleOpen(modal)}>
          <H1 color={colors.white.primary} cursor="pointer">
            {modal.title}
          </H1>
        </ItemContainer>
      </Row>
      <Row width="auto">
        <X cursor={'pointer'} size={20} color={colors.white.light} onClick={() => handleClose(modal)} />
      </Row>
    </Bar>
  )
}

export default MinimizedModal
