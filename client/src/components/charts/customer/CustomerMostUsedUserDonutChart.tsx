import CircleImage from '@/components/image/CircleImage'
import { ItemContainer } from '@/components/item-container'
import { NoTableData } from '@/components/no-table-data'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { IUser } from '@/models'
import { ApexOptions } from 'apexcharts'
import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  chartData: { _id: IUser['_id']; count: number; responsibleUser: IUser }[] | undefined
}
const CustomerMostUsedUserDonutChart: React.FC<IProps> = ({ chartData }) => {
  const mostUsedUser = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return undefined
    }
    return chartData?.reduce((prev, current) => (prev.count > current.count ? prev : current))
  }, [chartData])

  const total = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return 0
    }
    return chartData?.reduce((prev, current) => prev + current.count, 0)
  }, [chartData])

  const chartOptions = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: 'donut',
        height: 170,
        toolbar: {
          show: false
        }
      },
      labels: chartData?.map(item => item.responsibleUser.firstname + ' ' + item.responsibleUser.lastname),
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85%'
          }
        }
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }),
    [chartData]
  )

  const chartSeries = useMemo(() => chartData?.map(item => item.count), [chartData])

  console.log(chartSeries)
  return (
    <ItemContainer height="100%" transform="translate(0%, 15%)" position="relative" width="100%">
      {chartSeries && chartOptions && chartSeries?.length !== 0 && (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries.length !== 0 ? chartSeries : [0]}
          type="donut"
          height={170}
        />
      )}

      {chartSeries?.length === 0 && (
        <ItemContainer height="50%" transform="translateY(15%)">
          <NoTableData />
        </ItemContainer>
      )}

      {mostUsedUser && (
        <ItemContainer position="absolute" top="50%" left="50%" transform="translate(-50%, -80%)" width="auto">
          <CircleImage
            imageUrl={mostUsedUser?.responsibleUser.profile_img || ''}
            width="40px"
            height="40px"
            margin="auto"
          />
          <H1 color={colors.text.primary} margin="0.25rem 0" fontSize="0.8rem" textAlign="center">
            User
          </H1>
        </ItemContainer>
      )}
    </ItemContainer>
  )
}

export default CustomerMostUsedUserDonutChart
