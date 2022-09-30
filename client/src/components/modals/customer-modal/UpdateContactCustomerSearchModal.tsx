import { UserBadge, RoleBadge } from '@/components/badge'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyCenterRow } from '@/components/layout'
import { NoTableData } from '@/components/no-table-data'
import { SearchBar } from '@/components/searchBar'
import { TableSkeltonLoader } from '@/components/skelton-loader'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import useAccessStore from '@/hooks/useAccessStore'
import { ECustomerType, ICustomer } from '@/models'
import { useGetCustomersQuery } from '@/services/customers/customerService'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { UserCheck, Plus } from 'react-feather'
import { ModalHeader, ModalBody } from '../types'

interface IProps {
  handleAdd: (customer: ICustomer) => void
}

const UpdateContactCustomerSearchModal: React.FC<IProps> = ({ handleAdd }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [searchQuery, setSearchQuery] = useState(emptyQueryParams)
  const { data: filteredCustomers, isLoading: filteredCustomersIsLoading } = useGetCustomersQuery(searchQuery)

  const columns = [
    {
      name: 'Customer',
      sortable: true,
      cell: data => (
        <UserBadge userEmail={data.email} userImage={data.photo} userName={data.firstname + ' ' + data.lastname} />
      )
    },
    {
      width: '150px',
      name: 'Type',
      selector: row => row.type,
      sortable: true,
      cell: data => (
        <RoleBadge roleColor="#ff0000" roleIcon={<UserCheck size={16} />} roleName={ECustomerType[data.customerType]} />
      )
    },
    {
      width: '200px',
      name: 'Phone',
      selector: row => row.phone,
      sortable: true
    },
    {
      width: '70px',
      name: 'Add',
      selector: row => row.year,
      right: true,
      cell: data => (
        <ItemContainer margin="auto" cursorType="pointer" width="100%" onClick={() => handleAdd(data)}>
          <ItemContainer width="30px" height="30px" backgroundColor={colors.primary.dark} borderRadius={'0.3rem'}>
            <JustifyCenterRow>
              <Plus size={16} color={colors.white.secondary} />
            </JustifyCenterRow>
          </ItemContainer>
        </ItemContainer>
      )
    }
  ]

  const handleSearch = (value: string) => {
    setSearchQuery({ ...searchQuery, search: value })
  }

  return (
    <Column height="100%">
      <ModalHeader>
        <JustifyCenterRow width="100%">
          <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
            Customer Reliable Search Modal
          </H1>
        </JustifyCenterRow>
      </ModalHeader>

      <ModalBody height="calc(100% - 63px)">
        <ItemContainer height="100%">
          <ItemContainer height="35px">
            <SearchBar onSearch={handleSearch} />
          </ItemContainer>
          <ItemContainer height="calc(100% - 0.5rem - 0.5rem - 35px )" margin="0.5rem 0">
            {filteredCustomersIsLoading ? (
              <ItemContainer height="100%">
                <TableSkeltonLoader count={13} />
              </ItemContainer>
            ) : filteredCustomers && filteredCustomers.length > 0 ? (
              <DataTable className="data-table" fixedHeader columns={columns} data={filteredCustomers || []} />
            ) : (
              <NoTableData />
            )}
          </ItemContainer>
        </ItemContainer>
      </ModalBody>
    </Column>
  )
}

export default UpdateContactCustomerSearchModal
