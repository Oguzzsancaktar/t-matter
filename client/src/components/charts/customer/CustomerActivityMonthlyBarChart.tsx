import { SelectInput } from '@/components/input'
import { ItemContainer } from '@/components/item-container'
import { NoTableData } from '@/components/no-table-data'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import { ICustomer, IOption } from '@/models'
import { useGetTasksByCustomerIdQuery, useGetTaskYearsWithCustomerIdQuery } from '@/services/customers/taskService'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  customerId: ICustomer['_id']
}

const CustomerActivityMonthlyBarChart: React.FC<IProps> = ({ customerId }) => {
  const [selectedYear, setSelectedYear] = useState<number>(moment().year())

  const [searchQueryParams, setSearchQueryParams] = useState({ ...emptyQueryParams, status: -9 })
  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTasksByCustomerIdQuery({
    ...searchQueryParams,
    customerId,
    year: selectedYear.toString()
  })

  const { data: customerTaskYears, isLoading: isTaskYearsLoading } = useGetTaskYearsWithCustomerIdQuery({
    customerId
  })

  const monthlyCompletedUncompletedTasks = useMemo(() => {
    const monthlyCompletedUncompletedTasks: any = {
      completed: {
        data: [],
        name: 'Completed',
        color: '#00E396'
      },
      uncompleted: {
        data: [],
        name: 'Uncompleted',
        color: '#3c6255'
      }
    }
    const completedTasks = customerTasksData?.filter(task => task.status === 1)
    const uncompletedTasks = customerTasksData?.filter(task => task.status !== 1)

    for (let i = 0; i < 12; i++) {
      const month = moment().month(i).format('MMM')
      const completedTasksCount = completedTasks?.filter(task => {
        return moment(task.startDate).format('MMM') === month
      }).length
      const uncompletedTasksCount = uncompletedTasks?.filter(
        task => moment(task.startDate).format('MMM') === month
      ).length

      monthlyCompletedUncompletedTasks.completed.data[i] = completedTasksCount || 0
      monthlyCompletedUncompletedTasks.uncompleted.data[i] = uncompletedTasksCount || 0
    }

    return monthlyCompletedUncompletedTasks
  }, [customerTasksData])

  const monthlyTaskCompletedUncompletedBarChartSeries = useMemo(() => {
    return [monthlyCompletedUncompletedTasks.completed, monthlyCompletedUncompletedTasks.uncompleted]
  }, [monthlyCompletedUncompletedTasks])

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
    []
  )

  const handleYearChange = (option: IOption) => {
    setSelectedYear(+option.value)
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

      {customerTasksData?.length !== 0 && monthlyTaskCompletedUncompletedBarChartSeries && (
        <ReactApexChart
          options={chartOptions}
          series={monthlyTaskCompletedUncompletedBarChartSeries}
          type="bar"
          height={'100%'}
        />
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
