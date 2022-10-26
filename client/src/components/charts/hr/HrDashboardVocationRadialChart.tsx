import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const HrDashboardVocationRadialChart = () => {
  const [series, setSeries] = useState([55])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      width: 194,
      type: 'radialBar',
      offsetY: 0
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 120
          },
          value: {
            show: false,
            offsetY: 76,
            fontSize: '22px',
            color: undefined,
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
  })
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" width={194} />
    </div>
  )
}

export default HrDashboardVocationRadialChart
