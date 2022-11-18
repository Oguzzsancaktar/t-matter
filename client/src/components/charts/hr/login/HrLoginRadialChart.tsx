import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { IUserLogResponse } from '@services/userLogService'

const HrLoginRadialChart: React.FC<{ data?: IUserLogResponse; isSmall?: boolean }> = ({ data, isSmall }) => {
  const [series, setSeries] = useState([0, 0])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      width: isSmall ? 210 : 280,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 15,
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
      fontSize: isSmall ? '11px' : '13px',
      position: 'left',
      offsetX: isSmall ? -24 : 0,
      offsetY: isSmall ? -18 : 1,
      labels: {
        useSeriesColors: true
      },
      markers: {
        height: 8,
        width: 8
      },
      formatter: function (seriesName, opts) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex] + '%'
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

  useEffect(() => {
    if (!data) {
      return
    }
    const x = data?.timeLogs.reduce(
      (acc, curr) => {
        acc.totalTime = acc.totalTime + curr.totalTime
        acc.trackingTime = acc.trackingTime + curr.trackingTime
        return acc
      },
      { totalTime: 0, trackingTime: 0 }
    )
    const time = x?.totalTime || 0
    const trackingTime = x?.trackingTime || 0

    setSeries([
      +Number((time / data?.loginTotalTime) * 100).toFixed(1),
      +Number((trackingTime / data?.trackingTotalTime) * 100).toFixed(1)
    ])
  }, [data])

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" width={isSmall ? 210 : 280} />
    </div>
  )
}

export default HrLoginRadialChart
