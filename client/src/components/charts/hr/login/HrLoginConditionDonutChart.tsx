import React, { useEffect, useState } from 'react'
import colors from '@constants/colors'
import ReactApexChart from 'react-apexcharts'
import { IUserLogResponse } from '@services/userLogService'
import { groupBy } from 'lodash'
import constantToLabel from '@utils/constantToLabel'
import { useTheme } from '@nextui-org/react'
import { HR_LOGIN_CONDITIONS_COLOR } from '@constants/hrLogin'

const HrLoginConditionDonutChart: React.FC<{ data?: IUserLogResponse }> = ({ data }) => {
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      width: 230,
      type: 'donut',
      offsetY: 0
    },
    labels: ['Good tracking', 'Poor tracking'],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: '85%',
          labels: {
            show: true,
            name: {
              offsetY: 10
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '18px',
              fontWeight: 500,
              label: 'Conditions',
              color: colors.text.primary,
              formatter: function (w) {
                return ''
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {},
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
            height: 150
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    noData: {
      text: 'No data',
      style: {
        color: colors.text.primary
      }
    }
  })
  const [series, setSeries] = useState<ApexCharts.ApexOptions['series']>([1, 2])
  const { theme } = useTheme()

  useEffect(() => {
    if (data) {
      const groups = groupBy(data.timeLogs, 'condition')
      const { series, labels, colors } = Object.keys(groups).reduce<{
        series: number[]
        labels: string[]
        colors: string[]
      }>(
        (acc, key) => {
          acc.labels.push(constantToLabel(key))
          acc.series.push(groups[key].length)
          acc.colors.push(HR_LOGIN_CONDITIONS_COLOR[key].hexCode)
          return acc
        },
        { series: [], labels: [], colors: [] }
      )
      setSeries(series)
      setOptions({ ...options, labels, colors })
    }
  }, [data])

  return (
    <div style={{ height: '100%' }}>
      <ReactApexChart options={options} series={series} type="donut" width={230} />
    </div>
  )
}

export default HrLoginConditionDonutChart
