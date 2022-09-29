import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import colors from '@constants/colors'
import {
  useGetInstallmentsQuery,
  useLazyGetInstallmentsQuery
} from '@services/settings/finance-planning/financePlanningService'

interface IProps {
  dateRange: {
    startDate: Date
    endDate: Date
  }
}

const FinanceInfoPaidDonutPercentage: React.FC<IProps> = ({ dateRange }) => {
  const { data, isLoading } = useGetInstallmentsQuery({ ...dateRange, invoice: undefined })

  const [series, setSeries] = useState([0])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 200,
      type: 'radialBar',
      offsetY: 0,
      width: 200
    },
    title: {},
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
  })

  useEffect(() => {
    if (data) {
      const total = data.reduce((acc, curr) => acc + curr.payAmount, 0)
      const paid = data.reduce((acc, curr) => acc + curr.paidAmount, 0)
      const percentage = (paid / total) * 100
      setSeries([+Math.ceil(percentage)])
    }
  }, [data])

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <span style={{ position: 'absolute', left: 'calc(50% - 16px)', top: 'calc(50% - 24px)' }}>Paid</span>
      <ReactApexChart width={200} options={options} series={series} type="radialBar" height={'100%'} />
    </div>
  )
}

export default FinanceInfoPaidDonutPercentage
