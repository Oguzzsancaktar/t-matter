import React, { useState } from 'react'
import { ICustomer } from '@/models'
import {
  Column,
  IconButton,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterRow,
  SideDrawer,
  Tab
} from '@/components'
import { ModalBody, ModalHeader } from '@components/modals/types'
import InvoiceTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/InvoiceTab'
import EstimateTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/estimate-tab/EstimateTab'
import InstallmentTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/InstallmentTab'
import ShowHistory from '@components/show-history/ShowHistory'
import colors from '@constants/colors'
import { Delete, Edit2, FilePlus, FileText, Plus, Trash2 } from 'react-feather'
import { useGetFinanceHistoryQuery } from '@services/historyService'

interface IProps {
  customerId: ICustomer['_id']
}

const Component = {
  InvoiceTab,
  EstimateTab,
  InstallmentTab
}

const CustomerModalFinanceTab: React.FC<IProps> = ({ customerId }) => {
  const [activeTab, setActiveTab] = useState('EstimateTab')
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const { data } = useGetFinanceHistoryQuery({ customerId, userId: localStorage.getItem('userId') as string })

  const handleToggle = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHistoryOpen(!isHistoryOpen)
  }

  return (
    <ItemContainer height="100%" minHeight="700px" overflow="hidden">
      <Column height="100%">
        <ModalHeader>
          <ItemContainer>
            <JustifyBetweenColumn>
              <JustifyCenterRow>
                <Tab
                  margin="0 1rem 0 0rem"
                  index={0}
                  name="Estimate"
                  isActive={activeTab === 'EstimateTab'}
                  onClick={() => setActiveTab('EstimateTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Installment"
                  isActive={activeTab === 'InstallmentTab'}
                  onClick={() => setActiveTab('InstallmentTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Invoice"
                  isActive={activeTab === 'InvoiceTab'}
                  onClick={() => setActiveTab('InvoiceTab')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </ItemContainer>
          {!isHistoryOpen && <ShowHistory onClick={handleToggle}>Show History</ShowHistory>}
        </ModalHeader>

        {React.createElement(Component[activeTab], { customerId })}
        <SideDrawer onOutsideClick={() => setTimeout(() => setIsHistoryOpen(false), 0)} isHistoryOpen={isHistoryOpen}>
          <Column padding="0.6rem">
            <JustifyBetweenRow margin="0 0 1rem 0">
              <IconButton
                // onClick={onHistory}
                bgColor={colors.orange.primary}
                width="40px"
                height="40px"
                margin="0 .2rem 0 0"
                children={<Plus size={'20px'} color="#fff" />}
                borderRadius="50%"
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
              />
              <IconButton
                // onClick={onHistory}
                bgColor={colors.blue.primary}
                width="40px"
                height="40px"
                margin="0 .2rem 0 0"
                children={<Edit2 size={'20px'} color="#fff" />}
                borderRadius="50%"
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
              />
              <IconButton
                // onClick={onHistory}
                bgColor={colors.red.primary}
                width="40px"
                height="40px"
                margin="0 .2rem 0 0"
                children={<Trash2 size={'20px'} color="#fff" />}
                borderRadius="50%"
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
              />
            </JustifyBetweenRow>
            <hr />
            {data?.map((item, index) => (
              <>
                <JustifyBetweenRow margin="0.5rem 0 0.5rem 0" key={index}>
                  <Column>title: {item.title}</Column>
                  <Column>description: {item.description}</Column>
                </JustifyBetweenRow>
                <hr />
              </>
            ))}
          </Column>
        </SideDrawer>
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalFinanceTab
