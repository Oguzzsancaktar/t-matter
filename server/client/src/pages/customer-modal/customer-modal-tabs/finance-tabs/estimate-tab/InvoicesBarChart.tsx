import React from 'react'
import moment from 'moment'
import { Invoice } from '@/models'
import ReactApexChart from 'react-apexcharts'
import { useGetInvoicesQuery } from '@services/settings/finance-planning/financePlanningService'
import { JustifyCenterRow } from '@/components'

interface IProps {
  customerId: string
  onSelectBar: (invoice: Invoice) => void
}

const InvoicesBarChart: React.FC<IProps> = ({ customerId, onSelectBar }) => {
  const { data: invoices, isLoading: isInvoicesLoading } = useGetInvoicesQuery(customerId)

  if (isInvoicesLoading) return <JustifyCenterRow>Loading...</JustifyCenterRow>

  if (!invoices) {
    return null
  }
  const sortedInvoices = [...invoices].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return moment(a.createdAt).diff(moment(b.createdAt))
    }
    return 0
  })
  const series = [
    {
      name: 'Invoices',
      data: sortedInvoices.map(i => +i.total.toFixed(0))
    }
  ]
  const config: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 205,
      events: {
        dataPointSelection: function (event, chartContext, config) {
          onSelectBar(sortedInvoices[config.dataPointIndex])
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 10,
      colors: ['transparent']
    },
    xaxis: {
      type: 'datetime',
      categories: sortedInvoices.map(i => i.createdAt)
    },
    yaxis: {
      title: {
        text: '$ total'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val.toFixed(2)
        }
      }
    }
  }

  return <ReactApexChart options={config} series={series} type="bar" height={205} />
}

export default InvoicesBarChart
