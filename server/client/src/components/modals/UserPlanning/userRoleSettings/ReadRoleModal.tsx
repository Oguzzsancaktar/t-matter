import React from 'react'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, InnerWrapper } from '@/components'
import { ModalBody, ModalHeader } from '../../types'
import { EStatus, IRole } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'

interface IProps {
  role: IRole
}

const ReadRoleModal: React.FC<IProps> = ({ role }) => {
  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Read User Role
            </H1>
          </JustifyCenterRow>
        </ModalHeader>

        <ModalBody>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0">
              <H1>Role Name: </H1>
              <H1 width="fit-content">{role.name}</H1>
            </Row>
            <Row>
              <H1>Role Status: </H1>
              <Badge color={selectColorForStatus(+role.status)}>{EStatus[role.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </ModalBody>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default ReadRoleModal
