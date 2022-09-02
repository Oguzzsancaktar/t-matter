import React from 'react'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, ItemContainer } from '@/components'
import { ModalBody, ModalHeader } from '../../types'
import { EStatus, IRole } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import colors from '@/constants/colors'

interface IProps {
  role: IRole
}

const ReadRoleModal: React.FC<IProps> = ({ role }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Preview - {role.name}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0">
              <H1 color={colors.text.primary}>Role Name: </H1>
              <H1 color={colors.text.primary} width="auto">
                {role.name}
              </H1>
            </Row>
            <Row>
              <H1 color={colors.text.primary}>Role Status: </H1>
              <Badge color={selectColorForStatus(+role.status)}>{EStatus[role.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </ItemContainer>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadRoleModal
