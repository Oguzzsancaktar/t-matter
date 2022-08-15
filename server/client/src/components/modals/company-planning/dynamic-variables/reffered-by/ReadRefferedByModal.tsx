import React from 'react'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, CircleColor, InnerWrapper, ItemContainer } from '@/components'
import { ModalBody, ModalHeader } from '../../../types'
import { EStatus, IRefferedBy } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import colors from '@/constants/colors'

interface IProps {
  refferedBy: IRefferedBy
}

const ReadRefferedByModal: React.FC<IProps> = ({ refferedBy }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Read Company RefferedBy
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row height="40px">
              <H1 color={colors.text.primary}>RefferedBy Name: </H1>
              <H1 color={colors.text.primary} width="auto">
                {refferedBy.name}
              </H1>
            </Row>
            <JustifyCenterRow height="40px" margin="1rem 0">
              <H1 color={colors.text.primary}>RefferedBy Color: </H1>
              <ItemContainer width="40px">
                <CircleColor cursor="normal" color={refferedBy.color} />
              </ItemContainer>
            </JustifyCenterRow>
            <Row height="40px">
              <H1 color={colors.text.primary}>RefferedBy Status: </H1>
              <Badge color={selectColorForStatus(+refferedBy.status)}>{EStatus[refferedBy.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadRefferedByModal
