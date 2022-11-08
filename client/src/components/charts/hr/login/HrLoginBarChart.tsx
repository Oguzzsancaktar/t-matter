import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import moment from 'moment'

const HrLoginBarChart = ({ dateRange }) => {
  const [series, setSeries] = useState([
    {
      name: 'Login',
      data: [44, 55, 41, 67, 22, 43, 21]
    },
    {
      name: 'Tracking',
      data: [13, 23, 20, 8, 13, 27, 33]
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
    if (moment(dateRange.startDate).year() === moment(dateRange.endDate).year()) {
      const months = Array.from({ length: 12 }, (_, i) => i)
      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: months.map(month => moment().month(month).format('MMM'))
        },
        labels: months.map(m => moment().month(m).format('MMM'))
      })
    } else {
      const year = moment().year()
      const years = [year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3]
      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: years
        },
        labels: years.map(y => y.toString())
      })
    }
  }, [dateRange])

  return (
    <div style={{ height: '100%', width: '100%' }} id="chart">
      <ReactApexChart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
    </div>
  )
}

export default HrLoginBarChart
