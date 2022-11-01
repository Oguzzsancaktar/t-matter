import React, { useMemo } from 'react'
import { ItemContainer } from '@/components/item-container'
import ReactApexChart from 'react-apexcharts'
import colors from '@/constants/colors'
import { ApexOptions } from 'apexcharts'
import { emptyQueryParams } from '@/constants/queryParams'
import { useGetCustomerTypesQuery } from '@/services/settings/company-planning/dynamicVariableService'
import { useGetCustomersQuery } from '@/services/customers/customerService'

// TODO MAKE CHART BACKEND BETTER

const CustomerTypesDonutChart = () => {
  const { data: customersData, isLoading: customersIsLoading } = useGetCustomersQuery({
    ...emptyQueryParams,
    status: '-9'
  })

  const { data: customerTypeData, isLoading: customerTypeIsLoading } = useGetCustomerTypesQuery(emptyQueryParams)

  const typeColors = useMemo(() => {
    if (customerTypeData) {
      return customerTypeData.map(customerType => customerType.color.color)
    }
    return []
  }, [customerTypeData])

  const customerTypesSeries = useMemo(() => {
    if (customerTypeData && customersData) {
      return customerTypeData.map(customerType => {
        const customerTypeCount = customersData.filter(
          customer => customer.customerType._id === customerType._id
        ).length
        return customerTypeCount
      })
    }
    return []
  }, [customersData, customerTypeData])

  const options: ApexOptions = {
    colors: [...typeColors],
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
      style: {
        color: colors.text.primary
      }
    }
  }

  return (
    <ItemContainer height="100%" position="relative">
      <ReactApexChart options={options} series={customerTypesSeries} type="donut" height={200} />
    </ItemContainer>
  )
}

export default CustomerTypesDonutChart
