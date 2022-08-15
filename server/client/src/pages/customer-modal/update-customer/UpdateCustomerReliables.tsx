import { Button, CustomerSearchModal, ItemContainer, JustifyBetweenRow, Row, UserBadge } from '@/components'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer, ICustomerAddNew, ICustomerUpdateDTO } from '@/models'
import { useGetCustomerReliablesQuery } from '@/services/customers/customerService'
import { openModal } from '@/store'
import React, { useState } from 'react'
import { X } from 'react-feather'

interface IProps {
  updateContactDTO: ICustomerUpdateDTO
  onAdd: (id: ICustomer) => void
  onRemove: (id: ICustomer | ICustomerAddNew) => void
}

const UpdateCustomerReliables: React.FC<IProps> = ({ updateContactDTO, onAdd, onRemove }) => {
  const { data: customerReliablesData, isLoading: customerReliablesIsLoading } = useGetCustomerReliablesQuery(
    updateContactDTO._id
  )

  const [updatedReliableList, setUpdatedReliableList] = useState(updateContactDTO.reliableCustomers)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleOpenAddReliableSearchModal = () => {
    dispatch(
      openModal({
        id: `customerSearchModal-${updateContactDTO._id}`,
        title: 'CustomerSearchModal',
        body: <CustomerSearchModal handleAdd={onAdd} customer={updateContactDTO} onRemove={onRemove} />,
        width: ESize.XLarge,
        height: ESize.Large
      })
    )
  }

  return (
    <ItemContainer height="40px">
      <Row>
        {!customerReliablesIsLoading &&
          customerReliablesData &&
          customerReliablesData.length > 0 &&
          updateContactDTO.reliableCustomers.length > 0 && (
            <ItemContainer>
              {customerReliablesData.map((reliable, index) =>
                updatedReliableList.map(updatedReliable => {
                  if (updatedReliable.reliableId === reliable._id) {
                    return (
                      <ItemContainer key={index} maxWidth="250px" margin="0 1rem 0 0">
                        <JustifyBetweenRow>
                          <ItemContainer margin="0 0.5rem 0 0" width="calc(100% - 0.5rem - 30px)">
                            <UserBadge
                              userEmail={reliable.relativeType?.relateTo || ''}
                              userImage={'reliable.photo'}
                              userName={reliable.firstname + ' ' + reliable.lastname}
                            />
                          </ItemContainer>
                          <Button
                            color={colors.red.primary}
                            width="30px"
                            height="30px"
                            padding="0"
                            onClick={() => onRemove(reliable)}
                          >
                            <X size={16} />
                          </Button>
                        </JustifyBetweenRow>
                      </ItemContainer>
                    )
                  }
                })
              )}
            </ItemContainer>
          )}

        {updateContactDTO.createContact && (
          <ItemContainer>
            {(updateContactDTO.createContact || []).map((reliable, index) => (
              <ItemContainer key={index} maxWidth="250px" margin="0 1rem 0 0">
                <JustifyBetweenRow>
                  <ItemContainer margin="0 0.5rem 0 0" width="calc(100% - 0.5rem - 30px)">
                    <UserBadge
                      userEmail={reliable.relativeType?.relateTo || ''}
                      userImage={'reliable.photo'}
                      userName={reliable.firstname + ' ' + reliable.lastname}
                    />
                  </ItemContainer>
                  <Button
                    color={colors.red.primary}
                    width="30px"
                    height="30px"
                    padding="0"
                    onClick={() => onRemove(reliable)}
                  >
                    <X size={16} />
                  </Button>
                </JustifyBetweenRow>
              </ItemContainer>
            ))}
          </ItemContainer>
        )}

        <ItemContainer>
          <Button onClick={handleOpenAddReliableSearchModal}>Add reliable </Button>
        </ItemContainer>
      </Row>
    </ItemContainer>
  )
}

export default UpdateCustomerReliables
