import React, { useEffect, useState } from 'react'
import colors from '@constants/colors'
import ReactApexChart from 'react-apexcharts'
import { isExpireCondition, isPostponeCondition, isTimerCondition } from '@utils/taskUtil'

const TaskStepConditionDonutChart = ({ taskSteps }) => {
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
              label: 'Conditions',
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
  const [series, setSeries] = useState<ApexCharts.ApexOptions['series']>([1, 2])

  useEffect(() => {
    if (taskSteps) {
      const { timer, expire, postpone } = taskSteps.reduce(
        (acc, curr) => {
          if (isTimerCondition(curr)) {
            acc.timer++
          }
          if (isExpireCondition(curr)) {
            acc.expire++
          }
          if (isPostponeCondition(curr)) {
            acc.postpone++
          }
          return acc
        },
        { timer: 0, expire: 0, postpone: 0 }
      )
      setOptions({
        ...options,
        labels: ['timer', 'expire', 'postpone']
      })
      setSeries([timer, expire, postpone])
    }
  }, [taskSteps])

  return (
    <div style={{ height: '100%' }}>
      <ReactApexChart width="100%" options={options} series={series} type="donut" height={170} />
    </div>
  )
}

export default TaskStepConditionDonutChart
