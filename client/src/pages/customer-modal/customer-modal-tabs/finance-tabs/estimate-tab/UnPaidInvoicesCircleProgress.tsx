import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import colors from '@constants/colors'
import {
  useGetFinancePlanningQuery,
  useGetInvoicesQuery
} from '@services/settings/finance-planning/financePlanningService'
import { ICustomer } from '@/models'

interface IProps {
  customerId: ICustomer['_id']
}

const UnPaidInvoicesCircleProgress: React.FC<IProps> = ({ customerId }) => {
  const { data: financePlanning, isLoading: isFinancePlanningLoading } = useGetFinancePlanningQuery()
  const { data: invoices, isLoading: isInvoicesLoading } = useGetInvoicesQuery(customerId)

  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 200,
      width: 200,
      type: 'radialBar',
      offsetY: 0
    },
    title: {
      text: 'Discount',
      align: 'center',
      style: {
        fontSize: '12px',
        color: colors.text.primary
      }
    },
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
  const [series, setSeries] = useState([0])

  useEffect(() => {
    if (invoices && financePlanning) {
      const d1 = invoices.reduce((acc, cur) => {
        return acc + cur.discount
      }, 0)
      setSeries([+((d1 / financePlanning.inactiveTimeSlipAmount.value) * 100).toFixed(0)])
    }
  }, [invoices, financePlanning])

  return <ReactApexChart width={200} options={options} series={series} type="radialBar" height={200} />
}

export default UnPaidInvoicesCircleProgress
