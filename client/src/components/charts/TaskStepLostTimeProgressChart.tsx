import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import colors from '@constants/colors'
import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import { getTaskStepTotalTime, getTaskStepTotalWorkingTime } from '@utils/taskUtil'

const TaskStepLostTimeProgressChart: React.FC<{ taskSteps: ITaskStep[] }> = ({ taskSteps }) => {
  const [series, setSeries] = useState([0])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 350,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%'
        },
        dataLabels: {
          name: {
            show: true,
            color: colors.text.primary,
            fontWeight: 500,
            fontSize: '22px'
          },
          value: {
            show: true,
            color: colors.text.primary,
            fontWeight: 500,
            fontSize: '22px',
            offsetY: 5
          }
        }
      }
    },
    labels: ['Lost Time'],
    tooltip: {
      enabled: true,
      y: {
        formatter(val: number, opts?: any): string {
          return '' + val
        }
      }
    }
  })

  useEffect(() => {
    if (taskSteps) {
      const workingHours =
        taskSteps.reduce((acc, curr) => {
          return acc + getTaskStepTotalWorkingTime(curr)
        }, 0) / 60
      const totalTime =
        taskSteps.reduce((acc, curr) => {
          return acc + getTaskStepTotalTime(curr)
        }, 0) / 60
      const percentage = +Math.ceil((workingHours / totalTime) * 100)
      setSeries([percentage])
    }
  }, [taskSteps])

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactApexChart options={options} series={series} type="radialBar" width={'100%'} height={200} />
    </div>
  )
}

export default TaskStepLostTimeProgressChart
