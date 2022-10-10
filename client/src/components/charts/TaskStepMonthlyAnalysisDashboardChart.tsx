import { useGetTaskStepMonthlyAnalysisDataQuery } from '@services/customers/taskService'
import ReactApexChart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { secondsToHourMin } from '@utils/timeUtils'

const TaskStepMonthlyAnalysisDashboardChart = ({ onSelectBar }) => {
  const { data } = useGetTaskStepMonthlyAnalysisDataQuery()
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          onSelectBar(config.w.config.series[config.seriesIndex].data[config.dataPointIndex])
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        columnWidth: '30%',
        barHeight: '75%',
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    stroke: {
      show: false
    },
    dataLabels: {
      enabled: false
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
