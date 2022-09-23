import React, { useMemo } from 'react'
import { ItemContainer } from '../item-container'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { initialColumnChartOptions } from '@/constants/initialValues'
import { useGetWorkflowCountForMonthsDataQuery } from '@/services/settings/workflow-planning/workflowService'

const WorkflowCreateTimeAnalysisChart = () => {
  const { data: workflowCountForMonthsData } = useGetWorkflowCountForMonthsDataQuery()
  console.log(workflowCountForMonthsData)
  const chartSetup: { options: ApexOptions; series: any } = useMemo(() => {
    let monthlyAddedCounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    if (workflowCountForMonthsData) {
      for (let obj of workflowCountForMonthsData) {
        monthlyAddedCounts[+obj?._id - 1] = obj.count
      }
    }

    return {
      options: {
        ...initialColumnChartOptions
      },
      series: [
        {
          name: 'Count ',
          data: monthlyAddedCounts
        }
      ]
    }
  }, [workflowCountForMonthsData, initialColumnChartOptions])

  return (
    <ItemContainer position="relative" height="200px">
      <ReactApexChart height={'100%'} options={chartSetup.options} series={chartSetup.series} type="bar" />
    </ItemContainer>
  )
}

export default WorkflowCreateTimeAnalysisChart
