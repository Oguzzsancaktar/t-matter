import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const HrDashboardLoginRadialChart = () => {
  const [series, setSeries] = useState([60, 80])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 200,
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
    colors: ['#1ab7ea', '#0084ff'],
    labels: ['Login', 'Tracking'],
    legend: {
      show: true,
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
      <ReactApexChart options={options} series={series} type="radialBar" height={200} />
    </div>
  )
}

export default HrDashboardLoginRadialChart
