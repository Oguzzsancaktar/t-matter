import React, { useMemo } from 'react'
import { ItemContainer } from '@/components/item-container'
import ReactApexChart from 'react-apexcharts'
import colors from '@/constants/colors'
import { ApexOptions } from 'apexcharts'
import { emptyQueryParams } from '@/constants/queryParams'
import { useGetRefferedBysQuery } from '@/services/settings/company-planning/dynamicVariableService'
import { useGetCustomersQuery } from '@/services/customers/customerService'

// TODO MAKE CHART BACKEND BETTER

const CustomerRefferedByDonutChart = () => {
  const { data: customersData, isLoading: customersIsLoading } = useGetCustomersQuery({
    ...emptyQueryParams,
    status: '-9'
  })

  const { data: refferedByData, isLoading: refferedByDataIsLoading } = useGetRefferedBysQuery(emptyQueryParams)

  const refferedByColors = useMemo(() => {
    if (refferedByData) {
      return refferedByData.map(refferedBy => refferedBy.color.color)
    }
    return []
  }, [refferedByData])

  const typeLabels = useMemo(() => {
    if (refferedByData) {
      return refferedByData.map(refferedBy => refferedBy.name)
    }
    return []
  }, [refferedByData])

  const customerRefferedBySeries = useMemo(() => {
    if (refferedByData && customersData) {
      return refferedByData.map(refferedBy => {
        const refferedByCount = customersData.filter(customer => customer.refferedBy._id === refferedBy._id).length
        return refferedByCount
      })
    }
    return []
  }, [customersData, refferedByData])

  const options: ApexOptions = {
    colors: [...refferedByColors],
    chart: {
      height: 200,
      width: 165,
      type: 'donut',
      offsetY: 0
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: '80%',
          labels: {
            show: true,
            total: {
              label: 'Reffered By',
              show: true,
              showAlways: true,
              fontSize: '16px',
              fontWeight: 200,
              color: colors.text.primary
            }
          }
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
      style: {
        color: colors.text.primary
      }
    },
    labels: [...typeLabels]
  }

  return (
    <ItemContainer height="100%" position="relative">
      <ReactApexChart options={options} series={customerRefferedBySeries} type="donut" height={200} />
    </ItemContainer>
  )
}

export default CustomerRefferedByDonutChart
