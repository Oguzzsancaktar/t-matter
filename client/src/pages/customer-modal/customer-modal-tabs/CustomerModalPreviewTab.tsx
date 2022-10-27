import React, { useEffect } from 'react'
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
  JustifyCenterColumn
} from '@/components'
import { AdditionalTimeDonut, InvoicesDonut, NonBillableCircleProgress } from './finance-tabs'
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
          <ItemContainer width="100%" height="100%" position="relative">
            <ItemContainer
              position="absolute"
              transform="rotate(90deg)"
              width="100px"
              left="-30px"
              top="40%"
              zIndex="999"
            >
              <H1 fontSize="1.2rem" fontWeight="bold" color={colors.gray.disabled}>
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

              <ItemContainer>
                <CustomerPerformanceRadialChart customerId={customerId} />
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
            <H1 fontSize="1.2rem" fontWeight="bold" color={colors.gray.disabled}>
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
                  <CustomerActivityMonthlyBarChart customerId={customerId} />
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
                      <H1 fontSize="1.2rem" fontWeight="bold" color={colors.gray.disabled}>
                        Finance
                      </H1>
                    </ItemContainer>

                    <JustifyBetweenRow height="100%" width="calc(100% - 5rem)" margin="0 0 0 auto">
                      <InvoicesDonut
                        isPreview={true}
                        selectedInvoice={undefined}
                        onSelect={() => {}}
                        customerId={customerId}
                      />

                      {/* <DiscountedInvoicesDonut
                        isPreview={true}
                        selectedInvoice={undefined}
                        onSelect={() => {}}
                        customerId={customerId}
                      /> */}
                      <NonBillableCircleProgress isPreview={true} customerId={customerId} />
                      <AdditionalTimeDonut isPreview={true} customerId={customerId} />
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
              Task activity
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalPreviewTab
