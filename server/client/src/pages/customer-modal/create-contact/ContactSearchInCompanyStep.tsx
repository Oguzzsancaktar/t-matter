import React from 'react'
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

interface IProps {
  reliableInCompanyList: string[]
  onAdd: (id: string) => void
  onRemove: (id: string) => void
}
const ContactSearchInCompanyStep: React.FC<IProps> = ({ reliableInCompanyList, onAdd, onRemove }) => {
  // : { type: string; fullname: string; email: string; phone: string }
  const TEMPORARY_CUSTOMERS_ARR = [
    {
      id: '1',
      type: 'client',
      photo: 'https://source.unsplash.com/user/c_v_r/100x100',
      fullname: 'John Doe',
      email: 'jhon@doe.com',
      phone: '90999999999'
    },
    {
      id: '2',
      type: 'contact',
      photo: 'https://source.unsplash.com/user/c_v_r/100x100',
      fullname: 'Ali Keskin',
      email: 'ali@keskin.com',
      phone: '90888888889'
    },
    {
      id: '3',
      type: 'contact',
      photo: 'https://source.unsplash.com/user/c_v_r/100x100',
      fullname: 'Taha sancaktar',
      email: 'taha@sancaktar.com',
      phone: '90777777777'
    }
  ]

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

  return (
    <InnerWrapper height="100%">
      <ItemContainer height="35px">
        <SearchBar />
      </ItemContainer>
      <ItemContainer height="calc(100% - 0.5rem - 0.5rem - 35px - 40px)" margin="0.5rem 0">
        <DataTable columns={columns} data={TEMPORARY_CUSTOMERS_ARR} />
      </ItemContainer>
      <ItemContainer height="40px">
        <Row>
          {reliableInCompanyList.map((id, index) => {
            const reliable = TEMPORARY_CUSTOMERS_ARR.find(c => c.id === id)

            return (
              reliable && (
                <ItemContainer key={index} maxWidth="250px" margin="0 1rem 0 0">
                  <JustifyBetweenRow>
                    <ItemContainer margin="0 0.5rem 0 0" width="calc(100% - 0.5rem - 30px)">
                      <UserBadge userEmail={reliable.email} userImage={reliable.photo} userName={reliable.fullname} />
                    </ItemContainer>
                    <Button
                      color={colors.red.primary}
                      width="30px"
                      height="30px"
                      padding="0"
                      onClick={() => onRemove(id)}
                    >
                      <X size={16} />
                    </Button>
                  </JustifyBetweenRow>
                </ItemContainer>
              )
            )
          })}
        </Row>
      </ItemContainer>
    </InnerWrapper>
  )
}

export default ContactSearchInCompanyStep
