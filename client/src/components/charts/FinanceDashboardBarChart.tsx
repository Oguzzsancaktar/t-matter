import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useGetInstallmentDashboardChartQuery } from '@services/settings/finance-planning/financePlanningService'

interface IProps {
  onSelectBar: (date: string) => void
}

const FinanceDashboardBarChart: React.FC<IProps> = ({ onSelectBar }) => {
  const { data } = useGetInstallmentDashboardChartQuery()

  if (!data) return null

  const series: ApexAxisChartSeries = [
    {
      name: 'Paid',
      data: data?.map(item => {
        return {
          x: item._id,
          y: item.paidAmount,
          goals: [
            {
              name: 'Total',
              value: item.totalAmount,
              strokeHeight: 3,
              strokeColor: '#775DD0'
            }
          ]
        }
      })
    }
  ]

  const config: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 205,
      events: {
        dataPointSelection: (event, chartContext, config) => {
          onSelectBar(data[config.dataPointIndex]._id)
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
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
      type: 'datetime',
      categories: data.map(i => i._id)
    },
    yaxis: {
      title: {
        text: '$ total'
      }
    },
    fill: {
      opacity: 1
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
    <div id="chart">
      <ReactApexChart options={config} series={series} type="bar" height={300} />
    </div>
  )
}

export default FinanceDashboardBarChart
