import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const HrDashboardMentalRadialChart = () => {
  const [series, setSeries] = useState([40, 94])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      width: 194,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    colors: ['#3b4b8d', '#ca5b5b'],
    labels: ['Login', 'Tracking'],
    legend: {
      show: false,
      floating: true,
      fontSize: '16px',
      position: 'left',
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true
      },
      formatter: function (seriesName, opts) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
      },
      itemMargin: {
        vertical: 3
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }
    ]
  })
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" width={194} />
    </div>
  )
}

export default HrDashboardMentalRadialChart
