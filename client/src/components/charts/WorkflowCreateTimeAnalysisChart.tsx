import React, { useMemo } from 'react'
import { ItemContainer } from '../item-container'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { initialColumnChartOptions } from '@/constants/initialValues'
import { useGetTaskCountForMonthsDataQuery } from '@/services/customers/taskService'

const WorkflowCreateTimeAnalysisChart = () => {
  const { data: taskCountForMonthsData } = useGetTaskCountForMonthsDataQuery()

  const chartSetup: { options: ApexOptions; series: any } = useMemo(() => {
    let monthlyAddedCounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    if (taskCountForMonthsData) {
      for (let obj of taskCountForMonthsData) {
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
  }, [taskCountForMonthsData, initialColumnChartOptions])

  return (
    <ItemContainer position="relative" height="200px">
      <ReactApexChart height={'100%'} options={chartSetup.options} series={chartSetup.series} type="bar" />
    </ItemContainer>
  )
}

export default WorkflowCreateTimeAnalysisChart
