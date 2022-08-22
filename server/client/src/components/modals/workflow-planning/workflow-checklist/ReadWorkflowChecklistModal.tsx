import React from 'react'
import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  Row
} from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, InnerWrapper } from '@/components'
import { ModalBody, ModalHeader } from '../../types'
import { EStatus, ITaskChecklist } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import colors from '@/constants/colors'

interface IProps {
  checklist: ITaskChecklist
}

const ReadWorkflowChecklistModal: React.FC<IProps> = ({ checklist }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              {checklist.name}
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <JustifyCenterColumn height="100%" padding="2rem 0">
          <Row margin="0 0 1rem 0">
            <H1 color={colors.text.primary} width="200px">
              Checklist Name:
            </H1>
            <H1 color={colors.text.primary} width="calc(100% - 200px)" textAlign="right">
              {checklist.name}
            </H1>
          </Row>

          <Row margin="0 0 1rem 0">
            <H1 color={colors.text.primary} width="200px">
              Checklist Duration:
            </H1>
            <H1 color={colors.text.primary} width="calc(100% - 200px)" textAlign="right">
              {checklist.duration}
            </H1>
          </Row>

          <Row margin="0 0 1rem 0">
            <H1 color={colors.text.primary} width="200px">
              Checklist Point:
            </H1>
            <H1 color={colors.text.primary} width="calc(100% - 200px)" textAlign="right">
              {checklist.point}
            </H1>
          </Row>

          <Row margin="0 0 1rem 0">
            <H1 color={colors.text.primary} width="200px">
              Checklist Price:
            </H1>
            <H1 color={colors.text.primary} width="calc(100% - 200px)" textAlign="right">
              {checklist.price.toFixed(2)}
            </H1>
          </Row>
          <JustifyBetweenRow>
            <H1 color={colors.text.primary}>Checklist Status: </H1>

            <Badge color={selectColorForStatus(+checklist.status)}>{EStatus[checklist.status]} </Badge>
          </JustifyBetweenRow>
        </JustifyCenterColumn>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadWorkflowChecklistModal
