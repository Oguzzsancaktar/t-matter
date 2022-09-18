import React, { useEffect, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ICustomer, Invoice } from '@/models'
import { useGetInvoicesQuery } from '@services/settings/finance-planning/financePlanningService'
import colors from '@constants/colors'
import moment from 'moment'
import { H1 } from '@/components'
import { ref } from 'joi'

interface IProps {
  customerId: ICustomer['_id']
  onSelect: (invoice: Invoice) => void
  selectedInvoice?: Invoice
}

const InvoicesDonut: React.FC<IProps> = ({ customerId, onSelect, selectedInvoice }) => {
  const { data: invoices, isLoading: isInvoicesLoading } = useGetInvoicesQuery(customerId)

  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 160,
      width: 160,
      type: 'donut',
      offsetY: 0,
      events: {
        dataPointSelection: function (event, chartContext, config) {
          if (invoices) {
            onSelect(invoices[config.dataPointIndex])
          }
        }
      }
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
    fill: {
      type: 'gradient'
    },
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
      text: 'No invoices',
      style: {
        color: colors.text.primary
      }
    }
  })
  const [series, setSeries] = useState<ApexCharts.ApexOptions['series']>([])

  useEffect(() => {
    if (invoices) {
      setSeries(invoices.map(invoice => +Math.ceil(invoice.total)))
      setOptions({
        ...options,
        labels: invoices.map(invoice => invoice.category.name + ' - ' + moment(invoice.createdAt).format('DD/MMM/YYYY'))
      })
    }
  }, [invoices])

  return (
    <div style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <H1 textAlign="center" fontSize="18px" fontWeight="700" margin="0 0 22px 0" color={colors.text.primary}>
        Invoices
      </H1>
      <ReactApexChart options={options} series={series} type="donut" height={160} width={160} />
    </div>
  )
}

export default InvoicesDonut
