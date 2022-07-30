import { ItemContainer } from '@/components/item-container'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer, ICustomerAddNew, ICustomerUpdateDTO, IRelativeType } from '@/models'
import { ClientAddNewContactsStep, ClientSearchInCompanyStep, ContactSearchInCompanyStep } from '@/pages'
import { closeModal, openModal } from '@/store'
import { toastWarning } from '@/utils/toastUtil'
import React from 'react'
import RelateByModal from './RelateByModal'

interface IProps {
  customer: ICustomerUpdateDTO
  handleAdd: (id: ICustomer) => void
  onRemove: (id: ICustomer | ICustomerAddNew) => void
}

const CustomerSearchModal: React.FC<IProps> = ({ customer, handleAdd, onRemove }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  return (
    <ItemContainer>
      <ContactSearchInCompanyStep
        reliableInCompanyList={customer.reliableInCompany || []}
        onAdd={handleAdd}
        onRemove={onRemove}
      />
    </ItemContainer>
  )
}

export default CustomerSearchModal
