import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ICustomer } from '@/models'
import { useGetExpiredTaskStepsQuery } from '@services/settings/finance-planning/financePlanningService'
import colors from '@constants/colors'
import { H1 } from '@/components'

interface IProps {
  customerId: ICustomer['_id']
}

const AdditionalTimeDonut: React.FC<IProps> = ({ customerId }) => {
  const { data: expiredTaskSteps, isLoading: isExpiredTaskStepsLoading } = useGetExpiredTaskStepsQuery({
    customerId: customerId
  })
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 160,
      width: 160,
      type: 'donut',
      offsetY: 0
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {},
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
            height: 150
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    noData: {
      text: 'No additional time',
      style: {
        color: colors.text.primary
      }
    }
  })
  const [series, setSeries] = useState<ApexCharts.ApexOptions['series']>([])

  useEffect(() => {
    if (expiredTaskSteps) {
      // @ts-ignore
      const users = [...new Set(expiredTaskSteps.map(expiredTaskStep => expiredTaskStep.user._id))]
      const labels = users.map(user => {
        const u = expiredTaskSteps.find(expiredTaskStep => expiredTaskStep.user._id === user)?.user
        return u ? `${u.firstname} ${u.lastname}` : ''
      })
      const series = users.reduce((acc, user) => {
        acc.push(
          +expiredTaskSteps
            .filter(expiredTaskStep => expiredTaskStep.user._id === user)
            .reduce((acc, cur) => {
              return acc + cur.expiredTimePrice
            }, 0)
            .toFixed(0)
        )
        return acc
      }, [])
      console.log(labels, series)
      setSeries(series)
      setOptions({
        ...options,
        labels: labels
      })
    }
  }, [expiredTaskSteps])

  return (
    <div style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <H1 textAlign="center" fontSize="18px" fontWeight="700" margin="0 0 22px 0" color={colors.text.primary}>
        Additional time
      </H1>
      <ReactApexChart options={options} series={series} type="donut" height={160} width={160} />
    </div>
  )
}

export default AdditionalTimeDonut