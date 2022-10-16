import React, { useEffect, useState } from 'react'
import colors from '@constants/colors'
import { groupBy } from 'lodash'
import ReactApexChart from 'react-apexcharts'
import { IUser } from '@/models'

const TaskStepUsers = ({ taskSteps }) => {
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
              label: 'Users',
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
    if (taskSteps) {
      console.log('taskSteps', taskSteps)
      const groups = groupBy(taskSteps, 'steps.responsibleUser._id')
      const series = Object.keys(groups).map(key => groups[key].length)
      const labels = Object.keys(groups).map(id => {
        let user: IUser | undefined = undefined
        if (groups[id]) {
          user = groups[id][0]?.steps.responsibleUser
        }
        if (!user) {
          return 'No added'
        }
        return user.firstname + ' ' + user.lastname
      })
      setOptions({
        ...options,
        labels
      })
      setSeries(series)
    }
  }, [taskSteps])

  return (
    <div style={{ height: '100%' }}>
      <ReactApexChart width="100%" options={options} series={series} type="donut" height={170} />
    </div>
  )
}

export default TaskStepUsers
