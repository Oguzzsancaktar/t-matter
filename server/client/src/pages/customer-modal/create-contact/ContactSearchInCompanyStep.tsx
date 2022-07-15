import React, { useState } from 'react'
import {
  Badge,
  Button,
  H1,
  InnerWrapper,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterRow,
  RoleBadge,
  Row,
  SearchBar,
  UserBadge
} from '@/components'
import DataTable from 'react-data-table-component'
import { Plus, UserCheck, X } from 'react-feather'
import colors from '@/constants/colors'
import { useGetCustomersQuery } from '@/services/customers/customerService'
import { ICustomer } from '@/models'

interface IProps {
  reliableInCompanyList: ICustomer[]
  onAdd: (id: ICustomer) => void
  onRemove: (id: ICustomer) => void
}
const ContactSearchInCompanyStep: React.FC<IProps> = ({ reliableInCompanyList, onAdd, onRemove }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: filteredCustomers, isLoading: filteredCustomersIsLoading } = useGetCustomersQuery(searchQuery)

  const columns = [
    {
      name: 'Customer',
      sortable: true,
      cell: data => <UserBadge userEmail={data.email} userImage={data.photo} userName={data.fullname} />
    },
    {
      name: 'Type',
      selector: row => row.type,
      sortable: true,
      cell: data => <RoleBadge roleColor="#ff0000" roleIcon={<UserCheck size={16} />} roleName={data.type} />
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true
    },
    {
      name: 'Add',
      selector: row => row.year,
      right: true,
      cell: data => (
        <JustifyCenterRow>
          <ItemContainer cursorType="pointer">
            <Plus size={16} onClick={() => onAdd(data.id)} />
          </ItemContainer>
        </JustifyCenterRow>
      )
    }
  ]

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <InnerWrapper height="100%">
      <ItemContainer height="35px">
        <SearchBar onSeach={handleSearch} />
      </ItemContainer>
      <ItemContainer height="calc(100% - 0.5rem - 0.5rem - 35px - 40px)" margin="0.5rem 0">
        <DataTable
          style={{ height: 'calc(100% - 56px)' }}
          pagination={true}
          paginationPerPage={5}
          columns={columns}
          data={filteredCustomers || []}
        />
      </ItemContainer>
      <ItemContainer height="40px">
        <Row>
          {reliableInCompanyList.map((reliable, index) => (
            <ItemContainer key={index} maxWidth="250px" margin="0 1rem 0 0">
              <JustifyBetweenRow>
                <ItemContainer margin="0 0.5rem 0 0" width="calc(100% - 0.5rem - 30px)">
                  <UserBadge userEmail={reliable.email} userImage={'reliable.photo'} userName={reliable.firstname} />
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
        </Row>
      </ItemContainer>
    </InnerWrapper>
  )
}

export default ContactSearchInCompanyStep
