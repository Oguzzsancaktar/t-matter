import { ItemContainer } from '@/components/item-container'
import colors from '@/constants/colors'
import { ICustomer } from '@/models'
import { ApexOptions } from 'apexcharts'
import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {}

const CustomerTaskTargetRadialChart: React.FC<IProps> = () => {
  const chartOptions = useMemo<ApexOptions>(
    () => ({
      colors: [colors.orange.primary],
      chart: {
        height: 200,
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          track: {
            strokeWidth: '20%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          hollow: {
            size: '80%'
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
              offsetY: 54,
              fontSize: '16px',
              color: undefined,
              formatter: function (val) {
                return 'Target'
              }
            }
          }
        }
      },
      fill: {
        type: ''
      },
      labels: ['Target'],
      stroke: {
        lineCap: 'round'
      }
    }),
    []
  )

  return (
    <ItemContainer height="100%" transform="translate(0%, 15%)">
      <ReactApexChart options={chartOptions} series={[79]} type="radialBar" height={200} />
    </ItemContainer>
  )
}

export default CustomerTaskTargetRadialChart
