import CircleImage from '@/components/image/CircleImage'
import { ItemContainer } from '@/components/item-container'
import { NoTableData } from '@/components/no-table-data'
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
            strokeWidth: '100%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            },

            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + '%'
              }
            }
          },

          hollow: {
            size: '60%',
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + '%'
              }
            }
          },
          startAngle: -125,
          endAngle: 125,
          // dataLabels: {
          //   name: {
          //     show: false,
          //     fontSize: '16px',
          //     color: undefined,
          //     offsetY: 120
          //   },
          //   value: {
          //     offsetY: 50,
          //     fontSize: '12px',
          //     color: undefined,
          //     formatter: function (val) {
          //       return 'Conditions'
          //     }
          //   }
          // },
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: undefined,
              fontWeight: 500,
              color: colors.text.primary,
              offsetY: 55
            },
            value: {
              show: true,
              fontSize: '1.3rem',
              fontFamily: undefined,
              fontWeight: 400,
              color: colors.gray.disabled,
              offsetY: -15,
              formatter: function (val) {
                return val.toFixed(1) + '%'
              }
            },
            total: {
              show: false,
              label: 'Total',
              color: '#373d3f',
              fontSize: '16px',
              fontFamily: undefined,
              fontWeight: 600,
              formatter: function (w) {
                return 'test'
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
      labels: ['Performance'],
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: () => {
          return `
          <div class="customer__task__performance__chart__tooltip"> 
            <div class="tooltip__layout">
              <div class="tooltip__layout__item">
                <h1>Postpone Passed : </h1>
                <h1>${postponePassedStepCount}</h1>
              </div>

              <div class="tooltip__layout__item">
                <h1>Deadline Passed : </h1>
                <h1>${deadlinePassedStepCount}</h1>
              </div>

              <div class="tooltip__layout__item">
                <h1>Duration Passed : </h1>
                <h1>${durationPassedStepCount}</h1>
              </div>
            </div>
          </div > `
        },
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        onDatasetHover: {
          highlightDataSeries: false
        },
        x: {
          show: true,
          format: 'dd MMM',
          formatter: undefined
        },
        y: {
          show: false,
          formatter: undefined,
          title: {
            formatter: seriesName => seriesName
          }
        },
        z: {
          show: false,
          formatter: undefined,
          title: 'Size: '
        },
        marker: {
          show: true
        },

        fixed: {
          enabled: false,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0
        }
      }
    }),
    [postponePassedStepCount, deadlinePassedStepCount, durationPassedStepCount]
  )

  const chartPerformance = useMemo(() => {
    if (100 - performancePercentage > 75) {
      return 1
    } else {
      if (100 - performancePercentage > 50) {
        return 2
      } else {
        if (100 - performancePercentage > 25) {
          return 3
        } else {
          return 4
        }
      }
    }
  }, [performancePercentage])

  return (
    <ItemContainer height="100%" transform="translate(0%, 5%)" position="relative" width="100%">
      <ItemContainer position="absolute" top="50%" left="50%" transform="translate(-50%, 5px)" width="80px">
        {/* <H1 fontSize="1.8rem" color={colors.text.primary} width="80px" margin="auto" textAlign="center">
          {100 - performancePercentage}%
        </H1> */}
        <H1
          width="100%"
          textAlign="center"
          fontSize="0.8rem"
          color={
            chartPerformance === 1
              ? colors.green.primary
              : chartPerformance === 2
              ? colors.blue.primary
              : chartPerformance === 3
              ? colors.orange.primary
              : colors.red.primary
          }
        >
          {chartPerformance === 1
            ? 'Excelent'
            : chartPerformance === 2
            ? 'Good'
            : chartPerformance === 3
            ? 'Normal'
            : 'Bad'}
        </H1>
      </ItemContainer>
      {customerTasksData && customerTasksData?.length !== 0 && (
        <ReactApexChart options={chartOptions} series={[100 - performancePercentage]} type="radialBar" height={220} />
      )}

      {customerTasksData?.length === 0 && (
        <ItemContainer height="100%" transform="translateY(-5%)">
          <NoTableData />
        </ItemContainer>
      )}
    </ItemContainer>
  )
}

export default CustomerPerformanceRadialChart
