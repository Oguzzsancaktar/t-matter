import React, { useEffect, useState } from 'react'
import colors from '@constants/colors'
import ReactApexChart from 'react-apexcharts'
import { useGetTaskStepsQuery } from '@services/customers/taskService'
import { groupBy } from 'lodash'

const TaskStepWorkFlowDonutChart = ({ dateRange }) => {
  const { data } = useGetTaskStepsQuery(dateRange)

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
        endAngle: 270,
        donut: {
          size: '85%',
          labels: {
            show: true,
            name: {
              offsetY: 10
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '22px',
              fontWeight: 500,
              label: 'Workflows',
              color: colors.text.primary,
              formatter: function (w) {
                return ''
              }
            }
          }
        }
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
      const groups = groupBy(data, 'name')
      const series = Object.keys(groups).map(key => groups[key].length)
      const labels = Object.keys(groups)
      setOptions({
        ...options,
        labels
      })
      setSeries(series)
    }
  }, [data])

  return (
    <div style={{ height: '100%' }}>
      <ReactApexChart width="100%" options={options} series={series} type="donut" height={170} />
    </div>
  )
}
export default TaskStepWorkFlowDonutChart
