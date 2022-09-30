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
      height: 350,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%'
        },
        dataLabels: {
          name: {
            show: true,
            color: colors.text.primary,
            fontWeight: 500,
            fontSize: '22px'
          },
          value: {
            show: true,
            color: colors.text.primary,
            fontWeight: 500,
            fontSize: '22px',
            offsetY: 5
          }
        }
      }
    },
    labels: ['Paid'],
    tooltip: {
      enabled: true
    }
  })
  useEffect(() => {
    if (data) {
      const total = data.reduce((acc, curr) => acc + curr.payAmount, 0)
      const paid = data.reduce((acc, curr) => acc + curr.paidAmount, 0)
      const percentage = (paid / total) * 100
      setSeries([+Math.ceil(percentage)])
      setOptions({
        ...options,
        tooltip: {
          ...options.tooltip,
          y: {
            formatter(val: number, opts?: any): string {
              return `$${paid} / $${total}`
            }
          }
        }
      })
    }
  }, [data])

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactApexChart options={options} series={series} type="radialBar" width={'100%'} height={200} />
    </div>
  )
}

export default FinanceInfoPaidDonutPercentage
