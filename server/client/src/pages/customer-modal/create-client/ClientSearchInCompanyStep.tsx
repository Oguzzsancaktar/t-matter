import React, { useState } from 'react'
import {
  Button,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterRow,
  NoTableData,
  RoleBadge,
  Row,
  SearchBar,
  TableSkeltonLoader,
  UserBadge
} from '@/components'
import DataTable from 'react-data-table-component'
import { Plus, UserCheck, X } from 'react-feather'
import colors from '@/constants/colors'
import { useGetCustomersQuery } from '@/services/customers/customerService'
import { ECustomerType, ICustomer } from '@/models'
import emptyQueryParams from '@/constants/queryParams'

interface IProps {
  reliableInCompanyList: ICustomer[]
  onAdd: (id: ICustomer) => void
  onRemove: (id: ICustomer) => void
}
const ClientSearchInCompanyStep: React.FC<IProps> = ({ reliableInCompanyList, onAdd, onRemove }) => {
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
      width: '150px',
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
        <ItemContainer margin="auto" cursorType="pointer" width="100%" onClick={() => onAdd(data)}>
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
    <ItemContainer height="100%">
      <ItemContainer height="35px">
        <SearchBar onSearch={handleSearch} />
      </ItemContainer>
      <ItemContainer height="calc(100% - 0.5rem - 0.5rem - 35px - 40px - 1rem - 1rem)" margin="0.5rem 0">
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

      <ItemContainer height="calc(40px + 1rem +  1rem)" overflow="auto">
        <Row margin="0.5rem 0">
          {reliableInCompanyList.map((reliable, index) => (
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
                  onClick={() => onRemove(reliable)}
                >
                  <X size={16} />
                </Button>
              </JustifyBetweenRow>
            </ItemContainer>
          ))}
        </Row>
      </ItemContainer>
    </ItemContainer>
  )
}

export default ClientSearchInCompanyStep
