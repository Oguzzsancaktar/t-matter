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
import { ModalBody, ModalHeader } from '../../../types'
import { EStatus, ILocation } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import colors from '@/constants/colors'

interface IProps {
  location: ILocation
}

const ReadLocationModal: React.FC<IProps> = ({ location }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              {location.name}
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0">
              <H1 color={colors.text.primary}>Location Name: </H1>
              <H1 color={colors.text.primary} width="auto">
                {location.name}
              </H1>
            </Row>
            <JustifyBetweenRow>
              <H1 color={colors.text.primary}>Location Status: </H1>
              <JustifyCenterRow height="40px" width="auto">
                <Badge color={selectColorForStatus(+location.status)}>{EStatus[location.status]} </Badge>
              </JustifyCenterRow>
            </JustifyBetweenRow>
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadLocationModal
