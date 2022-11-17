import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import moment from 'moment'
import { IUserLogResponse } from '@services/userLogService'
import { groupBy } from 'lodash'

interface IProps {
  dateRange: {
    startDate: Date
    endDate: Date
  }
  data?: IUserLogResponse
}

const HrLoginBarChart: React.FC<IProps> = ({ dateRange, data }) => {
  const [series, setSeries] = useState([
    {
      name: 'Login',
      data: [44, 55, 41, 67, 22, 43, 21, 2, 3, 55, 44, 12]
    },
    {
      name: 'Tracking',
      data: [13, 23, 20, 8, 13, 27, 33, 2, 3, 55, 44, 12]
    }
  ])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      type: 'bar',
      width: '100%',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          // onSelectBar(config.dataPointIndex)
        }
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#7adad1', '#416fc7'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 2
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false
    },
    xaxis: {},
    yaxis: {
      show: false
    },
    fill: {
      opacity: 0.9
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '' + val
        }
      }
    },
    legend: {
      show: false
    }
  })

  useEffect(() => {
    if (!data) {
      return
    }
    if (moment(dateRange.startDate).year() === moment(dateRange.endDate).year()) {
      const months = Array.from({ length: 12 }, (_, i) => i)
      const groupedByMonth = groupBy(data?.timeLogs, item => moment(item.date).month())
      const { login, tracking } = months.reduce<{ login: number[]; tracking: number[] }>(
        (acc, month) => {
          const x = groupedByMonth[month] || []
          acc.login.push(Math.round(x.reduce((acc, curr) => acc + curr.totalTime, 0) / 3600))
          acc.tracking.push(Math.round(x.reduce((acc, curr) => acc + curr.trackingTime, 0) / 3600))
          return acc
        },
        { login: [], tracking: [] }
      )

      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: months.map(month => moment().month(month).format('MMM'))
        },
        labels: months.map(m => moment().month(m).format('MMM'))
      })
      setSeries([
        {
          name: 'Login',
          data: login
        },
        {
          name: 'Tracking',
          data: tracking
        }
      ])
    } else {
      const year = moment().year()
      const years = [year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3]
      const groupedByYear = groupBy(data?.timeLogs, item => moment(item.date).year())
      const { login, tracking } = years.reduce<{ login: number[]; tracking: number[] }>(
        (acc, year) => {
          const x = groupedByYear[year] || []
          acc.login.push(Math.round(x.reduce((acc, curr) => acc + curr.totalTime, 0) / 3600))
          acc.tracking.push(Math.round(x.reduce((acc, curr) => acc + curr.trackingTime, 0) / 3600))
          return acc
        },
        { login: [], tracking: [] }
      )
      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: years
        },
        labels: years.map(y => y.toString())
      })
      setSeries([
        {
          name: 'Login',
          data: login
        },
        {
          name: 'Tracking',
          data: tracking
        }
      ])
    }
  }, [dateRange, data])

  return (
    <div style={{ height: '100%', width: '100%' }} id="chart">
      <ReactApexChart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
    </div>
  )
}

export default HrLoginBarChart
