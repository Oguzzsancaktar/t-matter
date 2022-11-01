import React, { useMemo } from 'react'
import { ItemContainer } from '@/components/item-container'
import { emptyQueryParams } from '@/constants/queryParams'
import { useGetCustomersQuery } from '@/services/customers/customerService'
import { useGetCustomerTypesQuery } from '@/services/settings/company-planning/dynamicVariableService'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const CustomerMonthlyCustomerTypeBarChart = () => {
  const { data: customersData, isLoading: customersIsLoading } = useGetCustomersQuery({
    ...emptyQueryParams,
    status: '-9'
  })

  const { data: customerTypeData, isLoading: customerTypeIsLoading } = useGetCustomerTypesQuery(emptyQueryParams)

  const monthlyCreatedCustomerTypeSeries = useMemo(() => {
    let arr: any = []

    if (customerTypeData && customersData && customersData?.length) {
      for (let index = 0; index < customersData.length; index++) {
        const customer = customersData[index]
        let item = {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          name: customerTypeData[index].name,
          color: customerTypeData[index].color.color
        }

        for (let i = 0; i < customerTypeData.length; i++) {
          if (customer.customerType._id === customerTypeData[i]._id) {
            const month = new Date(customer?.createdAt || '').getMonth()
            item.data[month] = item.data[month] + 1
            arr.push(item)
          }
        }
      }
      console.log('aee', arr)
      return arr
    }
    return []
  }, [customersData, customerTypeData])

  console.log(monthlyCreatedCustomerTypeSeries)

  const chartOptions = useMemo<ApexOptions>(
    () => ({
      // colors: [colors.primary.light, colors.secondary.middle],
      chart: {
        offsetY: 30,
        offsetX: -10,
        type: 'bar',
        height: '80%',
        width: '95%',
        stacked: false,

        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          columnWidth: '25%',

          dataLabels: {
            // @ts-ignore
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'category',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      legend: {
        show: false,
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    }),
    []
  )

  return (
    <ItemContainer>
      <ReactApexChart options={chartOptions} series={monthlyCreatedCustomerTypeSeries} type="bar" height={'100%'} />
    </ItemContainer>
  )
}

export default CustomerMonthlyCustomerTypeBarChart
