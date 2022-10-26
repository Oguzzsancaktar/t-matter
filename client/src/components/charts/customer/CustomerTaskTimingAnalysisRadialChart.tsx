import { ItemContainer } from '@/components/item-container'
import { ICustomer } from '@/models'
import { ApexOptions } from 'apexcharts'
import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  chartData: { _id: ICustomer['_id']; totalDuration: number; totalPassedTime: number }[] | undefined
}

const CustomerTaskTimingAnalysisRadialChart: React.FC<IProps> = ({ chartData }) => {
  const chartPercentage = useMemo(() => {
    if (!chartData) {
      return 0
    }
    const totalDuration = chartData.reduce((prev, current) => prev + current.totalDuration, 0)
    const totalPassedTime = chartData.reduce((prev, current) => prev + current.totalPassedTime, 0)

    return Math.round((totalPassedTime / totalDuration) * 100)
  }, [chartData])
  const chartOptions = useMemo<ApexOptions>(
    () => ({
      chart: {
        height: 220,
        type: 'radialBar'
      },
      plotOptions: {
        startAngle: -135,
        endAngle: 135,
        radialBar: {
          hollow: {
            size: '50%'
          }
        }
      },
      labels: ['Time Spent']
    }),
    [chartData]
  )

  return (
    <ItemContainer height="100%" transform="translate(0%, -0%)">
      <ReactApexChart options={chartOptions} series={[chartPercentage]} type="radialBar" height={220} />
    </ItemContainer>
  )
}

export default CustomerTaskTimingAnalysisRadialChart
