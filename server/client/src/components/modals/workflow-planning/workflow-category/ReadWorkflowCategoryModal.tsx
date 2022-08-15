import React from 'react'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { Badge, InnerWrapper } from '@/components'
import { ModalBody, ModalHeader } from '../../types'
import { EStatus, ITaskCategory } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import colors from '@/constants/colors'

interface IProps {
  category: ITaskCategory
}

const ReadWorkflowCategoryModal: React.FC<IProps> = ({ category }) => {
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Read Workflow Category
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0">
              <H1>Category Name: </H1>
              <H1 width="fit-content">{category.name}</H1>
            </Row>
            <Row>
              <H1>Category Status: </H1>
              <Badge color={selectColorForStatus(+category.status)}>{EStatus[category.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadWorkflowCategoryModal
