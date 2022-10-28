import { SelectInput } from '@/components/input'
import { ItemContainer } from '@/components/item-container'
import { CustomerTaskModal } from '@/components/modals'
import { NoTableData } from '@/components/no-table-data'
import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer, IOption } from '@/models'
import { useGetTasksByCustomerIdQuery, useGetTaskYearsWithCustomerIdQuery } from '@/services/customers/taskService'
import { openModal } from '@/store'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  customer: ICustomer
}

const CustomerActivityMonthlyBarChart: React.FC<IProps> = ({ customer }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [selectedYear, setSelectedYear] = useState<number>(moment().year())

  const [searchQueryParams, setSearchQueryParams] = useState({ ...emptyQueryParams, status: -9 })
  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTasksByCustomerIdQuery({
    ...searchQueryParams,
    customerId: customer._id,
    year: selectedYear.toString()
  })

  const { data: customerTaskYears, isLoading: isTaskYearsLoading } = useGetTaskYearsWithCustomerIdQuery({
    customerId: customer._id
  })

  const monthlyTaskSeries = useMemo(() => {
    const series: any = []

    if (customerTasksData?.length) {
      for (let index = 0; index < customerTasksData.length; index++) {
        const seriesItem = {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          color: '#FFA41B',
          name: 'Task Name',
          taskId: ''
        }

        const element = customerTasksData[index]
        const month = moment(element.startDate).month()

        seriesItem.data[month] = 1
        seriesItem.name = element.name
        seriesItem.color = element.status === 1 ? '#21506f' : '#3fa2dc'
        seriesItem.taskId = element._id || ''

        console.log(seriesItem.color)

        console.log(element.status)

        if (element.status === 1) {
          series.unshift(seriesItem)
        } else {
          series.push(seriesItem)
        }
      }
    }

    return series
  }, [customerTasksData])

  const chartOptions = useMemo<ApexOptions>(
    () => ({
      // colors: [colors.primary.light, colors.secondary.middle],
      chart: {
        offsetY: 30,
        offsetX: -10,
        type: 'bar',
        height: '80%',
        width: '95%',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        events: {
          click: function (event, chartContext, config) {
            openCustomerTaskModal(monthlyTaskSeries[config.seriesIndex].taskId)
          }
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

          dataLabels: {}
        }
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
    [monthlyTaskSeries, customerTasksData, selectedYear]
  )

  const handleYearChange = (option: IOption) => {
    setSelectedYear(+option.value)
  }

  const openCustomerTaskModal = taskId => {
    dispatch(
      openModal({
        id: 'customerTaksModal' + taskId,
        title: 'Customer Task',
        body: <CustomerTaskModal customer={customer} customerId={customer._id} taskId={taskId} />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        maxWidth: ESize.WXLarge,
        backgroundColor: colors.gray.light
      })
    )
  }

  return (
    <ItemContainer height="85%" transform="translate(0%, 7%)" position="relative" margin="0 0 0 auto" width="95%">
      {customerTaskYears?.length && (
        <ItemContainer position="absolute" left="0" top="0" width="auto" zIndex="99">
          <SelectInput
            name={'customerTaskYear'}
            isLoading={isTaskYearsLoading}
            selectedOption={[
              {
                label: selectedYear.toString(),
                value: selectedYear.toString()
              }
            ]}
            options={customerTaskYears?.map(yearAndCount => ({
              label: yearAndCount._id.toString(),
              value: yearAndCount._id.toString()
            }))}
            onChange={handleYearChange}
            isDisabled={isTaskYearsLoading || customerTaskYears?.length === 0}
          />
        </ItemContainer>
      )}

      {customerTasksData?.length !== 0 && monthlyTaskSeries && (
        <ReactApexChart options={chartOptions} series={monthlyTaskSeries} type="bar" height={'100%'} />
      )}
      {customerTasksData?.length === 0 && (
        <ItemContainer height="50%" transform="translateY(35%)">
          <NoTableData />
        </ItemContainer>
      )}
    </ItemContainer>
  )
}

export default CustomerActivityMonthlyBarChart
