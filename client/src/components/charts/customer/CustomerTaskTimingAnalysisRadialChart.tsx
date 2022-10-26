import { ItemContainer } from '@/components/item-container'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ICustomer } from '@/models'
import { secondsToHourMin } from '@/utils/timeUtils'
import { ApexOptions } from 'apexcharts'
import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  chartData: { _id: ICustomer['_id']; totalDuration: number; totalPassedTime: number }[] | undefined
}

const CustomerTaskTimingAnalysisRadialChart: React.FC<IProps> = ({ chartData }) => {
  const totalPassedTime = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return 0
    }
    return chartData.reduce((acc, customer) => acc + customer.totalPassedTime, 0)
  }, [chartData])

  const chartPercentage = useMemo(() => {
    if (!chartData) {
      return 0
    }
    const totalDuration = chartData.reduce((prev, current) => prev + current.totalDuration, 0)

    return Math.round((totalPassedTime / totalDuration) * 100)
  }, [chartData])
  const chartOptions = useMemo<ApexOptions>(
    () => ({
      colors: [colors.green.primary],
      chart: {
        height: 220,
        type: 'radialBar'
      },
      plotOptions: {
        startAngle: -135,
        endAngle: 135,
        radialBar: {
          hollow: {
            size: '55%'
          }
        }
      },
      labels: ['Time Spent']
    }),
    [chartData]
  )

  return (
    <ItemContainer height="100%" transform="translate(0%, -0%)" position="relative">
      <ItemContainer position="absolute" top="50%" left="50%" transform="translate(-30px, 2px)">
        <H1 fontSize="0.8rem" color={colors.text.primary}>
          {secondsToHourMin(totalPassedTime, true)}
        </H1>
      </ItemContainer>
      <ReactApexChart options={chartOptions} series={[chartPercentage]} type="radialBar" height={220} />
    </ItemContainer>
  )
}

export default CustomerTaskTimingAnalysisRadialChart
