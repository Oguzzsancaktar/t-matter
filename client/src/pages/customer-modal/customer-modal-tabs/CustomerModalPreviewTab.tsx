import React, { useEffect } from 'react'
import { ICustomer } from '@/models'
import {
  Column,
  CustomerActivityMonthlyBarChart,
  CustomerMostUsedUserDonutChart,
  CustomerPerformanceRadialChart,
  CustomerTaskTargetRadialChart,
  CustomerTaskTimingAnalysisRadialChart,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn
} from '@/components'
import { AdditionalTimeDonut, DiscountedInvoicesDonut, InvoicesDonut, NonBillableCircleProgress } from './finance-tabs'
import colors from '@/constants/colors'
import {
  taskApi,
  useGetCustomerMostUsedUserInTasksQuery,
  useGetCustomerTasksTimerAnalyisesQuery
} from '@/services/customers/taskService'

interface IProps {
  customerId: ICustomer['_id']
}

const CustomerModalPreviewTab: React.FC<IProps> = ({ customerId }) => {
  const { data: customerMostUsedUserChartData } = useGetCustomerMostUsedUserInTasksQuery({ customerId })
  const { data: customerTaskTimerChartData } = useGetCustomerTasksTimerAnalyisesQuery({ customerId })

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
          <JustifyBetweenRow height="100%">
            <ItemContainer height="100%">
              <CustomerMostUsedUserDonutChart chartData={customerMostUsedUserChartData} />
            </ItemContainer>

            <ItemContainer height="100%">
              <CustomerTaskTimingAnalysisRadialChart chartData={customerTaskTimerChartData} />
            </ItemContainer>

            <ItemContainer>
              <CustomerPerformanceRadialChart customerId={customerId} />
            </ItemContainer>

            <ItemContainer>
              <CustomerTaskTargetRadialChart />
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>

        <ItemContainer height="calc(100% - 200px - 1rem)">
          <JustifyBetweenRow height="100%">
            <ItemContainer height="100%" margin="0  1rem 0 0" width="calc(100% - 400px - 1rem)">
              <JustifyCenterColumn height="100%">
                <ItemContainer
                  height="calc(100% - 200px - 1rem)"
                  backgroundColor={colors.white.secondary}
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  borderRadius="0.3rem"
                  margin="0 0 1rem 0"
                >
                  <CustomerActivityMonthlyBarChart customerId={customerId} />
                </ItemContainer>

                <ItemContainer
                  height="200px"
                  backgroundColor={colors.white.secondary}
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  borderRadius="0.3rem"
                >
                  <JustifyBetweenRow height="100%">
                    <InvoicesDonut selectedInvoice={undefined} onSelect={() => {}} customerId={customerId} />
                    <DiscountedInvoicesDonut selectedInvoice={undefined} onSelect={() => {}} customerId={customerId} />
                    <NonBillableCircleProgress customerId={customerId} />
                    <AdditionalTimeDonut customerId={customerId} />
                  </JustifyBetweenRow>
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
              Task activity
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalPreviewTab
