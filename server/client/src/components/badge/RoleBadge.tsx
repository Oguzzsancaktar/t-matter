import colors from '@/constants/colors'
import React from 'react'
import { CircleIconButton } from '../button'
import { Column, Row } from '../layout'
import { H1 } from '../texts'

interface IProps {
  roleIcon: React.ReactNode
  roleName: string
  roleColor: string
}
const RoleBadge: React.FC<IProps> = ({ roleColor, roleIcon, roleName }) => {
  console.log(roleName)
  return (
    <Row>
      <Column width="35px" margin="0 0.5rem 0 0">
        <CircleIconButton color={roleColor} width="35px" height="35px">
          {roleIcon}
        </CircleIconButton>
      </Column>

      <Column width="calc(100% - 0.5rem - 35px)">
        <H1 color={colors.black.primary}>{roleName}</H1>
      </Column>
    </Row>
  )
}

export default RoleBadge
