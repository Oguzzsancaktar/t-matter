import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { Badge, ColorSelect, InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../../types'
import { EStatus, IRelativeType } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'

interface IProps {
  relativeType: IRelativeType
}

const ReadRelativeTypeModal: React.FC<IProps> = ({ relativeType }) => {
  const { useAppDispatch } = useAccessStore()

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create Company Relative Type
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0">
              <H1>Relate From: </H1>
              <H1 width="fit-content">{relativeType.relateFrom}</H1>
            </Row>

            <Row margin="0 0 1rem 0">
              <H1>Relate To: </H1>
              <H1 width="fit-content">{relativeType.relateTo}</H1>
            </Row>
            <Row>
              <H1>Relation Status: </H1>
              <Badge color={selectColorForStatus(+relativeType.status)}>{EStatus[relativeType.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadRelativeTypeModal
