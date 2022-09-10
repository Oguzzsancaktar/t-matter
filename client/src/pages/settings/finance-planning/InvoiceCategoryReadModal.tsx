import React from 'react'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'
import { useGetInvoiceCategoryQuery } from '@services/settings/finance-planning/financePlanningService'
import {
  Badge,
  H1,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyCenterColumn,
  JustifyCenterRow,
  Row
} from '@/components'
import { ModalBody, ModalHeader } from '@components/modals/types'
import colors from '@constants/colors'
import { selectColorForStatus } from '@utils/statusColorUtil'
import { EStatus } from '@/models'

interface IProps {
  _id: IInvoiceCategory['_id']
}

const InvoiceCategoryReadModal: React.FC<IProps> = props => {
  const { data, isLoading } = useGetInvoiceCategoryQuery(props._id)

  if (!data) return null
  if (isLoading)
    return (
      <ItemContainer>
        <JustifyCenterColumn height="100%" padding="2rem 0">
          <Row margin="0 0 1rem 0">
            <H1 color={colors.text.primary}>Loading...</H1>
          </Row>
        </JustifyCenterColumn>
      </ItemContainer>
    )

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Preview - {data.name}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row margin="0 0 1rem 0">
              <H1 color={colors.text.primary}>Category Name: </H1>
              <H1 color={colors.text.primary} width="auto">
                {data.name}
              </H1>
            </Row>
            <Row margin="0 0 1rem 0">
              <H1 color={colors.text.primary}>Agreement: </H1>
              <H1 color={colors.text.primary} width="auto">
                <a href={data.agreement} target="_blank">
                  view
                </a>
              </H1>
            </Row>
            <Row>
              <H1 color={colors.text.primary}>Category Status: </H1>
              <Badge color={selectColorForStatus(+data.status)}>{EStatus[data.status]} </Badge>
            </Row>
          </JustifyCenterColumn>
        </ItemContainer>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default InvoiceCategoryReadModal
