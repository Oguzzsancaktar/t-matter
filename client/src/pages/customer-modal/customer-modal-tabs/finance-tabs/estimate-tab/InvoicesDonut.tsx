import React, { useEffect, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ESize, ICustomer, Invoice } from '@/models'
import { useGetInvoicesQuery } from '@services/settings/finance-planning/financePlanningService'
import colors from '@constants/colors'
import moment from 'moment'
import { H1, IconButton, InvoiceMailModal, ItemContainer, NoTableData } from '@/components'
import { ref } from 'joi'
import { ExternalLink, Mail } from 'react-feather'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'

interface IProps {
  customerId: ICustomer['_id']
  onSelect: (invoice: Invoice) => void
  selectedInvoice?: Invoice
  isPreview?: boolean
}

const InvoicesDonut: React.FC<IProps> = ({ customerId, onSelect, selectedInvoice, isPreview = false }) => {
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
    <div
      style={{
        position: 'relative',
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!isPreview ? (
        <H1 textAlign="center" fontSize="18px" fontWeight="700" margin="0 0 22px 0" color={colors.gray.disabled}>
          Invoices
        </H1>
      ) : (
        <ItemContainer position="absolute" left="0%" top="45%">
          <H1 textAlign="center" fontSize="18px" fontWeight="700" margin="0 0 22px 0" color={colors.gray.disabled}>
            Invoices
          </H1>
        </ItemContainer>
      )}

      {series?.length !== 0 && (
        <ReactApexChart options={options} series={series} type="donut" height={165} width={165} />
      )}

      {series?.length !== 0 && !isPreview && (
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

      {series?.length === 0 && (
        <ItemContainer height="50%" transform="translateY(25%)">
          <NoTableData />
        </ItemContainer>
      )}
    </div>
  )
}

export default InvoicesDonut
