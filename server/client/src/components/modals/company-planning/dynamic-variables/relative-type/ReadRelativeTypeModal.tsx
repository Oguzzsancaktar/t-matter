import React from 'react'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, ItemContainer } from '@/components'
import { ModalBody, ModalHeader } from '../../../types'
import { EStatus, IRelativeType } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import colors from '@/constants/colors'

interface IProps {
  relativeType: IRelativeType
}

const ReadRelativeTypeModal: React.FC<IProps> = ({ relativeType }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 color={colors.white.primary} margin="0" textAlign="center">
              {relativeType.relateFrom} - {relativeType.relateTo} Relation Type
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0" height="40px">
              <H1 color={colors.text.primary}> Relate From: </H1>
              <H1 color={colors.text.primary} width="fit-content">
                {relativeType.relateFrom}
              </H1>
            </Row>

            <Row margin="0 0 1rem 0" height="40px">
              <H1 color={colors.text.primary}>Relate To: </H1>
              <H1 color={colors.text.primary} width="fit-content">
                {relativeType.relateTo}
              </H1>
            </Row>
            <Row height="40px">
              <H1 color={colors.text.primary}>Relation Status: </H1>
              <Badge color={selectColorForStatus(+relativeType.status)}>{EStatus[relativeType.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </ItemContainer>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadRelativeTypeModal
