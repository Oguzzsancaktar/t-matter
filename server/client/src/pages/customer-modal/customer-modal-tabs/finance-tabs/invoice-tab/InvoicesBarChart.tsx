import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
// @ts-ignore
import faker from 'faker'
import { ProgressBar } from '@/components'

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'invoice',
      data: labels.map(l => l.length * Math.random() * 100),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
}

const InvoicesBarChart = () => {
  return <Bar height={180} options={options} data={data} />
}

export default InvoicesBarChart
