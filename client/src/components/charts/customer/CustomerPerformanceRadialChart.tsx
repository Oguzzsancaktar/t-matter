import CircleImage from '@/components/image/CircleImage'
import { ItemContainer } from '@/components/item-container'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { IUser } from '@/models'
import { ApexOptions } from 'apexcharts'
import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  chartData: { _id: IUser['_id']; count: number; responsibleUser: IUser }[] | undefined
}
const CustomerPerformanceRadialChart: React.FC<IProps> = ({ chartData }) => {
  const mostUsedUser = useMemo(() => {
    if (!chartData) {
      return undefined
    }
    return chartData.reduce((prev, current) => (prev.count > current.count ? prev : current))
  }, [chartData])

  const total = useMemo(() => {
    if (!chartData) {
      return 0
    }
    return chartData.reduce((prev, current) => prev + current.count, 0)
  }, [chartData])

  const chartOptions = useMemo<ApexOptions>(
    () => ({
      chart: {
        height: 260,
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          track: {
            background: '#fff',
            strokeWidth: '66%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              show: false,
              fontSize: '16px',
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter: function (val) {
                return val + '%'
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#f20000', '#f2f200'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: []
    }),
    [chartData]
  )

  return (
    <ItemContainer height="100%" transform="translate(0%, 7%)" position="relative" width="100%">
      <ReactApexChart options={chartOptions} series={[67]} type="radialBar" height={260} />
    </ItemContainer>
  )
}

export default CustomerPerformanceRadialChart
