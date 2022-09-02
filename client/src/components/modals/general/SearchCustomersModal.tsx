import React, { useState } from 'react'
import { UserBadge, RoleBadge } from '@/components/badge'
import { ItemContainer } from '@/components/item-container'
import { NoTableData } from '@/components/no-table-data'
import { SearchBar } from '@/components/searchBar'
import { TableSkeltonLoader } from '@/components/skelton-loader'
import { ECustomerType, ESize, ICustomer } from '@/models'
import { useGetCustomersQuery } from '@/services/customers/customerService'
import DataTable from 'react-data-table-component'
import { UserCheck } from 'react-feather'
import { JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'

import { ModalHeader, ModalBody } from '../types'
import colors from '@/constants/colors'
import emptyQueryParams from '@/constants/queryParams'
import { openModal } from '@/store'
import { ReadCustomerModal } from '../customer-modal'
import useAccessStore from '@/hooks/useAccessStore'

const SearchCustomersModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [searchQuery, setSearchQuery] = useState(emptyQueryParams)
  const { data: filteredCustomers, isLoading: filteredCustomersIsLoading } = useGetCustomersQuery(searchQuery)

  const columns = [
    {
      name: 'Customer',
      sortable: true,
      cell: data => (
        <ItemContainer onClick={() => handleRead(data)} cursorType="pointer">
          <UserBadge userEmail={data.email} userImage={data.photo} userName={data.firstname + ' ' + data.lastname} />
        </ItemContainer>
      )
    },
    {
      name: 'Type',
      selector: row => row.type,
      sortable: true,
      cell: data => (
        <ItemContainer onClick={() => handleRead(data)} cursorType="pointer">
          <RoleBadge
            roleColor="#ff0000"
            roleIcon={<UserCheck size={16} />}
            roleName={ECustomerType[data.customerType]}
          />
        </ItemContainer>
      )
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true
    }
  ]

  const handleSearch = (value: string) => {
    setSearchQuery({ ...searchQuery, search: value })
  }

  const handleRead = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `customerDetailModal-${customer._id}`,
        title: 'Customer / ' + customer.firstname + ' ' + customer.lastname,
        body: <ReadCustomerModal customer={customer} />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Search Customers
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody height="calc(100% - 63px)">
        <ItemContainer height="35px">
          <SearchBar onSearch={handleSearch} />
        </ItemContainer>
        <ItemContainer height="calc(100% - 0.5rem - 0.5rem - 35px)" margin="0.5rem 0">
          {filteredCustomersIsLoading ? (
            <ItemContainer height="100%">
              <TableSkeltonLoader count={13} />
            </ItemContainer>
          ) : filteredCustomers && filteredCustomers.length > 0 ? (
            <DataTable fixedHeader columns={columns} data={filteredCustomers || []} onRowClicked={handleRead} />
          ) : (
            <NoTableData />
          )}
        </ItemContainer>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default SearchCustomersModal