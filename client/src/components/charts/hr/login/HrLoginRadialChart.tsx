import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const HrLoginRadialChart = () => {
  const [series, setSeries] = useState([60, 80])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      width: 280,
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
    colors: ['#7adad1', '#416fc7'],
    labels: ['Login', 'Tracking'],
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      position: 'left',
      offsetX: 0,
      offsetY: 0,
      labels: {
        useSeriesColors: true
      },
      markers: {
        // @ts-ignore
        size: 0
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
            show: true
          }
        }
      }
    ]
  })
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" width={280} />
    </div>
  )
}

export default HrLoginRadialChart
