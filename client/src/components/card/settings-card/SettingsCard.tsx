import { openModal } from '@/store'
import { Button, H1, ItemContainer, JustifyBetweenColumn, JustifyCenterRow } from '@components/index'
import colors from '@constants/colors'
import useAccessStore from '@hooks/useAccessStore'
import { IModal } from '@models/index'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  children?: React.ReactNode
  modal: IModal
}
const Card = styled.div`
  background-color: ${colors.white.secondary};
  flex: 1;
  min-width: 300px;
  height: 200px;
  min-height: 200px;
  border-radius: 0.3rem;
  padding: 1rem;
`

const CardTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  color: ${colors.gray.light};
`

const SettingsCard: React.FC<IProps> = ({ children, modal, ...rest }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: modal.id,
        title: modal.title,
        body: modal.body,
        height: modal.height,
        width: modal.width
      })
    )
  }

  return (
    <Card>
      <JustifyBetweenColumn height="100%">
        <CardTitle>{modal.title}</CardTitle>
        <Button height="40px" color={colors.primary.light} onClick={handleClick}>
          <JustifyCenterRow>
            <H1 color={colors.white.primary} textAlign="center" cursor="pointer">
              SHOW
            </H1>
          </JustifyCenterRow>
        </Button>
      </JustifyBetweenColumn>
    </Card>
  )
}

export default SettingsCard
