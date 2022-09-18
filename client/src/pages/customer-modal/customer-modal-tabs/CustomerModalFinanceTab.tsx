import React, { useEffect, useState } from 'react'
import { ICustomer, IInstallment, Invoice } from '@/models'
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
import { ModalHeader } from '@components/modals/types'
import InvoiceTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/InvoiceTab'
import EstimateTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/estimate-tab/EstimateTab'
import InstallmentTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/InstallmentTab'
import ShowHistory from '@components/show-history/ShowHistory'
import { useGetFinanceHistoryQuery } from '@services/historyService'
import { History } from '@components/history'
import history from '@components/history/History'

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
  const [historyType, setHistoryType] = useState<undefined | string>(undefined)
  const [selectedInvoice, setSelectedInvoice] = useState<undefined | Invoice>()
  const [selectedInstallment, setSelectedInstallment] = useState<undefined | IInstallment>()

  const { data, refetch } = useGetFinanceHistoryQuery({
    customerId,
    userId: localStorage.getItem('userId') as string,
    historyType,
    invoiceId: selectedInvoice?._id,
    installmentId: selectedInstallment?._id
  })

  const handleToggle = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHistoryOpen(!isHistoryOpen)
  }

  const handleSelectedInvoiceChange = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
  }

  const handleSelectedInstallmentChange = (installment: IInstallment) => {
    setSelectedInstallment(installment)
    setIsHistoryOpen(true)
  }

  useEffect(() => {
    if (isHistoryOpen) {
      refetch()
    }
  }, [isHistoryOpen])

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

        {React.createElement(Component[activeTab], {
          customerId,
          selectedInvoice,
          handleSelectedInvoiceChange,
          handleSelectedInstallmentChange
        })}
        <SideDrawer
          onOutsideClick={() => {
            setSelectedInstallment(undefined)
            setTimeout(() => {
              setIsHistoryOpen(false)
            }, 0)
          }}
          isHistoryOpen={isHistoryOpen}
        >
          <History selectedFilter={historyType} onFilter={setHistoryType} history={data} />
        </SideDrawer>
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalFinanceTab
