import { useLazyGetTaskStepsQuery } from '@services/customers/taskService'
import React, { useEffect, useState } from 'react'
import colors from '@constants/colors'
import ReactApexChart from 'react-apexcharts'
import moment from 'moment/moment'
import { groupBy } from 'lodash'
import {
  filterCancelledTaskSteps,
  filterCompletedTaskSteps,
  filterNewTaskSteps,
  filterTaskStepsByConditions
} from '@utils/taskUtil'

const TaskStepYearlyCountBarChart = ({ taskSteps, dateRange, onSelectBar }) => {
  const [series, setSeries] = useState<ApexAxisChartSeries>([
    {
      name: 'Condition Tasks',
      data: []
    },
    {
      name: 'New Tasks',
      data: []
    },
    {
      name: 'Completed Tasks',
      data: []
    },
    {
      name: 'Cancelled Tasks',
      data: []
    }
  ])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    colors: [colors.orange.primary, colors.blue.primary, colors.green.primary, colors.red.primary],
    chart: {
      type: 'bar',
      height: 230,
      events: {
        dataPointSelection: (event, chartContext, config) => {
          onSelectBar(config.dataPointIndex)
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
          return '' + val
        }
      }
    },
    legend: {
      show: false
    }
  })

  useEffect(() => {
    if (taskSteps) {
      if (moment(dateRange.startDate).year() === moment(dateRange.endDate).year()) {
        const months = Array.from({ length: 12 }, (_, i) => i)
        const groupedByMonth = groupBy(taskSteps, item => moment(item.steps.startDate).month())
        const { newTasks, completedTasks, cancelledTasks, conditionTasks } = months.reduce<{
          newTasks: number[]
          completedTasks: number[]
          cancelledTasks: number[]
          conditionTasks: number[]
        }>(
          (acc, month) => {
            const tasks = groupedByMonth[month] || []
            acc.newTasks.push(filterNewTaskSteps(tasks).length)
            acc.completedTasks.push(filterCompletedTaskSteps(tasks).length)
            acc.cancelledTasks.push(filterCancelledTaskSteps(tasks).length)
            acc.conditionTasks.push(filterTaskStepsByConditions(tasks).length)
            return acc
          },
          {
            newTasks: [],
            completedTasks: [],
            cancelledTasks: [],
            conditionTasks: []
          }
        )
        setOptions({
          ...options,
          xaxis: {
            categories: months.map(m => moment().month(m).format('MMM'))
          },
          labels: months.map(m => moment().month(m).format('MMM'))
        })
        setSeries([
          {
            name: 'Condition Tasks',
            data: conditionTasks
          },
          {
            name: 'New Tasks',
            data: newTasks
          },
          {
            name: 'Completed Tasks',
            data: completedTasks
          },
          {
            name: 'Cancelled Tasks',
            data: cancelledTasks
          }
        ])
      } else {
        const year = moment().year()
        const years = [year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3]
        const groupedByYear = groupBy(taskSteps, item => moment(item.steps.startDate).year())
        const { newTasks, completedTasks, cancelledTasks, conditionTasks } = years.reduce<{
          newTasks: number[]
          completedTasks: number[]
          cancelledTasks: number[]
          conditionTasks: number[]
        }>(
          (acc, curr) => {
            const tasks = groupedByYear[curr] || []
            acc.newTasks.push(filterNewTaskSteps(tasks).length)
            acc.completedTasks.push(filterCompletedTaskSteps(tasks).length)
            acc.cancelledTasks.push(filterCancelledTaskSteps(tasks).length)
            acc.conditionTasks.push(filterTaskStepsByConditions(tasks).length)
            return acc
          },
          {
            newTasks: [],
            completedTasks: [],
            cancelledTasks: [],
            conditionTasks: []
          }
        )
        setSeries([
          {
            name: 'Condition Tasks',
            data: conditionTasks
          },
          {
            name: 'New Tasks',
            data: newTasks
          },
          {
            name: 'Completed Tasks',
            data: completedTasks
          },
          {
            name: 'Cancelled Tasks',
            data: cancelledTasks
          }
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
    }
  }, [taskSteps, dateRange])

  if (!taskSteps) return null

  return (
    <div style={{ height: '100%', width: '100%' }} id="chart">
      <ReactApexChart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
    </div>
  )
}

export default TaskStepYearlyCountBarChart
