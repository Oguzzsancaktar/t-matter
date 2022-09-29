import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import colors from '@constants/colors'
import {
  useGetInstallmentsQuery,
  useLazyGetInstallmentsQuery
} from '@services/settings/finance-planning/financePlanningService'
import { PAYMENT_METHODS } from '@constants/finance'

interface IProps {
  dateRange: {
    startDate: Date
    endDate: Date
  }
}

const FinanceInfoPaidTypeDonutChart: React.FC<IProps> = ({ dateRange }) => {
  const { data, isLoading } = useGetInstallmentsQuery({ ...dateRange, invoice: undefined })

  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 160,
      width: 160,
      type: 'donut',
      offsetY: 0
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {},
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
            height: 150
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    noData: {
      text: 'No data',
      style: {
        color: colors.text.primary
      }
    }
  })
  const [series, setSeries] = useState<ApexCharts.ApexOptions['series']>([])

  useEffect(() => {
    if (data) {
      const { series: s, labels } = Object.keys(PAYMENT_METHODS).reduce<{ series: number[]; labels: string[] }>(
        (acc, key) => {
          acc.labels.push(key)
          acc.series.push(data.filter(d => d.paidMethod === key).length)
          return acc
        },
        {
          series: [],
          labels: []
        }
      )
      setSeries(s)
      setOptions({
        ...options,
        labels
      })
    }
  }, [data])

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <span style={{ position: 'absolute', left: 'calc(50% - 24px)', top: 'calc(50% - 24px)' }}>Method</span>
      <ReactApexChart width={200} options={options} series={series} type="donut" height={'100%'} />
    </div>
  )
}

export default FinanceInfoPaidTypeDonutChart
