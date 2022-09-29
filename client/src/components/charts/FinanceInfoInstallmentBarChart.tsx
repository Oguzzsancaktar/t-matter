import React from 'react'
import { useGetInstallmentDashboardChartQuery } from '@services/settings/finance-planning/financePlanningService'
import colors from '@constants/colors'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  dateRange: {
    startDate: Date
    endDate: Date
  }
}

const FinanceInfoInstallmentBarChart: React.FC<IProps> = ({ dateRange }) => {
  const { data } = useGetInstallmentDashboardChartQuery({ ...dateRange })
  if (!data) return null

  const series: ApexAxisChartSeries = [
    {
      name: 'Paid',
      data: data?.map(item => {
        return {
          x: item._id,
          y: item.paidAmount
        }
      })
    },
    {
      name: 'Unpaid',
      data: data?.map(item => {
        return {
          x: item._id,
          y: item.unpaidAmount
        }
      })
    }
  ]

  const config: ApexCharts.ApexOptions = {
    colors: [colors.green.primary, colors.red.primary],
    chart: {
      type: 'bar',
      height: 230,
      events: {
        dataPointSelection: (event, chartContext, config) => {
          // onSelectBar(config.w.config.series[config.seriesIndex].data[config.dataPointIndex])
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
      type: 'datetime'
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

export default FinanceInfoInstallmentBarChart
