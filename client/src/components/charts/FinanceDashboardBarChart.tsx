import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useGetInstallmentDashboardChartQuery } from '@services/settings/finance-planning/financePlanningService'
import { PERIODS } from '@constants/dates'
import moment from 'moment'
import colors from '@constants/colors'

interface IProps {
  onSelectBar: (date: string) => void
}

const FinanceDashboardBarChart: React.FC<IProps> = ({ onSelectBar }) => {
  const { data } = useGetInstallmentDashboardChartQuery({ period: PERIODS.WEEKLY })

  if (!data) return null

  const fillSeriesWithWeekDays = (series: { x: string; y: number }[]) => {
    if (series.length < 7) {
      return Array.from(new Array(7)).reduce((acc, day, index) => {
        const date = moment().startOf('isoWeek').add(index, 'days').format('YYYY-MM-DD')
        const serie = series.find(serie => serie.x === date)
        if (!serie) {
          acc[index] = { x: date, y: 0 }
          return acc
        }
        acc[index] = serie
        return acc
      }, [])
    }
    return series
  }

  const series: ApexAxisChartSeries = [
    {
      name: 'Paid',
      data: fillSeriesWithWeekDays(
        data?.map(item => {
          return {
            x: item._id,
            y: item.paidAmount
          }
        })
      )
    },
    {
      name: 'Unpaid',
      data: fillSeriesWithWeekDays(
        data?.map(item => {
          return {
            x: item._id,
            y: item.unpaidAmount
          }
        })
      )
    }
  ]

  const config: ApexCharts.ApexOptions = {
    colors: [colors.green.primary, colors.red.primary],
    chart: {
      type: 'bar',
      height: 230,
      events: {
        dataPointSelection: (event, chartContext, config) => {
          onSelectBar(config.w.config.series[config.seriesIndex].data[config.dataPointIndex]?.x)
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 10,
      colors: ['transparent']
    },
    xaxis: {
      // type: 'datetime',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
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
    }
  }

  return (
    <div style={{ height: '100%' }} id="chart">
      <ReactApexChart options={config} series={series} type="bar" height={'100%'} />
    </div>
  )
}

export default FinanceDashboardBarChart
