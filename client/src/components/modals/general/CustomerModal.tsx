import React from 'react'
import { ItemContainer } from '@/components/item-container'
import { ModalBody } from '../types'
import { CustomersPage } from '@/pages'

const CustomerModal = () => {
  return (
    <ItemContainer borderRadius="0.3rem" overflow="hidden" height="100%">
      <ModalBody height="100% ">
        <CustomersPage />
      </ModalBody>
    </ItemContainer>
  )
}

export default CustomerModal
