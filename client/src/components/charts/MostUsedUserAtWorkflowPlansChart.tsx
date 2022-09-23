import React, { useMemo } from 'react'
import { useGetWorkflowPlanUsedUserDataQuery } from '@/services/settings/workflow-planning/workflowService'
import { ItemContainer } from '../item-container'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { initialDonutChartOptions, initialUser } from '@/constants/initialValues'
import CircleImage from '../image/CircleImage'
import { IUser } from '@/models'
import ReactTooltip from 'react-tooltip'
import { H1 } from '../texts'
import colors from '@/constants/colors'

const MostUsedUserAtWorkflowPlansChart = () => {
  const { data: workflowPlanUsedUserData } = useGetWorkflowPlanUsedUserDataQuery()

  const findMostUsedUser = (): { _id: IUser['_id']; user: IUser; count: number; total: number } => {
    let biggest = 0
    let mostUsedUserData: { _id: IUser['_id']; user: IUser; count: number; total: number } = {
      _id: '',
      count: 0,
      user: { ...initialUser },
      total: 0
    }
    if (workflowPlanUsedUserData) {
      for (var i = 0; i < workflowPlanUsedUserData.length; i++) {
        if (workflowPlanUsedUserData[i].count > biggest) {
          biggest = workflowPlanUsedUserData[i].count
          mostUsedUserData = { ...mostUsedUserData, ...workflowPlanUsedUserData[i] }
        }
        mostUsedUserData.total = mostUsedUserData.total + workflowPlanUsedUserData[i].count
      }
    }
    ReactTooltip.rebuild()

    return mostUsedUserData
  }

  const chartSetup: { options: ApexOptions; series: ApexNonAxisChartSeries } = useMemo(() => {
    return {
      options: {
        ...initialDonutChartOptions,
        labels: workflowPlanUsedUserData?.map(data => data.user.firstname + ' ' + data.user.lastname)
      },
      series: workflowPlanUsedUserData?.map(data => data.count) || []
    }
  }, [workflowPlanUsedUserData])

  return (
    <ItemContainer position="relative" height="200px">
      <ItemContainer
        width="50px"
        height="50px"
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%,-65%)"
        data-tip={findMostUsedUser().user.firstname + ' ' + findMostUsedUser().user.lastname}
        zIndex="999999"
      >
        <CircleImage imageUrl={findMostUsedUser().user.profile_img || ''} />
        <H1 color={colors.text.primary} margin="0.25rem 0">
          {((findMostUsedUser().count / findMostUsedUser().total) * 100).toFixed(2)}%{' '}
        </H1>
      </ItemContainer>
      <ReactApexChart height={'100%'} options={chartSetup.options} series={chartSetup.series} type="donut" />
    </ItemContainer>
  )
}

export default MostUsedUserAtWorkflowPlansChart
