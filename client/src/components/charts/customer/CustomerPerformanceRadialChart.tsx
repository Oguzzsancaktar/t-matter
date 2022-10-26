import CircleImage from '@/components/image/CircleImage'
import { ItemContainer } from '@/components/item-container'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import { ICustomer, IUser } from '@/models'
import { useGetTasksByCustomerIdQuery } from '@/services/customers/taskService'
import { ApexOptions } from 'apexcharts'
import React, { useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  customerId: ICustomer['_id']
}

const CustomerPerformanceRadialChart: React.FC<IProps> = ({ customerId }) => {
  const [searchQueryParams, setSearchQueryParams] = useState({ ...emptyQueryParams, status: -9 })

  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTasksByCustomerIdQuery({
    ...searchQueryParams,
    customerId
  })

  const totalStepCount = useMemo(() => {
    if (customerTasksData) {
      return customerTasksData.reduce((acc, task) => acc + task.steps.length, 0)
    }
    return 0
  }, [customerTasksData])

  const postponePassedStepCount = useMemo(() => {
    if (customerTasksData) {
      return customerTasksData.reduce((acc, task) => {
        const passedStepCount = task.steps.filter(step => step.usedPostpone > step.postponeTime).length
        return acc + passedStepCount
      }, 0)
    }
    return 0
  }, [customerTasksData])

  const deadlinePassedStepCount = useMemo(() => {
    if (customerTasksData) {
      return customerTasksData.reduce((acc, task) => {
        const passedStepCount = task.steps.filter(step => {
          return Date.now() > step.endDate
        }).length

        return acc + passedStepCount
      }, 0)
    }
    return 0
  }, [customerTasksData])

  const durationPassedStepCount = useMemo(() => {
    if (customerTasksData) {
      return customerTasksData.reduce((acc, task) => {
        const passedStepCount = task.steps.filter(step => {
          const totalDuration = step.checklistItems.reduce((acc, item) => acc + item.duration, 0)
          return step.totalPassedTime > totalDuration
        }).length

        return acc + passedStepCount
      }, 0)
    }
    return 0
  }, [customerTasksData])

  const performancePercentage = useMemo(() => {
    if (totalStepCount === 0) {
      return 0
    }

    const totalPassedCount = postponePassedStepCount + deadlinePassedStepCount + durationPassedStepCount
    return Math.round((totalPassedCount / (totalStepCount * 3)) * 100)
  }, [totalStepCount, postponePassedStepCount, deadlinePassedStepCount, durationPassedStepCount])

  console.log(postponePassedStepCount, deadlinePassedStepCount, durationPassedStepCount)

  const chartOptions = useMemo<ApexOptions>(
    () => ({
      chart: {
        height: 220,
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          track: {
            strokeWidth: '66%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              show: false,
              fontSize: '16px',
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter: function (val) {
                return 'Performance'
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#f20000', '#f2f200'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: []
    }),
    [postponePassedStepCount, deadlinePassedStepCount, durationPassedStepCount]
  )

  return (
    <ItemContainer height="100%" transform="translate(0%, 7%)" position="relative" width="100%">
      <ReactApexChart options={chartOptions} series={[performancePercentage]} type="radialBar" height={220} />
    </ItemContainer>
  )
}

export default CustomerPerformanceRadialChart
