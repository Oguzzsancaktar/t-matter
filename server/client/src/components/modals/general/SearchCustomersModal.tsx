import React, { useState } from 'react'
import { UserBadge, RoleBadge } from '@/components/badge'
import { ItemContainer } from '@/components/item-container'
import { NoTableData } from '@/components/no-table-data'
import { SearchBar } from '@/components/searchBar'
import { TableSkeltonLoader } from '@/components/skelton-loader'
import { InnerWrapper } from '@/components/wrapper'
import { ECustomerType } from '@/models'
import { useGetCustomersQuery } from '@/services/customers/customerService'
import DataTable from 'react-data-table-component'
import { UserCheck } from 'react-feather'
import { JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'

import { ModalHeader, ModalBody } from '../types'
import colors from '@/constants/colors'
import emptyQueryParams from '@/constants/queryParams'

const SearchCustomersModal = () => {
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
      name: 'Type',
      selector: row => row.type,
      sortable: true,
      cell: data => (
        <RoleBadge roleColor="#ff0000" roleIcon={<UserCheck size={16} />} roleName={ECustomerType[data.customerType]} />
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

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Search Customers
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody minHeight="100% - 51px">
        <ItemContainer height="35px">
          <SearchBar onSearch={handleSearch} />
        </ItemContainer>
        <ItemContainer height="calc(100% - 0.5rem - 0.5rem - 35px)" margin="0.5rem 0">
          {filteredCustomersIsLoading ? (
            <ItemContainer height="100%">
              <TableSkeltonLoader count={13} />
            </ItemContainer>
          ) : filteredCustomers && filteredCustomers.length > 0 ? (
            <DataTable fixedHeader columns={columns} data={filteredCustomers || []} />
          ) : (
            <NoTableData />
          )}
        </ItemContainer>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default SearchCustomersModal
