import React, { useEffect, useState } from 'react'
import {
  useGetInstallmentDashboardChartQuery,
  useLazyGetInstallmentDashboardChartQuery
} from '@services/settings/finance-planning/financePlanningService'
import colors from '@constants/colors'
import ReactApexChart from 'react-apexcharts'
import { PERIODS } from '@constants/dates'
import moment from 'moment'

interface IProps {
  dateRange: {
    startDate: Date
    endDate: Date
  }
}

const FinanceInfoInstallmentBarChart: React.FC<IProps> = ({ dateRange }) => {
  const [fetch, { data }] = useLazyGetInstallmentDashboardChartQuery()
  const [series, setSeries] = useState<ApexAxisChartSeries>([
    {
      name: 'Paid',
      data: []
    },
    {
      name: 'Unpaid',
      data: []
    }
  ])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    colors: [colors.green.primary, colors.red.primary],
    chart: {
      type: 'bar',
      height: 230,
      events: {
        dataPointSelection: (event, chartContext, config) => {
          // onSelectBar(config.w.config.series[config.seriesIndex].data[config.dataPointIndex])
        }
      },
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 2
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false
    },
    xaxis: {},
    yaxis: {
      show: false
    },
    fill: {
      opacity: 0.9
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val
        }
      }
    },
    legend: {
      show: false
    }
  })

  useEffect(() => {
    if (data) {
      if (moment(dateRange.startDate).year() === moment(dateRange.endDate).year()) {
        const months = Array.from({ length: 12 }, (_, i) => i)
        const { paid, unpaid } = months.reduce<{ paid: number[]; unpaid: number[] }>(
          (acc, curr) => {
            const x = data.find(d => moment(d._id).month() === curr)
            if (x) {
              acc.paid.push(x.paidAmount)
              acc.unpaid.push(x.unpaidAmount)
              return acc
            }
            acc.paid.push(0)
            acc.unpaid.push(0)
            return acc
          },
          { paid: [], unpaid: [] }
        )
        setSeries([
          { ...series[0], data: paid },
          { ...series[1], data: unpaid }
        ])
        setOptions({
          ...options,
          xaxis: {
            categories: months.map(m => moment().month(m).format('MMM'))
          },
          labels: months.map(m => moment().month(m).format('MMM'))
        })
      } else {
        const year = moment().year()
        const years = [year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3]
        const { paid, unpaid } = years.reduce<{ paid: number[]; unpaid: number[] }>(
          (acc, curr) => {
            const x = data.find(d => moment(d._id).year() === curr)
            if (x) {
              acc.paid.push(x.paidAmount)
              acc.unpaid.push(x.unpaidAmount)
              return acc
            }
            acc.paid.push(0)
            acc.unpaid.push(0)
            return acc
          },
          { paid: [], unpaid: [] }
        )
        setSeries([
          { ...series[0], data: paid },
          { ...series[1], data: unpaid }
        ])
        setOptions({
          ...options,
          xaxis: {
            ...options.xaxis,
            categories: years
          },
          labels: years.map(y => y.toString())
        })
      }
      return
    }
    if (moment(dateRange.startDate).year() === moment(dateRange.endDate).year()) {
      fetch({ ...dateRange, period: PERIODS.MONTHLY })
    } else {
      fetch({ ...dateRange, period: PERIODS.YEARLY })
    }
  }, [dateRange, data])

  if (!data) return null

  return (
    <div style={{ height: '100%', width: '100%' }} id="chart">
      <ReactApexChart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
    </div>
  )
}

export default FinanceInfoInstallmentBarChart
