import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ActionButtons } from '@/components/data-tables'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { H1, Label } from '@/components/texts'
import { InnerWrapper } from '@/components/wrapper'
import colors from '@/constants/colors'
import { ECustomerType, EStatus, ICustomer } from '@/models'
import { CustomerModalWorkflowTab, UserModalLogInTab, UserModalSettingsTab } from '@/pages'
import moment from 'moment'
import React, { useState } from 'react'

interface IProps {
  customer: ICustomer
}

const CustomerReadModal: React.FC<IProps> = ({ customer }) => {
  const [activeTab, setActiveTab] = useState('activity')

  console.log(activeTab)
  const renderSwitch = () => {
    switch (activeTab) {
      case 'activity':
        return 'Activity'
      case 'calendar':
        return 'Calendar'
      case 'workflow':
        return <CustomerModalWorkflowTab customerId={customer._id} />
      case 'file':
        return 'File'
      case 'Finance':
        return 'Finance'
    }
  }

  return (
    <ItemContainer borderRadius="0.3rem" overflow="hidden" backgroundColor="transparent">
      <JustifyBetweenRow height="100%">
        <ItemContainer width="350px" height="100%" backgroundColor={colors.white.secondary} borderRadius="0.3rem">
          <JustifyBetweenColumn height="100%" padding="1rem">
            <ItemContainer height="150px">
              <JustifyBetweenColumn>
                <ItemContainer>
                  <JustifyCenterColumn>
                    <UserImage width="100px" height="100px" src="https://via.placeholder.com/150" />
                    <H1 fontSize="1.2rem" textAlign="center" color={colors.text.primary} margin="1rem 0">
                      {customer.firstname + ' ' + customer.lastname}
                    </H1>
                  </JustifyCenterColumn>
                </ItemContainer>
                <ItemContainer borderBottom={'1px solid ' + colors.white.primary} padding="0 0 0.5rem 0">
                  <JustifyCenterRow>
                    <ItemContainer width="auto" margin="0 0.5rem 0 0">
                      <Badge children={ECustomerType[customer.customerType]} color={colors.gray.dark} />
                    </ItemContainer>
                    <ItemContainer width="auto">
                      <Badge children={EStatus[customer.status]} color={colors.green.primary} />
                    </ItemContainer>
                  </JustifyCenterRow>
                </ItemContainer>
              </JustifyBetweenColumn>
            </ItemContainer>

            <ItemContainer padding="1rem 0" height="calc(100% - 1rem - 1rem - 150px - 40px - 1rem)">
              <JustifyBetweenColumn>
                {customer.customerType === 0 && (
                  <ItemContainer margin="1rem 0">
                    <JustifyBetweenRow>
                      <ItemContainer width="90px" margin="0 0.5rem 0 0">
                        <H1 fontSize="13px" color={colors.black.dark}>
                          Address
                        </H1>
                      </ItemContainer>
                      <ItemContainer width="calc(100% - 90px - 0.5rem)">
                        <H1 fontSize="12px" color={colors.black.light}>
                          {customer.address +
                            ' ' +
                            customer.city +
                            ' ' +
                            customer.state +
                            ' ' +
                            customer.country +
                            ' ' +
                            customer.zipcode}
                        </H1>
                      </ItemContainer>
                    </JustifyBetweenRow>
                  </ItemContainer>
                )}

                <ItemContainer margin="1rem 0">
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Email
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        {customer.email}
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="1rem 0">
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Contact
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        {customer.phone}
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="1rem 0">
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Birthday
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        {moment(customer.birthday).format('MMMM-DD-YYYY')}
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="1rem 0">
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Birth Location
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        {customer.birthplace}
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>
              </JustifyBetweenColumn>
            </ItemContainer>

            <ItemContainer height="40px" borderBottom={'1px solid ' + colors.white.primary} padding="0 0 0.5rem 0">
              <JustifyCenterColumn width="100%">
                <ActionButtons
                  rowWidth="100%"
                  iconSize="30px"
                  buttonWidth="100%"
                  onEdit={function (): void {
                    throw new Error('Function not implemented.')
                  }}
                  onHistory={function (): void {
                    throw new Error('Function not implemented.')
                  }}
                  onDelete={function (): void {
                    throw new Error('Function not implemented.')
                  }}
                />
              </JustifyCenterColumn>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer height="100%" width="120px" padding="1rem" backgroundColor={colors.gray.primary}>
          <JustifyBetweenColumn height="100%">
            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('activity')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Activity
                </H1>
              </Button>
            </ItemContainer>
            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('calendar')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Calendar
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('workflow')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Workflow
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('file')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  File
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('finance')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Finance
                </H1>
              </Button>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer
          minHeight="700px"
          height="inherit"
          width="calc(100% - 120px - 350px - 0.5rem)"
          backgroundColor={colors.white.secondary}
          padding="1rem 0"
          borderRadius="0.3rem"
        >
          {renderSwitch()}
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default CustomerReadModal
