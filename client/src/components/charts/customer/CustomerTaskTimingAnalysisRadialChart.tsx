import { ItemContainer } from '@/components/item-container'
import { NoTableData } from '@/components/no-table-data'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ICustomer } from '@/models'
import { secondsToHourMin } from '@/utils/timeUtils'
import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  chartData: { _id: ICustomer['_id']; totalDuration: number; totalPassedTime: number }[] | undefined
}

const CustomerTaskTimingAnalysisRadialChart: React.FC<IProps> = ({ chartData }) => {
  const taskTotalPassedTime = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return 0
    }
    return chartData.reduce((acc, customer) => acc + customer.totalPassedTime, 0)
  }, [chartData])

  const taskTotaşDuration = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return 0
    }
    return chartData.reduce((acc, customer) => acc + customer.totalDuration, 0)
  }, [chartData])

  const chartPercentage = useMemo(() => {
    if (!chartData) {
      return 0
    }

    const totalDuration = chartData.reduce((prev, current) => prev + current.totalDuration, 0)
    const totalPassedTime = chartData.reduce((prev, current) => prev + current.totalPassedTime, 0)

    return (totalPassedTime / totalDuration) * 100
  }, [chartData])

  const chartOptions: any = {
    colors: [colors.green.thirth],
    chart: {
      height: 220,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,

        hollow: {
          size: '55%'
        },

        track: {
          background: '#E8EDF0',
          startAngle: -135,
          endAngle: 135
        },

        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '16px',
            fontFamily: undefined,
            fontWeight: 500,
            color: colors.text.primary,
            offsetY: 60
          },
          value: {
            show: true,
            fontSize: '20px',
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
      },
      legend: {
        show: false
      }
    },

    stroke: {
      lineCap: 'round'
    },
    labels: ['Time'],

    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: () => {
        return (
          '<div class="timer__chart__tooltip">' +
          secondsToHourMin(taskTotaşDuration - taskTotalPassedTime, true) +
          '</div>'
        )
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
  }

  return (
    <ItemContainer height="100%" transform="translate(0%, 3%)" position="relative">
      {chartData && chartData?.length !== 0 && (
        <ItemContainer position="absolute" top="50%" left="50%" transform="translate(-30px, 5px)">
          <H1 fontSize="14px" color={colors.text.primary}>
            {secondsToHourMin(taskTotaşDuration, true)}
          </H1>
        </ItemContainer>
      )}

      {chartData && chartData?.length !== 0 && (
        <ReactApexChart options={chartOptions} series={[100 - chartPercentage]} type="radialBar" height={220} />
      )}

      {chartData?.length === 0 && (
        <ItemContainer height="50%" transform="translateY(35%)">
          <NoTableData />
        </ItemContainer>
      )}
    </ItemContainer>
  )
}

export default CustomerTaskTimingAnalysisRadialChart
