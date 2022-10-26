import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import colors from '@constants/colors'
import {
  useGetExpiredTaskStepsQuery,
  useGetFinancePlanningQuery
} from '@services/settings/finance-planning/financePlanningService'
import { ICustomer } from '@/models'
import { useGetTasksByCustomerIdQuery } from '@services/customers/taskService'

interface IProps {
  customerId: ICustomer['_id']
  isPreview?: boolean
}

const NonBillableCircleProgress: React.FC<IProps> = ({ customerId, isPreview = false }) => {
  const { data: financePlanning, isLoading: isFinancePlanningLoading } = useGetFinancePlanningQuery()
  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTasksByCustomerIdQuery({
    customerId,
    isInvoiced: false
  })
  const { data: expiredTaskSteps, isLoading: isExpiredTaskStepsLoading } = useGetExpiredTaskStepsQuery({
    customerId,
    isInvoiced: false
  })
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 200,
      type: 'radialBar',
      offsetY: 0,
      width: 200
    },
    title: {
      text: 'Non Billable',
      align: 'center',
      style: {
        fontSize: !isPreview ? '12px' : '0px',
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
            offsetY: 40,
            fontSize: '15px',
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
    if (expiredTaskSteps && financePlanning && customerTasksData) {
      const p1 = expiredTaskSteps.reduce((acc, cur) => {
        return acc + cur.expiredTimePrice
      }, 0)
      const p2 = customerTasksData?.reduce((acc, cur) => {
        if (cur.totalPrice) {
          return acc + cur.totalPrice
        }
        return acc
      }, 0)
      setSeries([+(((p2 + p1) / financePlanning.activeTimeSlipAmount.value) * 100).toFixed(0)])
    }
  }, [expiredTaskSteps, financePlanning, customerTasksData])

  return <ReactApexChart width={200} options={options} series={series} type="radialBar" height={200} />
}

export default NonBillableCircleProgress
