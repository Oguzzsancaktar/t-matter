import { Button, JustifyBetweenColumn } from '@components/index'
import colors from '@constants/colors'
import useAccessStore from '@hooks/useAccessStore'
import { IModal } from '@models/index'
import { showModal } from '@store/index'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  children?: React.ReactNode
  modal: IModal
}
const Card = styled.div`
  background-color: ${colors.gray.dark};
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
`

const SettingsCard: React.FC<IProps> = ({ children, modal, ...rest }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(
      showModal({
        title: modal.title,
        body: modal.body,
        size: modal.size
      })
    )
  }

  return (
    <Card>
      <JustifyBetweenColumn height="100%">
        <CardTitle>{modal.title}</CardTitle>
        <Button onClick={handleClick}>SHOW</Button>
      </JustifyBetweenColumn>
    </Card>
  )
}

export default SettingsCard
