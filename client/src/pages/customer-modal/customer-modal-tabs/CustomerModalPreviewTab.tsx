import React, { useEffect, useState } from 'react'
import { ICustomer } from '@/models'
import {
  Column,
  CustomerActivityMonthlyBarChart,
  CustomerMostUsedUserDonutChart,
  CustomerPerformanceRadialChart,
  CustomerTaskTargetRadialChart,
  CustomerTaskTimingAnalysisRadialChart,
  H1,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow
} from '@/components'
import { AdditionalTimeDonut, InvoicesDonut, NonBillableCircleProgress } from './finance-tabs'
import colors from '@/constants/colors'
import {
  taskApi,
  useGetCustomerMostUsedUserInTasksQuery,
  useGetCustomerTasksTimerAnalyisesQuery
} from '@/services/customers/taskService'
import CustomerActivity from './CustomerActivity'
import CustomerHistory from './finance-tabs/CustomerHistory'

interface IProps {
  customer: ICustomer
}

const CustomerModalPreviewTab: React.FC<IProps> = ({ customer }) => {
  const { data: customerMostUsedUserChartData } = useGetCustomerMostUsedUserInTasksQuery({ customerId: customer._id })
  const { data: customerTaskTimerChartData } = useGetCustomerTasksTimerAnalyisesQuery({ customerId: customer._id })

  const [previewType, setPreviewType] = useState('activity')

  useEffect(() => {
    taskApi.util.resetApiState()
  }, [])
  return (
    <ItemContainer padding="1rem" height="100%" overflow="hidden">
      <Column height="100%">
        <ItemContainer
          height="200px"
          margin="0 0 1rem 0"
          backgroundColor={colors.white.secondary}
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          borderRadius="0.3rem"
        >
          <ItemContainer width="100%" height="100%" position="relative">
            <ItemContainer
              position="absolute"
              transform="rotate(90deg)"
              width="100px"
              left="-30px"
              top="40%"
              zIndex="999"
            >
              <H1 fontSize="20px" fontWeight="bold" color={colors.gray.disabled}>
                Performance
              </H1>
            </ItemContainer>

            <JustifyBetweenRow height="100%">
              <ItemContainer height="100%">
                <CustomerMostUsedUserDonutChart chartData={customerMostUsedUserChartData} />
              </ItemContainer>

              <ItemContainer height="100%">
                <CustomerTaskTimingAnalysisRadialChart chartData={customerTaskTimerChartData} />
              </ItemContainer>

              <ItemContainer height="100%">
                <CustomerPerformanceRadialChart customerId={customer._id} />
              </ItemContainer>

              <ItemContainer>
                <CustomerTaskTargetRadialChart />
              </ItemContainer>
            </JustifyBetweenRow>
          </ItemContainer>
        </ItemContainer>

        <ItemContainer height="calc(100% - 200px - 1rem)" position="relative">
          <ItemContainer
            position="absolute"
            transform="rotate(90deg)"
            width="100px"
            left="-30px"
            top="30%"
            zIndex="999"
          >
            <H1 fontSize="20px" fontWeight="bold" color={colors.gray.disabled}>
              Workflow
            </H1>
          </ItemContainer>

          <JustifyBetweenRow height="100%">
            <ItemContainer height="100%" margin="0 1rem 0 0" width="calc(100% - 400px - 1rem)">
              <JustifyCenterColumn height="100%">
                <ItemContainer
                  height="calc(100% - 200px - 1rem)"
                  backgroundColor={colors.white.secondary}
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  borderRadius="0.3rem"
                  margin="0 0 1rem 0"
                >
                  <CustomerActivityMonthlyBarChart customer={customer} />
                </ItemContainer>

                <ItemContainer
                  height="200px"
                  backgroundColor={colors.white.secondary}
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  borderRadius="0.3rem"
                >
                  <ItemContainer height="100%" transform="translateY(5%)" position="relative">
                    <ItemContainer
                      position="absolute"
                      transform="rotate(90deg)"
                      width="100px"
                      left="-30px"
                      top="50%"
                      zIndex="999"
                    >
                      <H1 fontSize="20px" fontWeight="bold" color={colors.gray.disabled}>
                        Finance
                      </H1>
                    </ItemContainer>

                    <JustifyBetweenRow height="100%" width="calc(100% - 5rem)" margin="0 0 0 auto">
                      <InvoicesDonut
                        isPreview={true}
                        selectedInvoice={undefined}
                        onSelect={() => {}}
                        customerId={customer._id}
                      />

                      {/* <DiscountedInvoicesDonut
                        isPreview={true}
                        selectedInvoice={undefined}
                        onSelect={() => {}}
                        customerId={customerId}
                      /> */}
                      <NonBillableCircleProgress isPreview={true} customerId={customer._id} />
                      <AdditionalTimeDonut isPreview={true} customerId={customer._id} />
                    </JustifyBetweenRow>
                  </ItemContainer>
                </ItemContainer>
              </JustifyCenterColumn>
            </ItemContainer>

            <ItemContainer
              width="400px"
              height="100%"
              backgroundColor={colors.white.secondary}
              boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              borderRadius="0.3rem"
            >
              <ItemContainer height="40px" margin="0 0 1rem 0">
                <JustifyCenterRow width="100%">
                  <ItemContainer onClick={() => setPreviewType('activity')} cursorType="pointer" width="auto">
                    <H1
                      width="auto"
                      color={previewType === 'activity' ? colors.blue.primary : colors.gray.disabled}
                      cursor="pointer"
                    >
                      Activity
                    </H1>
                  </ItemContainer>
                  <H1 width="auto" color={colors.gray.disabled}>
                    /
                  </H1>

                  <ItemContainer onClick={() => setPreviewType('history')} cursorType="pointer" width="auto">
                    <H1
                      width="auto"
                      color={previewType === 'history' ? colors.blue.primary : colors.gray.disabled}
                      cursor="pointer"
                    >
                      History
                    </H1>
                  </ItemContainer>
                </JustifyCenterRow>
              </ItemContainer>

              <ItemContainer height="calc(100% - 40px - 1rem)">
                {previewType === 'activity' ? (
                  <CustomerActivity customerId={customer._id} />
                ) : (
                  <CustomerHistory customerId={customer._id} />
                )}
              </ItemContainer>
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalPreviewTab
