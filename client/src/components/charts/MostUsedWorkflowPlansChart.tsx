import React, { useMemo } from 'react'
import { ItemContainer } from '../item-container'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { initialDonutChartOptions, initialWorkflow } from '@/constants/initialValues'
import CircleImage from '../image/CircleImage'
import { IUsedTaskAnalysisData } from '@/models'
import ReactTooltip from 'react-tooltip'
import { H1 } from '../texts'
import colors from '@/constants/colors'
import { useGetUsedTaskWorkflowCountsQuery } from '@/services/customers/taskService'

const MostUsedWorkflowPlansChart = () => {
  const { data: taskUsedWorkflowData } = useGetUsedTaskWorkflowCountsQuery()

  const findMostUsedWorkflow = (): IUsedTaskAnalysisData & { total: number } => {
    let biggest = 0
    let mostUsedWorkflowData: IUsedTaskAnalysisData & { total: number } = {
      _id: '',
      count: 0,
      workflow: { ...initialWorkflow },
      total: 0
    }
    if (taskUsedWorkflowData) {
      for (var i = 0; i < taskUsedWorkflowData.length; i++) {
        if (taskUsedWorkflowData[i].count > biggest) {
          biggest = taskUsedWorkflowData[i].count
          mostUsedWorkflowData = { ...mostUsedWorkflowData, ...taskUsedWorkflowData[i] }
        }
        mostUsedWorkflowData.total = mostUsedWorkflowData.total + taskUsedWorkflowData[i].count
      }
    }

    return mostUsedWorkflowData
  }

  const chartSetup: { options: ApexOptions; series: ApexNonAxisChartSeries } = useMemo(() => {
    return {
      options: {
        ...initialDonutChartOptions,
        labels: taskUsedWorkflowData?.map(data => data.workflow.name),
        plotOptions: {
          ...initialDonutChartOptions.plotOptions,
          pie: {
            ...initialDonutChartOptions.plotOptions?.pie,
            donut: {
              ...initialDonutChartOptions.plotOptions?.pie?.donut,
              name: {
                offsetY: 10
              },
              labels: {
                show: true,
                total: {
                  label: findMostUsedWorkflow().workflow.name,
                  show: true,
                  showAlways: true,
                  fontSize: '12px',
                  fontWeight: 200,
                  color: colors.text.primary,
                  offsetY: '200px', // -8 worked for me
                  formatter: function (w) {
                    return ((findMostUsedWorkflow().count / findMostUsedWorkflow().total) * 100).toFixed(2) + '%'
                  }
                }
              }
            }
          }
        }
      },
      series: taskUsedWorkflowData?.map(data => data.count) || []
    }
  }, [taskUsedWorkflowData, initialDonutChartOptions])

  return (
    <ItemContainer position="relative" height="200px">
      <ReactApexChart height={'100%'} options={chartSetup.options} series={chartSetup.series} type="donut" />
    </ItemContainer>
  )
}

export default MostUsedWorkflowPlansChart
