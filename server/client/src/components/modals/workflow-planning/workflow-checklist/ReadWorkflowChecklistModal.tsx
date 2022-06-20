import React from 'react'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, InnerWrapper } from '@/components'
import { ModalBody, ModalHeader } from '../../types'
import { EStatus, ITaskChecklist } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'

interface IProps {
  checklist: ITaskChecklist
}

const ReadWorkflowChecklistModal: React.FC<IProps> = ({ checklist }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Read Workflow Checklist
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0">
              <H1>Checklist Name: </H1>
              <H1 width="fit-content">{checklist.name}</H1>
            </Row>
            <Row>
              <H1>Checklist Status: </H1>
              <Badge color={selectColorForStatus(+checklist.status)}>{EStatus[checklist.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadWorkflowChecklistModal
