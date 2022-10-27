import React, { useEffect, useState } from 'react'
import { ESize, ICustomer, Invoice } from '@/models'
import { useGetInvoicesQuery } from '@services/settings/finance-planning/financePlanningService'
import colors from '@constants/colors'
import moment from 'moment/moment'
import { H1, IconButton, InvoiceMailModal, ItemContainer, NoTableData, UpdateWorkflowPlanModal } from '@/components'
import ReactApexChart from 'react-apexcharts'
import { ExternalLink, Mail, Trash2 } from 'react-feather'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'

interface IProps {
  customerId: ICustomer['_id']
  onSelect: (invoice: Invoice) => void
  selectedInvoice?: Invoice
  isPreview?: boolean
}

const DiscountedInvoicesDonut: React.FC<IProps> = ({ customerId, onSelect, isPreview = false }) => {
  const { data: invoices, isLoading: isInvoicesLoading } = useGetInvoicesQuery(customerId)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 165,
      width: 165,
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
        endAngle: 270,
        donut: {
          size: '80%'
        }
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
      text: 'No Discounted invoices',
      style: {
        color: colors.text.primary
      }
    }
  })
  const [series, setSeries] = useState<ApexCharts.ApexOptions['series']>([])

  useEffect(() => {
    if (invoices) {
      setSeries(invoices.map(invoice => +Math.ceil(invoice.discount)))
      setOptions({
        ...options,
        labels: invoices.map(invoice => invoice.category.name + ' - ' + moment(invoice.createdAt).format('DD/MMM/YYYY'))
      })
    }
  }, [invoices])

  const showInvoicesMailModal = () => {
    dispatch(
      openModal({
        id: 'invoiceMailModal',
        title: 'Invoice Mail',
        body: <InvoiceMailModal customerId={customerId} />,
        maxWidth: ESize.WMedium,
        width: ESize.WMedium,
        height: ESize.WMedium
      })
    )
  }

  return (
    <div style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {!isPreview ? (
        <H1 textAlign="center" fontSize="18px" fontWeight="700" margin="0 0 22px 0" color={colors.gray.disabled}>
          Discounted invoices
        </H1>
      ) : (
        <H1 textAlign="center" fontSize="18px" fontWeight="700" margin="0 0 22px 0" color={colors.text.primary}></H1>
      )}

      {series?.length !== 0 && (
        <div style={{ position: 'absolute', top: '50%', right: '40%' }}>
          <IconButton
            onClick={showInvoicesMailModal}
            bgColor={colors.background.gray.light}
            width="30px"
            height="30px"
            margin="0 0 0 0"
            children={<ExternalLink size={'16px'} color={colors.text.primary} />}
          />
        </div>
      )}

      {series?.length !== 0 && (
        <ReactApexChart options={options} series={series} type="donut" height={165} width={165} />
      )}

      {series?.length === 0 && (
        <ItemContainer width="150px" height="100%" transform="translateY(-15%)">
          <NoTableData />
        </ItemContainer>
      )}
    </div>
  )
}

export default DiscountedInvoicesDonut
