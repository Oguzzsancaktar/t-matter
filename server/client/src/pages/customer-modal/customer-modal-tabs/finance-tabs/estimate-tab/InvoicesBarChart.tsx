import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
// @ts-ignore
import faker from 'faker'
import { JustifyCenterColumn, ProgressBar } from '@/components'
import { useGetInvoicesQuery } from '@services/settings/finance-planning/financePlanningService'
import moment from 'moment'
import colors from '@constants/colors'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Invoices Charts'
    }
  }
}

interface IProps {
  customerId: string
}

const InvoicesBarChart: React.FC<IProps> = ({ customerId }) => {
  const { data: invoices, isLoading } = useGetInvoicesQuery(customerId)

  if (isLoading) return <JustifyCenterColumn>Loading...</JustifyCenterColumn>

  if (!invoices) {
    return null
  }

  return (
    <Bar
      height={180}
      options={options}
      data={{
        labels: invoices.map(invoice => moment(invoice.createdAt).format('MMM DD YYYY')),
        datasets: [
          {
            label: 'Invoices',
            data: invoices.map(i => ({ ...i, x: moment(i.createdAt).format('MMM DD YYYY') })),
            parsing: {
              yAxisKey: 'total'
            },
            backgroundColor: '#add8e6'
          }
        ]
      }}
    />
  )
}

export default InvoicesBarChart
