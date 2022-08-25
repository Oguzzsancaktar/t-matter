import { Button, ItemContainer, JustifyBetweenRow, Row, UserBadge } from '@/components'
import UpdateContactCustomerSearchModal from '@/components/modals/customer-modal/UpdateContactCustomerSearchModal'
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
  onRemovePastReliable: (id: ICustomer) => void
  onRemoveNewReliable: (id: ICustomerAddNew) => void
}

const UpdateClientReliables: React.FC<IProps> = ({
  updateContactDTO,
  onAdd,
  onRemovePastReliable,
  onRemoveNewReliable
}) => {
  const { data: customerReliablesData, isLoading: customerReliablesIsLoading } = useGetCustomerReliablesQuery(
    updateContactDTO._id
  )

  const [updatedReliableList, setUpdatedReliableList] = useState(updateContactDTO.reliableCustomers)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleOpenAddReliableSearchModal = () => {
    dispatch(
      openModal({
        id: `updateContactCustomerSearchModal-${updateContactDTO._id}`,
        title: `Customer Search Reliable Modal`,
        body: <UpdateContactCustomerSearchModal handleAdd={customer => onAdd(customer)} />,
        width: ESize.WMedium,
        height: ESize.HMedium,
        maxWidth: ESize.WMedium
      })
    )
  }

  return (
    <ItemContainer>
      <Row>
        <ItemContainer width="calc(100% - 200px - 1rem)" overflow="auto" margin="0 1rem 0 0">
          <Row>
            {!customerReliablesIsLoading &&
              customerReliablesData &&
              customerReliablesData.length > 0 &&
              updateContactDTO.reliableCustomers.length > 0 && (
                <Row>
                  {customerReliablesData.map((reliable, index) =>
                    updatedReliableList.map(updatedReliable => {
                      if (updatedReliable.reliableId === reliable._id) {
                        return (
                          <ItemContainer
                            key={index}
                            minWidth="300px"
                            width="auto"
                            margin="0 1rem 0 0"
                            backgroundColor={colors.secondary.light}
                            borderRadius="0.3rem"
                            padding="0.5rem"
                          >
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
                                onClick={() => onRemovePastReliable(reliable)}
                              >
                                <X size={16} />
                              </Button>
                            </JustifyBetweenRow>
                          </ItemContainer>
                        )
                      }
                    })
                  )}
                </Row>
              )}

            {updateContactDTO.reliableInCompany && (
              <Row>
                {(updateContactDTO.reliableInCompany || []).map((reliable, index) => (
                  <ItemContainer
                    key={index}
                    minWidth="300px"
                    width="auto"
                    margin="0 1rem 0 0"
                    backgroundColor={colors.secondary.light}
                    borderRadius="0.3rem"
                    padding="0.5rem"
                  >
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
                        width="20px"
                        height="20px"
                        padding="0"
                        onClick={() => onRemoveNewReliable(reliable)}
                      >
                        <X size={16} />
                      </Button>
                    </JustifyBetweenRow>
                  </ItemContainer>
                ))}
              </Row>
            )}
          </Row>
        </ItemContainer>
        <ItemContainer width="200px">
          <Button onClick={handleOpenAddReliableSearchModal}>Add reliable</Button>
        </ItemContainer>
      </Row>
    </ItemContainer>
  )
}

export default UpdateClientReliables
