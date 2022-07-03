import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { Badge, CircleColor, ColorSelect, InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../../types'
import { EStatus, IRefferedBy } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'

interface IProps {
  refferedBy: IRefferedBy
}

const ReadRefferedByModal: React.FC<IProps> = ({ refferedBy }) => {
  const { useAppDispatch } = useAccessStore()

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Read Company RefferedBy
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0">
              <H1>RefferedBy Name: </H1>
              <H1 width="auto">{refferedBy.name}</H1>
            </Row>
            <Row>
              <H1>RefferedBy Color: </H1>
              <CircleColor cursor="normal" color={refferedBy.color} />
            </Row>
            <Row>
              <H1>RefferedBy Status: </H1>
              <Badge color={selectColorForStatus(+refferedBy.status)}>{EStatus[refferedBy.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadRefferedByModal
