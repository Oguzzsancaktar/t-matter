import React from 'react'
import ReactApexChart from 'react-apexcharts'
import colors from '@constants/colors'

const NonBillableCircleProgress = () => {
  const state = {
    series: [67],
    options: {
      chart: {
        height: 200,
        type: 'radialBar',
        offsetY: 0
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '12px',
              color: colors.text.primary,
              offsetY: 90
            },
            value: {
              offsetY: 50,
              fontSize: '22px',
              color: colors.text.primary,
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
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ['']
    }
  }

  return (
    <div id="chart">
      {/*// @ts-ignore*/}
      <ReactApexChart options={state.options} series={state.series} type="radialBar" height={200} />
    </div>
  )
}

export default NonBillableCircleProgress
