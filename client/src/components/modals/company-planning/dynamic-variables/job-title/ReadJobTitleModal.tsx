import React from 'react'
import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  Row
} from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, ItemContainer } from '@/components'
import { ModalBody, ModalHeader } from '../../../types'
import { EStatus, IJobTitle } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import colors from '@/constants/colors'

interface IProps {
  jobTitle: IJobTitle
}

const ReadJobTitleModal: React.FC<IProps> = ({ jobTitle }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              {jobTitle.name}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <JustifyCenterColumn height="100%" padding="2rem 0">
          <Row margin="0 0 1rem 0">
            <H1 color={colors.text.primary}>JobTitle Name: </H1>
            <H1 color={colors.text.primary} width="auto">
              {jobTitle.name}
            </H1>
          </Row>
          <JustifyBetweenRow>
            <H1 color={colors.text.primary}>JobTitle Status: </H1>
            <JustifyCenterRow height="40px" width="auto">
              <Badge color={selectColorForStatus(+jobTitle.status)}>{EStatus[jobTitle.status]} </Badge>
            </JustifyCenterRow>
          </JustifyBetweenRow>
        </JustifyCenterColumn>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadJobTitleModal
