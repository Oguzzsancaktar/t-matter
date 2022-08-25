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
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              {category.name}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <JustifyCenterColumn height="100%" padding="2rem 0">
          <Row margin="0 0 1rem 0">
            <H1 color={colors.text.primary} width="200px">
              Category Name:
            </H1>
            <H1 color={colors.text.primary} width="calc(100% - 200px)" textAlign="right">
              {category.name}
            </H1>
          </Row>
          <JustifyBetweenRow>
            <H1 color={colors.text.primary}>Category Status: </H1>

            <Badge color={selectColorForStatus(+category.status)}>{EStatus[category.status]} </Badge>
          </JustifyBetweenRow>
        </JustifyCenterColumn>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadWorkflowCategoryModal
