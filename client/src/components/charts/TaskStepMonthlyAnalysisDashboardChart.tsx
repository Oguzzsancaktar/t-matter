import { useGetTaskStepMonthlyAnalysisDataQuery } from '@services/customers/taskService'
import ReactApexChart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { secondsToHourMin } from '@utils/timeUtils'

const TaskStepMonthlyAnalysisDashboardChart = () => {
  const { data } = useGetTaskStepMonthlyAnalysisDataQuery()
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
        fontSize: '8px',
        fontWeight: 400
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + secondsToHourMin(+val * 3600)
      },
      dropShadow: {
        enabled: false
      }
    },
    xaxis: {
      categories: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      min: 0,
      max: 200
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return secondsToHourMin(val * 3600)
        }
      }
    },
    legend: {
      show: false
    },
    annotations: {
      xaxis: [
        {
          x: 140,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396'
            },
            text: 'Monthly Target'
          }
        }
      ]
    }
  })
  const [series, setSeries] = useState<ApexAxisChartSeries>([])

  useEffect(() => {
    if (data) {
      setSeries([{ name: 'Hours', data: data.map(item => item.monthlyDuration / 3600) }])
    }
  }, [data])

  return (
    <div id="chart" style={{ height: '100%' }}>
      <ReactApexChart options={options} series={series} type="bar" height={'100%'} />
    </div>
  )
}

export default TaskStepMonthlyAnalysisDashboardChart
