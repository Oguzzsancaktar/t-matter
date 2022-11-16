import React, { useState } from 'react'
import colors from '@constants/colors'
import ReactApexChart from 'react-apexcharts'

const HrLoginConditionDonutChart = () => {
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
  return (
    <div style={{ height: '100%' }}>
      <ReactApexChart options={options} series={series} type="donut" width={230} />
    </div>
  )
}

export default HrLoginConditionDonutChart
