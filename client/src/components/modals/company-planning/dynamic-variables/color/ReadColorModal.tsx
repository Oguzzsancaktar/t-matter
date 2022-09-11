import React from 'react'
import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  Row
} from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, CircleColor, ItemContainer } from '@/components'
import { ModalBody, ModalHeader } from '../../../types'
import { EStatus, IColor } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import colors from '@/constants/colors'

interface IProps {
  color: IColor
}

const ReadColorModal: React.FC<IProps> = ({ color }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              {color.color}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <JustifyCenterColumn height="100%" padding="2rem 0">
          <Row margin="0 0 1rem 0">
            <H1 color={colors.text.primary}>Color Name: </H1>
            <CircleColor color={color.color} />
          </Row>
          <JustifyBetweenRow>
            <H1 color={colors.text.primary}>Color Status: </H1>
            <JustifyCenterRow height="40px" width="auto">
              <Badge color={selectColorForStatus(+color.status)}>{EStatus[color.status]} </Badge>
            </JustifyCenterRow>
          </JustifyBetweenRow>
        </JustifyCenterColumn>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadColorModal
